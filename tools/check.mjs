// Kiểm tra các tệp .bpmn:
// 1. Đọc lại bằng bpmn-moddle (cảnh báo khi phân tích XML).
// 2. Đối chiếu với lược đồ XSD BPMN 2.0 của OMG.
// 3. Chạy bộ quy tắc bpmnlint:recommended.
// 4. Kiểm tra cấu trúc theo yêu cầu của đề bài.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as BpmnModdlePkg from 'bpmn-moddle';
import { Linter } from 'bpmnlint';
import NodeResolver from 'bpmnlint/lib/resolver/node-resolver.js';
import { validateXML } from 'xmllint-wasm';

const BpmnModdle = BpmnModdlePkg.BpmnModdle || BpmnModdlePkg.default;
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const all = ['Level0', 'P1', 'P2', 'P3', 'P4', 'P5'];
const xsd = (f) => ({ fileName: f, contents: fs.readFileSync(path.join(here, 'xsd', f), 'utf8') });

let failed = 0;
let accepted = 0;
const fail = (msg) => { failed++; console.log('   LỖI: ' + msg); };

for (const n of all) {
  const file = path.join(root, 'bpmn', `CellphoneS_AsIs_${n}.bpmn`);
  const xml = fs.readFileSync(file, 'utf8');
  console.log(`== ${n}`);

  // 1. bpmn-moddle
  const moddle = new BpmnModdle();
  const { rootElement: defs, warnings } = await moddle.fromXML(xml);
  console.log(`   bpmn-moddle: ${warnings.length} cảnh báo`);
  for (const w of warnings) fail('moddle: ' + w.message);

  // 2. XSD
  const res = await validateXML({
    xml: [{ fileName: path.basename(file), contents: xml }],
    schema: [xsd('BPMN20.xsd')],
    preload: [xsd('Semantic.xsd'), xsd('BPMNDI.xsd'), xsd('DI.xsd'), xsd('DC.xsd')]
  });
  console.log(`   Lược đồ XSD BPMN 2.0: ${res.valid ? 'hợp lệ' : 'KHÔNG hợp lệ'}`);
  if (!res.valid) for (const e of res.errors) fail('XSD: ' + e.message);

  // 3. bpmnlint
  // Mỗi tệp dùng một Linter riêng, vì một số quy tắc giữ trạng thái giữa các lần chạy
  const linter = new Linter({ config: { extends: 'bpmnlint:recommended' }, resolver: new NodeResolver() });
  const report = await linter.lint(defs);
  const emptySubs = new Set(
    defs.rootElements.filter((e) => e.$type === 'bpmn:Process').flatMap((p) => p.flowElements || [])
      .filter((e) => e.$type === 'bpmn:SubProcess' && !(e.flowElements || []).length).map((e) => e.id)
  );
  let nLint = 0;
  let nKnown = 0;
  for (const [rule, items] of Object.entries(report))
    for (const it of items) {
      // Quy trình con thu gọn trong sơ đồ tổng quan không chứa nội dung: nội dung nằm ở tệp chi tiết riêng.
      if ((rule === 'start-event-required' || rule === 'end-event-required') && emptySubs.has(it.id)) { nKnown++; continue; }
      nLint++;
      fail(`bpmnlint ${rule} (${it.category}): ${it.id} - ${it.message}`);
    }
  accepted += nKnown;
  console.log(`   bpmnlint:recommended: ${nLint} vấn đề${nKnown ? `; ${nKnown} ghi nhận đã biết (quy trình con thu gọn không có nội dung bên trong, chi tiết nằm ở tệp riêng)` : ''}`);

  // 4. Cấu trúc
  const collab = defs.rootElements.find((e) => e.$type === 'bpmn:Collaboration');
  const procs = defs.rootElements.filter((e) => e.$type === 'bpmn:Process');
  const ownerOf = new Map();
  for (const part of collab.participants) {
    ownerOf.set(part, part);
    if (part.processRef) for (const el of part.processRef.flowElements || []) ownerOf.set(el, part);
  }
  const isA = (el, t) => el.$instanceOf(t);
  const stats = {};
  for (const p of procs) {
    const els = p.flowElements || [];
    const nodes = els.filter((e) => isA(e, 'bpmn:FlowNode'));
    const flows = els.filter((e) => e.$type === 'bpmn:SequenceFlow');
    for (const e of els) stats[e.$type] = (stats[e.$type] || 0) + 1;
    const inLane = new Set((p.laneSets || []).flatMap((ls) => ls.lanes.flatMap((l) => l.flowNodeRef || [])));
    for (const f of flows) {
      if (ownerOf.get(f.sourceRef) !== ownerOf.get(f.targetRef)) fail(`Sequence Flow ${f.id} đi qua ranh giới pool`);
      if (!els.includes(f.sourceRef) || !els.includes(f.targetRef)) fail(`Sequence Flow ${f.id} nối ra ngoài process`);
    }
    for (const nd of nodes) {
      const inc = nd.incoming || [];
      const out = nd.outgoing || [];
      if (!inLane.has(nd)) fail(`${nd.id} không thuộc lane nào`);
      if (nd.$type !== 'bpmn:StartEvent' && !inc.length) fail(`${nd.id} không có luồng vào`);
      if (nd.$type !== 'bpmn:EndEvent' && !out.length) fail(`${nd.id} không có luồng ra`);
      if (!isA(nd, 'bpmn:Gateway') && !(nd.name || '').trim()) fail(`${nd.id} thiếu tên`);
      if (nd.$type === 'bpmn:ExclusiveGateway' && out.length > 1) {
        if (!(nd.name || '').trim()) fail(`Gateway ${nd.id} thiếu câu hỏi quyết định`);
        const labels = new Set();
        for (const f of out) {
          if (!(f.name || '').trim() || !f.conditionExpression) fail(`Nhánh ${f.id} của ${nd.id} thiếu điều kiện`);
          if (labels.has(f.name)) fail(`Gateway ${nd.id} có hai nhánh trùng điều kiện "${f.name}"`);
          labels.add(f.name);
        }
      }
      if (isA(nd, 'bpmn:Gateway') && inc.length > 1 && out.length > 1) fail(`Gateway ${nd.id} vừa gộp vừa rẽ nhánh`);
      if (nd.$type === 'bpmn:EventBasedGateway')
        for (const f of out)
          if (f.targetRef.$type !== 'bpmn:IntermediateCatchEvent' || (f.targetRef.incoming || []).length !== 1)
            fail(`Sau Event-Based Gateway ${nd.id} phải là sự kiện chờ có đúng một luồng vào`);
      if (nd.$type === 'bpmn:Task' && /^(chờ|đợi)/i.test(nd.name || '')) fail(`Task ${nd.id} mô tả trạng thái chờ`);
    }
    // Mọi phần tử đi tới được từ điểm bắt đầu và đi tới được một điểm kết thúc
    const walk = (seeds, next) => {
      const seen = new Set(seeds);
      const q = [...seeds];
      while (q.length) for (const m of next(q.pop())) if (!seen.has(m)) { seen.add(m); q.push(m); }
      return seen;
    };
    const fwd = walk(nodes.filter((x) => x.$type === 'bpmn:StartEvent'), (x) => (x.outgoing || []).map((f) => f.targetRef));
    const bwd = walk(nodes.filter((x) => x.$type === 'bpmn:EndEvent'), (x) => (x.incoming || []).map((f) => f.sourceRef));
    for (const nd of nodes) {
      if (!fwd.has(nd)) fail(`${nd.id} không đi tới được từ điểm bắt đầu`);
      if (!bwd.has(nd)) fail(`${nd.id} không dẫn tới điểm kết thúc nào (luồng kẹt hoặc lặp vô hạn)`);
    }
    if (!nodes.some((x) => x.$type === 'bpmn:StartEvent')) fail(`Process ${p.id} thiếu điểm bắt đầu`);
    if (!nodes.some((x) => x.$type === 'bpmn:EndEvent')) fail(`Process ${p.id} thiếu điểm kết thúc`);
  }
  for (const mf of collab.messageFlows || []) {
    const a = ownerOf.get(mf.sourceRef);
    const b = ownerOf.get(mf.targetRef);
    if (!a || !b || a === b) fail(`Message Flow ${mf.id} không nối hai participant khác nhau`);
    for (const end of [mf.sourceRef, mf.targetRef]) if (isA(end, 'bpmn:Gateway')) fail(`Message Flow ${mf.id} nối vào gateway`);
    if (isA(mf.targetRef, 'bpmn:Event') && !(mf.targetRef.eventDefinitions || []).some((d) => d.$type === 'bpmn:MessageEventDefinition'))
      fail(`Message Flow ${mf.id} đi vào sự kiện không phải loại message`);
  }
  // Mọi phần tử đều có hình vẽ (DI)
  const drawn = new Set(defs.diagrams.flatMap((dg) => dg.plane.planeElement.map((pe) => pe.bpmnElement)));
  const need = [...collab.participants, ...(collab.messageFlows || []), ...(collab.artifacts || [])];
  for (const p of procs) {
    need.push(...(p.flowElements || []).filter((e) => e.$type !== 'bpmn:DataObject'), ...(p.artifacts || []));
    for (const ls of p.laneSets || []) need.push(...ls.lanes);
  }
  for (const el of need) if (!drawn.has(el)) fail(`${el.id} không có hình vẽ trong BPMNDiagram`);
  const timers = procs.flatMap((p) => p.flowElements || []).filter((e) => (e.eventDefinitions || []).some((d) => d.$type === 'bpmn:TimerEventDefinition'));
  const typed = Object.keys(stats).filter((t) => /UserTask|ServiceTask|ScriptTask|ParallelGateway|InclusiveGateway/.test(t));
  if (typed.length) fail('Có loại phần tử không được dùng: ' + typed.join(', '));
  console.log(`   Cấu trúc: ${collab.participants.length} participant, ${(collab.messageFlows || []).length} message flow, ${stats['bpmn:SequenceFlow'] || 0} sequence flow, ${timers.length} timer (${timers.map((t) => t.name).join('; ') || 'không có'})`);
}
console.log(failed ? `\nCÓ ${failed} LỖI` : `\nKhông có lỗi. Số ghi nhận đã biết của bpmnlint: ${accepted}.`);
process.exit(failed ? 1 : 0);
