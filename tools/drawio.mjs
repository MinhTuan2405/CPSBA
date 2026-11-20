// Chuyển các tệp .bpmn trong thư mục bpmn/ sang tệp .drawio, mở được bằng draw.io (diagrams.net).
// Giữ nguyên vị trí, kích thước, đường nối, nhãn và màu của sơ đồ gốc; mỗi phần tử dùng hình BPMN có sẵn của draw.io.
// Cách dùng: node drawio.mjs [tên tệp không có đuôi ...]. Không có tên: chuyển mọi tệp trong bpmn/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BpmnModdle } from 'bpmn-moddle';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const srcDir = path.join(root, 'bpmn');
const outDir = path.join(root, 'drawio');

const LAYER = '1';
const LABEL_WRAP = 90; // bpmn-js ngắt dòng nhãn nằm ngoài hình ở bề rộng này
const LABEL_TOP = 7; // draw.io đặt chữ thấp hơn điểm neo của nhãn chừng này
const HOOK = 10; // bề rộng móc của ghi chú
const NOTE_PAD = 7; // lề chữ của ghi chú trong bpmn-js

const TASK_POINTS = 'points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];';
const S = {
  task: TASK_POINTS + 'shape=mxgraph.bpmn.task2;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;container=1;expand=0;collapsible=0;',
  event: 'points=[[0.145,0.145,0],[0.5,0,0],[0.855,0.145,0],[1,0.5,0],[0.855,0.855,0],[0.5,1,0],[0.145,0.855,0],[0,0.5,0]];shape=mxgraph.bpmn.event;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outlineConnect=0;aspect=fixed;',
  gateway: 'points=[[0.25,0.25,0],[0.5,0,0],[0.75,0.25,0],[1,0.5,0],[0.75,0.75,0],[0.5,1,0],[0.25,0.75,0],[0,0.5,0]];shape=mxgraph.bpmn.gateway2;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=rhombusPerimeter;outlineConnect=0;',
  data: 'shape=mxgraph.bpmn.data2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;size=15;html=1;',
  store: 'shape=datastore;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
  pool: 'swimlane;html=1;startSize=30;fontStyle=0;collapsible=0;swimlaneLine=1;swimlaneFillColor=#ffffff;whiteSpace=wrap;',
  lane: 'swimlane;html=1;startSize=30;fontStyle=0;collapsible=0;swimlaneLine=0;fillColor=none;whiteSpace=wrap;',
  blackBox: 'rounded=0;whiteSpace=wrap;html=1;',
  note: 'shape=mxgraph.flowchart.annotation_1;html=1;whiteSpace=wrap;fillColor=none;labelPosition=right;align=left;verticalAlign=top;',
  group: 'rounded=1;arcSize=10;dashed=1;dashPattern=8 3 1 3;fillColor=none;whiteSpace=wrap;html=1;verticalAlign=top;',
  other: 'rounded=1;whiteSpace=wrap;html=1;',
  sequence: 'html=1;endArrow=blockThin;endFill=1;',
  message: 'html=1;dashed=1;dashPattern=8 4;endArrow=block;endFill=0;startArrow=oval;startFill=0;startSize=4;',
  association: 'html=1;dashed=1;dashPattern=1 4;endArrow=none;',
  dataAssociation: 'html=1;dashed=1;dashPattern=1 4;endArrow=open;',
};
const TASK_MARKER = { UserTask: 'user', ServiceTask: 'service', SendTask: 'send', ReceiveTask: 'receive', ManualTask: 'manual', BusinessRuleTask: 'businessRule', ScriptTask: 'script' };
const EVENT_SYMBOL = { Message: 'message', Timer: 'timer', Escalation: 'escalation', Conditional: 'conditional', Link: 'link', Error: 'error', Cancel: 'cancel', Compensate: 'compensation', Signal: 'signal', Terminate: 'terminate' };

const is = (bo, type) => !!bo && bo.$instanceOf(`bpmn:${type}`);
const num = (n) => String(Math.round(n * 1e6) / 1e6);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '&#10;');
// Nhãn của draw.io là HTML: thoát ký tự đặc biệt rồi đổi xuống dòng thành <br>
const label = (s) => esc(String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r?\n/g, '<br>'));

