// Dựng các tệp .bpmn từ mô tả trong thư mục diagrams/
// Cách dùng: node build.mjs [Level0 P1 ...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const all = ['Level0', 'P1', 'P2', 'P3', 'P4', 'P5'];
const only = process.argv.slice(2);
const names = all.filter((n) => !only.length || only.includes(n));

fs.mkdirSync(path.join(root, 'bpmn'), { recursive: true });
let bad = 0;
for (const n of names) {
  const file = path.join(here, 'diagrams', `${n}.mjs`);
  if (!fs.existsSync(file)) continue;
  const mod = await import(pathToFileURL(file).href);
  const d = mod.default();
  const { xml, problems } = await d.toXML();
  fs.writeFileSync(path.join(root, 'bpmn', `CellphoneS_AsIs_${n}.bpmn`), xml);
  const lc = d.layoutCheck();
  console.log(`== ${n}: ${Object.keys(d.nodes).length} phần tử, ${d.flows.length} sequence flow, ${d.msgs.length} message flow, ${d.notes.length} ghi chú`);
  for (const p of problems) { bad++; console.log('  LỖI: ' + p); }
  for (const w of lc.warn) console.log('  ' + w);
  console.log(`  Số điểm đường nối giao nhau: ${lc.cross}${lc.cross ? ' -> ' + lc.crossList.join('; ') : ''}`);
}
process.exit(bad ? 1 : 0);
