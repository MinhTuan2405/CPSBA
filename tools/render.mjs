// Mở từng tệp .bpmn bằng thư viện bpmn-js (bpmn.io), ghi lại cảnh báo khi nhập,
// rồi xuất SVG và PNG. Cách dùng: node render.mjs [--tiles <thư mục>] [Level0 P1 ...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const args = process.argv.slice(2);
let tilesDir = null;
const ti = args.indexOf('--tiles');
if (ti >= 0) { tilesDir = args[ti + 1]; args.splice(ti, 2); }
const all = ['Level0', 'P1', 'P2', 'P3', 'P4', 'P5'];
const names = all.filter((n) => !args.length || args.includes(n));

const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find((p) => fs.existsSync(p));
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox'] });
fs.mkdirSync(path.join(root, 'svg'), { recursive: true });
fs.mkdirSync(path.join(root, 'png'), { recursive: true });
if (tilesDir) fs.mkdirSync(tilesDir, { recursive: true });

let failed = 0;
for (const n of names) {
  const file = path.join(root, 'bpmn', `CellphoneS_AsIs_${n}.bpmn`);
  if (!fs.existsSync(file)) continue;
  const xml = fs.readFileSync(file, 'utf8');
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  await page.setContent('<!doctype html><html><body style="margin:0"><div id="c" style="width:1600px;height:1000px"></div></body></html>');
  await page.addScriptTag({ path: path.join(here, 'node_modules/bpmn-js/dist/bpmn-viewer.development.js') });
  const res = await page.evaluate(async (xml) => {
    const viewer = new window.BpmnJS({ container: '#c' });
    try {
      const { warnings } = await viewer.importXML(xml);
      const { svg } = await viewer.saveSVG();
      const reg = viewer.get('elementRegistry');
      // Nhãn bị ngắt dòng nhiều hơn dự kiến (do cách bpmn-js làm tròn bề rộng nhãn)
      const tr = viewer.get('textRenderer');
      const odd = [];
      for (const el of reg.getAll()) {
        if (el.type !== 'label' || !el.businessObject.name) continue;
        const want = tr.getExternalLabelBounds({ x: 0, y: 0, width: 90, height: 30 }, el.businessObject.name);
        const text = reg.getGraphics(el).querySelector('text');
        if (text && text.getBBox().height > want.height + 4) odd.push(el.businessObject.name.replace(/\n/g, ' / '));
      }
      return { ok: true, warnings: warnings.map((w) => w.message || String(w)), svg, count: reg.getAll().length, odd };
    } catch (e) {
      return { ok: false, error: e.message, warnings: (e.warnings || []).map((w) => w.message || String(w)) };
    }
  }, xml);
  await page.close();
  if (!res.ok) {
    failed++;
    console.log(`== ${n}: KHÔNG MỞ ĐƯỢC: ${res.error}`);
    for (const w of res.warnings) console.log('   ' + w);
    continue;
  }
  fs.writeFileSync(path.join(root, 'svg', `CellphoneS_AsIs_${n}.svg`), res.svg);
  const m = res.svg.match(/<svg[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"/);
  const w = Math.ceil(+m[1]);
  const h = Math.ceil(+m[2]);
  const p2 = await browser.newPage();
  await p2.setViewport({ width: w + 40, height: h + 40, deviceScaleFactor: 2 });
  await p2.setContent(`<!doctype html><html><body style="margin:20px;background:#fff">${res.svg}</body></html>`);
  await p2.screenshot({ path: path.join(root, 'png', `CellphoneS_AsIs_${n}.png`), fullPage: true });
  if (tilesDir) {
    await p2.setViewport({ width: w + 40, height: h + 40, deviceScaleFactor: 0.78 });
    const tw = 1900;
    const step = 1800;
    let i = 0;
    for (let x = 0; x < w + 40; x += step) {
      i++;
      await p2.screenshot({ path: path.join(tilesDir, `${n}_${i}.png`), clip: { x, y: 0, width: Math.min(tw, w + 40 - x), height: h + 40 } });
      if (x + tw >= w + 40) break;
    }
    console.log(`   ${i} mảnh ảnh kiểm tra`);
  }
  await p2.close();
  console.log(`== ${n}: mở được bằng bpmn-js, ${res.count} phần tử hiển thị, ${res.warnings.length} cảnh báo, kích thước ${w}x${h}`);
  for (const wn of res.warnings) { failed++; console.log('   CẢNH BÁO: ' + wn); }
  for (const t of res.odd) console.log('   NHÃN NGẮT DÒNG LẠ: ' + t);
}
await browser.close();
process.exit(failed ? 1 : 0);