function colors(di) {
  const a = di.$attrs || {};
  return { stroke: a['bioc:stroke'] || a['color:border-color'], fill: a['bioc:fill'] || a['color:background-color'] };
}

function activityStyle(bo, di) {
  let s = S.task + `taskMarker=${TASK_MARKER[bo.$type.replace('bpmn:', '')] || 'abstract'};`;
  if (is(bo, 'CallActivity')) s += 'bpmnShapeType=call;';
  else if (is(bo, 'Transaction')) s += 'bpmnShapeType=transaction;';
  else if (bo.triggeredByEvent) s += 'bpmnShapeType=subprocess;';
  if (is(bo, 'SubProcess')) s += di.isExpanded === true ? 'verticalAlign=top;' : 'isLoopSub=1;';
  if (is(bo, 'AdHocSubProcess')) s += 'isAdHoc=1;';
  const loop = bo.loopCharacteristics;
  if (is(loop, 'MultiInstanceLoopCharacteristics')) s += loop.isSequential ? 'isLoopMultiSeq=1;' : 'isLoopMultiParallel=1;';
  else if (loop) s += 'isLoopStandard=1;';
  return s;
}

function eventStyle(bo) {
  let outline = 'catching';
  if (is(bo, 'StartEvent')) outline = bo.isInterrupting === false ? 'eventNonint' : 'standard';
  else if (is(bo, 'EndEvent')) outline = 'end';
  else if (is(bo, 'BoundaryEvent')) outline = bo.cancelActivity === false ? 'boundNonint' : 'boundInt';
  else if (is(bo, 'IntermediateThrowEvent')) outline = 'throwing';
  const defs = bo.eventDefinitions || [];
  let symbol = 'general';
  if (defs.length > 1) symbol = bo.parallelMultiple ? 'parallelMultiple' : 'multiple';
  else if (defs.length === 1) symbol = EVENT_SYMBOL[defs[0].$type.replace(/^bpmn:|EventDefinition$/g, '')] || 'general';
  return S.event + `outline=${outline};symbol=${symbol};`;
}

function gatewayStyle(bo, di) {
  if (is(bo, 'ParallelGateway')) return S.gateway + 'outline=none;symbol=none;gwType=parallel;';
  if (is(bo, 'InclusiveGateway')) return S.gateway + 'outline=end;symbol=general;';
  if (is(bo, 'ComplexGateway')) return S.gateway + 'outline=none;symbol=none;gwType=complex;';
  if (is(bo, 'EventBasedGateway')) return S.gateway + `outline=${bo.instantiate ? 'standard' : 'catching'};symbol=${bo.eventGatewayType === 'Parallel' ? 'parallelMultiple' : 'multiple'};`;
  return S.gateway + 'outline=none;symbol=none;' + (di.isMarkerVisible ? 'gwType=exclusive;' : '');
}

// Bỏ điểm trùng và điểm nằm giữa một đoạn thẳng ngang hoặc dọc
function simplify(points) {
  const out = [];
  for (const p of points) {
    const a = out[out.length - 2];
    const b = out[out.length - 1];
    if (b && b.x === p.x && b.y === p.y) continue;
    if (a && ((a.x === b.x && b.x === p.x) || (a.y === b.y && b.y === p.y))) out.pop();
    out.push(p);
  }
  return out;
}

// Điểm giữa của đường gấp khúc, tính theo cách draw.io đặt nhãn của đường nối
function midpoint(pts) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
  const dist = Math.round(seg.reduce((a, b) => a + b, 0) / 2);
  let done = 0;
  let i = 0;
  while (i < seg.length - 1 && dist >= Math.round(done + seg[i])) done += seg[i++];
  const f = seg[i] ? (dist - done) / seg[i] : 0;
  return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * f, y: pts[i].y + (pts[i + 1].y - pts[i].y) * f };
}

// Chỗ đường nối bám vào hình: tỉ lệ trên khung hình, phần nằm ngoài khung thì tính bằng điểm ảnh
function anchor(prefix, p, b) {
  const one = (v, from, size) => {
    const f = Math.min(1, Math.max(0, (v - from) / size));
    return [f, v - from - f * size];
  };
  const [fx, dx] = one(p.x, b.x, b.w);
  const [fy, dy] = one(p.y, b.y, b.h);
  return `${prefix}X=${num(fx)};${prefix}Y=${num(fy)};${prefix}Dx=${num(dx)};${prefix}Dy=${num(dy)};${prefix}Perimeter=0;`;
}

// Một đoạn thẳng nối hai hình đi ra và đi vào đúng cạnh đối diện nhau
function facing(p0, p1, sb, tb) {
  const near = (a, b) => Math.abs(a - b) < 1;
  if (p0.y === p1.y) return p1.x > p0.x ? near(p0.x, sb.x + sb.w) && near(p1.x, tb.x) : near(p0.x, sb.x) && near(p1.x, tb.x + tb.w);
  if (p0.x === p1.x) return p1.y > p0.y ? near(p0.y, sb.y + sb.h) && near(p1.y, tb.y) : near(p0.y, sb.y) && near(p1.y, tb.y + tb.h);
  return false;
}

function convertDiagram(diagram, problems) {
  const shapes = [];
  const edges = [];
  for (const di of (diagram.plane && diagram.plane.planeElement) || []) {
    const bo = di.bpmnElement;
    if (!bo || !bo.id) { problems.push(`Phần tử hình ${di.id} không trỏ tới phần tử BPMN nào`); continue; }
    if (di.$type === 'bpmndi:BPMNShape' && di.bounds) {
      const b = { x: di.bounds.x, y: di.bounds.y, w: di.bounds.width, h: di.bounds.height };
      shapes.push({ id: bo.id, bo, di, b, cell: b, parent: LAYER });
    } else if (di.$type === 'bpmndi:BPMNEdge' && (di.waypoint || []).length >= 2) {
      edges.push({ id: bo.id, bo, di });
    } else problems.push(`Bỏ qua ${bo.id}: thiếu khung hoặc thiếu điểm đường nối`);
  }
  const byId = new Map(shapes.map((s) => [s.id, s]));

  // Hình cha là pool, lane hoặc quy trình con mở rộng nhỏ nhất chứa trọn hình
  const holds = (s) => (is(s.bo, 'Participant') && s.bo.processRef) || is(s.bo, 'Lane') || (is(s.bo, 'SubProcess') && s.di.isExpanded === true);
  const area = (s) => s.b.w * s.b.h;
  const inside = (a, b) => a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h;
  const containers = shapes.filter(holds);
  for (const s of shapes) {
    if (is(s.bo, 'Participant')) continue;
    const fits = containers.filter((c) => c !== s && area(c) > area(s) && inside(s.b, c.b) && !(is(s.bo, 'Lane') && is(c.bo, 'SubProcess')));
    if (fits.length) s.parent = fits.reduce((a, c) => (area(c) < area(a) ? c : a)).id;
  }
  const origin = (id) => (byId.has(id) ? byId.get(id).b : { x: 0, y: 0 });
  const chain = (s) => {
    const out = [];
    for (let id = s.parent; id !== LAYER; id = byId.get(id).parent) out.push(id);
    return [...out, LAYER];
  };

  const cells = new Map(); // id hình cha -> danh sách XML của các ô con
  const put = (parent, xml) => cells.set(parent, [...(cells.get(parent) || []), xml]);
  const vertexXml = new Map();

  for (const s of shapes) {
    const { bo, di, b } = s;
    const { stroke, fill } = colors(di);
    let style;
    let value = bo.name;
    let outside = false; // nhãn nằm ngoài hình
    let offset = null;
    let fillable = true;
    if (is(bo, 'Participant')) style = bo.processRef ? S.pool + `horizontal=${di.isHorizontal === false ? 1 : 0};` : S.blackBox;
    else if (is(bo, 'Lane')) style = S.lane + `horizontal=${di.isHorizontal === false ? 1 : 0};`;
    else if (is(bo, 'Activity')) style = activityStyle(bo, di);
    else if (is(bo, 'Event')) { style = eventStyle(bo); outside = true; }
    else if (is(bo, 'Gateway')) { style = gatewayStyle(bo, di); outside = true; }
    else if (is(bo, 'DataStoreReference')) { style = S.store; outside = true; }
    else if (is(bo, 'DataObjectReference') || is(bo, 'DataInput') || is(bo, 'DataOutput')) {
      style = S.data + (is(bo, 'DataInput') ? 'bpmnTransferType=input;' : is(bo, 'DataOutput') ? 'bpmnTransferType=output;' : '');
      if ((bo.dataObjectRef || bo).isCollection) style += 'isCollection=1;';
      outside = true;
    } else if (is(bo, 'TextAnnotation')) {
      // Ô chỉ là cái móc bên trái; chữ là nhãn nằm bên phải móc, ngắt dòng trong bề rộng của ghi chú
      value = bo.text;
      s.cell = { x: b.x, y: b.y, w: HOOK, h: b.h };
      style = S.note + `spacingLeft=${NOTE_PAD - HOOK - 2};labelWidth=${Math.max(20, b.w - 2 * NOTE_PAD)};`;
      fillable = false;
    } else if (is(bo, 'Group')) { style = S.group; value = bo.categoryValueRef && bo.categoryValueRef.value; }
    else { style = S.other; problems.push(`Chưa có hình riêng cho ${bo.$type} (${bo.id}), dùng hình chữ nhật`); }

    if (outside) {
      style += 'fontSize=11;';
      const lb = di.label && di.label.bounds;
      if (value && lb) {
        style += `whiteSpace=wrap;labelWidth=${LABEL_WRAP};`;
        offset = { x: lb.x + lb.width / 2 - (b.x + b.w / 2), y: lb.y - (b.y + b.h) - LABEL_TOP };
      }
    }
    if (stroke) style += `strokeColor=${stroke};fontColor=${stroke};`;
    if (fill && fillable) style += `fillColor=${fill};`;

    const o = origin(s.parent);
    const c = s.cell;
    const off = offset ? `<mxPoint x="${num(offset.x)}" y="${num(offset.y)}" as="offset"/>` : '';
    vertexXml.set(s.id, `<mxCell id="${esc(s.id)}" value="${label(value)}" style="${esc(style)}" vertex="1" parent="${esc(s.parent)}">`
      + `<mxGeometry x="${num(c.x - o.x)}" y="${num(c.y - o.y)}" width="${num(c.w)}" height="${num(c.h)}" as="geometry">${off}</mxGeometry></mxCell>`);
  }

  for (const e of edges) {
    const { bo, di } = e;
    const { stroke } = colors(di);
    let src = bo.sourceRef;
    let tgt = bo.targetRef;
    let style;
    if (is(bo, 'SequenceFlow')) {
      style = S.sequence;
      if (bo.conditionExpression && is(src, 'Activity')) style += 'startArrow=diamondThin;startFill=0;startSize=10;';
      else if (src && src.default === bo) style += 'startArrow=dash;startFill=0;';
    } else if (is(bo, 'MessageFlow')) style = S.message;
    else if (is(bo, 'DataInputAssociation')) { style = S.dataAssociation; src = (bo.sourceRef || [])[0]; tgt = bo.$parent; }
    else if (is(bo, 'DataOutputAssociation')) { style = S.dataAssociation; src = bo.$parent; }
    else if (is(bo, 'Association')) {
      style = S.association;
      if (bo.associationDirection === 'One') style = S.dataAssociation;
      else if (bo.associationDirection === 'Both') style = S.dataAssociation + 'startArrow=open;';
    } else { style = 'html=1;endArrow=none;'; problems.push(`Chưa có kiểu đường nối riêng cho ${bo.$type} (${bo.id})`); }

    const pts = simplify(di.waypoint.map((p) => ({ x: p.x, y: p.y })));
    if (pts.length < 2) { problems.push(`Bỏ qua ${bo.id}: đường nối không có độ dài`); continue; }
    const first = pts[0];
    const last = pts[pts.length - 1];
    const s = src && byId.get(src.id);
    const t = tgt && byId.get(tgt.id);
    if (!s || !t) problems.push(`Đường nối ${bo.id} có đầu không gắn vào hình nào, giữ nguyên tọa độ đầu đó`);

    // Đường nối nằm trong hình cha chung gần nhất của hai đầu, để khi kéo pool thì đường nối đi theo
    let parent = LAYER;
    if (s && t) { const tc = chain(t); parent = chain(s).find((id) => tc.includes(id)); }
    const o = origin(parent);
    const pt = (p, as) => `<mxPoint x="${num(p.x - o.x)}" y="${num(p.y - o.y)}"${as ? ` as="${as}"` : ''}/>`;

    // Đường chỉ gồm đoạn ngang và dọc thì để draw.io tự giữ vuông góc khi kéo hình
    const square = pts.every((p, i) => i === 0 || p.x === pts[i - 1].x || p.y === pts[i - 1].y);
    if (square && (pts.length > 2 || (s && t && facing(first, last, s.cell, t.cell)))) style += 'edgeStyle=orthogonalEdgeStyle;';
    if (s) style += anchor('exit', first, s.cell);
    if (t) style += anchor('entry', last, t.cell);
    if (stroke) style += `strokeColor=${stroke};fontColor=${stroke};`;

    let geo = '';
    const lb = di.label && di.label.bounds;
    let wrap = '';
    if (bo.name) {
      style += 'fontSize=11;';
      if (lb) {
        const m = midpoint(pts);
        style += 'whiteSpace=wrap;verticalAlign=top;';
        wrap = ` width="${LABEL_WRAP}"`;
        geo += `<mxPoint x="${num(lb.x + lb.width / 2 - m.x)}" y="${num(lb.y - m.y - LABEL_TOP)}" as="offset"/>`;
      }
    }
    if (!s) geo = pt(first, 'sourcePoint') + geo;
    if (!t) geo = pt(last, 'targetPoint') + geo;
    const inner = pts.slice(1, -1);
    if (inner.length) geo = `<Array as="points">${inner.map((p) => pt(p)).join('')}</Array>` + geo;

    put(parent, `<mxCell id="${esc(e.id)}" value="${label(bo.name)}" style="${esc(style)}" edge="1" parent="${esc(parent)}"`
      + `${s ? ` source="${esc(s.id)}"` : ''}${t ? ` target="${esc(t.id)}"` : ''}><mxGeometry${wrap} relative="1" as="geometry">${geo}</mxGeometry></mxCell>`);
  }

  // Ghi theo cây: hình cha trước, hình con sau, đường nối của mỗi hình cha nằm sau các hình con
  const rank = (s) => (is(s.bo, 'Participant') ? 0 : is(s.bo, 'Lane') ? 1 : 2);
  const out = [];
  const emit = (parent) => {
    for (const s of shapes.filter((x) => x.parent === parent).sort((a, b) => rank(a) - rank(b))) {
      out.push(vertexXml.get(s.id));
      emit(s.id);
    }
    out.push(...(cells.get(parent) || []));
  };
  emit(LAYER);

  return { xml: out, shapes: shapes.length, edges: edges.length };
}

const only = process.argv.slice(2);
const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.bpmn')).sort()
  .filter((f) => !only.length || only.includes(path.basename(f, '.bpmn')));
if (!files.length) { console.log('Không tìm thấy tệp .bpmn nào để chuyển.'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

let bad = 0;
for (const f of files) {
  const name = path.basename(f, '.bpmn');
  const problems = [];
  const { rootElement, warnings } = await new BpmnModdle().fromXML(fs.readFileSync(path.join(srcDir, f), 'utf8'));
  for (const w of warnings) problems.push(`Cảnh báo khi đọc BPMN: ${w.message}`);
  const pages = [];
  let shapes = 0;
  let edges = 0;
  for (const [i, diagram] of (rootElement.diagrams || []).entries()) {
    const r = convertDiagram(diagram, problems);
    shapes += r.shapes;
    edges += r.edges;
    pages.push(`  <diagram id="${esc(diagram.id || `page-${i + 1}`)}" name="${esc(diagram.name || name)}">\n`
      + '    <mxGraphModel grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">\n'
      + '      <root>\n        <mxCell id="0"/>\n        <mxCell id="1" parent="0"/>\n'
      + r.xml.map((c) => `        ${c}\n`).join('')
      + '      </root>\n    </mxGraphModel>\n  </diagram>\n');
  }
  if (!pages.length) problems.push('Tệp không có sơ đồ nào');
  fs.writeFileSync(path.join(outDir, `${name}.drawio`), `<mxfile host="app.diagrams.net" agent="CellphoneS BPMN tools (drawio.mjs)">\n${pages.join('')}</mxfile>\n`);
  console.log(`== ${name}: ${shapes} hình, ${edges} đường nối`);
  for (const p of problems) { bad++; console.log('  LỖI: ' + p); }
}
process.exit(bad ? 1 : 0);
