// Bộ dựng sơ đồ BPMN 2.0: mô tả phần tử theo lưới (làn, cột, hàng),
// tự tính tọa độ, đường nối và xuất XML có đầy đủ BPMN Diagram Interchange.
import * as BpmnModdlePkg from 'bpmn-moddle';

const BpmnModdle = BpmnModdlePkg.BpmnModdle || BpmnModdlePkg.default;

const SIZES = {
  startEvent: [36, 36],
  endEvent: [36, 36],
  intermediateCatchEvent: [36, 36],
  intermediateThrowEvent: [36, 36],
  exclusiveGateway: [50, 50],
  eventBasedGateway: [50, 50],
  parallelGateway: [50, 50],
  task: [140, 80],
  subProcess: [150, 90],
  dataObjectReference: [36, 50]
};

const BPMN_TYPE = {
  startEvent: 'bpmn:StartEvent',
  endEvent: 'bpmn:EndEvent',
  intermediateCatchEvent: 'bpmn:IntermediateCatchEvent',
  intermediateThrowEvent: 'bpmn:IntermediateThrowEvent',
  exclusiveGateway: 'bpmn:ExclusiveGateway',
  eventBasedGateway: 'bpmn:EventBasedGateway',
  parallelGateway: 'bpmn:ParallelGateway',
  task: 'bpmn:Task',
  subProcess: 'bpmn:SubProcess'
};

export const COLORS = {
  source: '#15803d', // có nguồn công khai
  survey: '#c2410c', // cần khảo sát
  team: '#7e22ce', // nhóm nghiên cứu
  time: '#1d4ed8', // khoảng thời gian cần đo
  info: '#374151',
  change: '#be123c', // To-Be: thay đổi so với As-Is
  decide: '#0e7490', // To-Be: cần doanh nghiệp quyết định
  newStep: '#15803d', // To-Be: chú giải cho bước mới
  changedStep: '#b45309' // To-Be: chú giải cho bước được thay đổi
};

// Màu nền của phần tử trong bản To-Be: bước mới và bước được thay đổi
export const MARKS = {
  new: { fill: '#dcfce7', stroke: '#15803d' },
  changed: { fill: '#fef3c7', stroke: '#b45309' }
};

// ---- Ước lượng bề rộng chữ (Arial) để tính kích thước nhãn và ghi chú ----
const CW = {
  ' ': 0.278, i: 0.222, j: 0.222, l: 0.222, f: 0.278, t: 0.278, r: 0.333, m: 0.833, w: 0.722,
  c: 0.5, k: 0.5, s: 0.5, v: 0.5, x: 0.5, y: 0.5, z: 0.5, I: 0.278, J: 0.5, M: 0.833, W: 0.944,
  '.': 0.278, ',': 0.278, ':': 0.278, ';': 0.278, '(': 0.333, ')': 0.333, '-': 0.333, '/': 0.278,
  '?': 0.556, '!': 0.278, "'": 0.191, '"': 0.355
};
function charW(ch) {
  let c = ch.normalize('NFD').replace(/[̀-ͯ]/g, '');
  if (c === 'đ') c = 'd';
  if (c === 'Đ') c = 'D';
  c = c[0] || ' ';
  if (c in CW) return CW[c];
  if (/[A-Z]/.test(c)) return 0.69;
  return 0.556;
}
export function textWidth(s, px) {
  let w = 0;
  for (const ch of s) w += charW(ch);
  return w * px;
}
export function wrap(text, maxW, px) {
  const out = [];
  for (const para of String(text).split('\n')) {
    let line = '';
    for (const word of para.split(' ')) {
      const t = line ? line + ' ' + word : word;
      if (!line || textWidth(t, px) <= maxW) line = t;
      else {
        out.push(line);
        line = word;
      }
    }
    out.push(line);
  }
  return out;
}
function labelBox(text, px = 11, maxW = 90) {
  const lines = wrap(text, maxW, px);
  const w = Math.min(maxW, Math.max(...lines.map((l) => textWidth(l, px))));
  return { w: Math.ceil(w) + 2, h: Math.ceil(lines.length * px * 1.2) + 1 };
}

const R = (v) => Math.round(v);
const isGateway = (n) => n.type.endsWith('Gateway');
const isEvent = (n) => n.type.endsWith('Event');

export class Diagram {
  constructor(o) {
    this.o = Object.assign(
      { cw: 170, rh: 120, x0: 160, y0: 190, poolGap: 64, padL: 25, padR: 25, laneLabel: 30, poolLabel: 30 },
      o
    );
    this.pools = [];
    this.lanes = {};
    this.nodes = {};
    this.flows = [];
    this.msgs = [];
    this.notes = [];
    this.datas = {};
    this.dataLinks = [];
    this._y = this.o.y0;
    this._seq = 0;
  }

  get width() {
    const o = this.o;
    return o.poolLabel + o.laneLabel + o.padL + o.cols * o.cw + o.padR;
  }

  pool(id, name, { lanes, blackbox, height } = {}) {
    const o = this.o;
    const p = { id, name, blackbox: !!blackbox, x: o.x0, y: this._y, w: this.width, lanes: [] };
    if (blackbox) {
      p.h = height || 60;
    } else {
      let y = this._y;
      for (const l of lanes) {
        const padTop = 10 + (l.padTop || 0);
        const h = l.rows * o.rh + padTop + 10 + (l.padBottom || 0);
        const lane = { id: l.id, name: l.name, pool: p, x: o.x0 + o.poolLabel, y, w: this.width - o.poolLabel, h, padTop };
        p.lanes.push(lane);
        this.lanes[l.id] = lane;
        y += h;
      }
      p.h = y - this._y;
    }
    this._y += p.h + o.poolGap;
    this.pools.push(p);
    return p;
  }

  // Tọa độ tâm của một ô lưới trong làn
  p(laneId, col, row) {
    const o = this.o;
    const l = this.lanes[laneId];
    return {
      x: l.x + o.laneLabel + o.padL + col * o.cw + o.cw / 2,
      y: l.y + l.padTop + row * o.rh + o.rh / 2
    };
  }
  n(id) {
    const n = this.nodes[id];
    if (!n) throw new Error('Không có phần tử: ' + id);
    return n;
  }
  laneTop(id) {
    return this.lanes[id].y;
  }
  laneBottom(id) {
    return this.lanes[id].y + this.lanes[id].h;
  }

  node(id, type, name, opt = {}) {
    if (this.nodes[id]) throw new Error('Trùng id: ' + id);
    const [w0, h0] = SIZES[type];
    const w = opt.w || w0;
    const h = opt.h || h0;
    const c = this.p(opt.lane, opt.col, opt.row);
    const n = { id, type, name, opt, lane: this.lanes[opt.lane], cx: c.x, cy: c.y, w, h, x: c.x - w / 2, y: c.y - h / 2 };
    this.nodes[id] = n;
    return n;
  }
  start(id, name, opt) { return this.node(id, 'startEvent', name, opt); }
  end(id, name, opt) { return this.node(id, 'endEvent', name, opt); }
  catchEv(id, name, opt) { return this.node(id, 'intermediateCatchEvent', name, opt); }
  throwEv(id, name, opt) { return this.node(id, 'intermediateThrowEvent', name, opt); }
  task(id, name, opt) { return this.node(id, 'task', name, opt); }
  sub(id, name, opt) { return this.node(id, 'subProcess', name, opt); }
  xor(id, name, opt) { return this.node(id, 'exclusiveGateway', name, opt); }
  ebg(id, name, opt) { return this.node(id, 'eventBasedGateway', name, opt); }

  flow(from, to, name, opt = {}) {
    this.n(from);
    this.n(to);
    this.flows.push({ id: `Flow_${++this._seq}`, from, to, name: name || '', opt });
  }
  msg(from, to, name, opt = {}) {
    this.msgs.push({ id: `Msg_${++this._seq}`, from, to, name: name || '', opt });
  }
  note(text, opt = {}) {
    this.notes.push({ id: `Note_${++this._seq}`, text, opt });
  }
  data(id, name, opt = {}) {
    const [w, h] = SIZES.dataObjectReference;
    const a = this.n(opt.near);
    const cx = a.cx + (opt.dx || 0);
    const cy = opt.pos === 'below' ? a.y + a.h + 45 + (opt.dy || 0) : a.y - 55 + (opt.dy || 0);
    this.datas[id] = { id, name, cx, cy, w, h, x: cx - w / 2, y: cy - h / 2, opt };
  }
  dataOut(taskId, dataId) { this.dataLinks.push({ id: `DataOut_${++this._seq}`, kind: 'out', task: taskId, data: dataId }); }
  dataIn(dataId, taskId) { this.dataLinks.push({ id: `DataIn_${++this._seq}`, kind: 'in', task: taskId, data: dataId }); }

  // ---- Hình học ----
  side(n, s, off = 0) {
    if (s === 'r') return { x: n.x + n.w, y: n.cy + off };
    if (s === 'l') return { x: n.x, y: n.cy + off };
    if (s === 't') return { x: n.cx + off, y: n.y };
    return { x: n.cx + off, y: n.y + n.h };
  }

  route(f) {
    const a = this.n(f.from);
    const b = this.n(f.to);
    const o = f.opt;
    let exit = o.exit;
    let enter = o.enter;
    const dx = b.cx - a.cx;
    const dy = b.cy - a.cy;
    if (!exit || !enter) {
      if (Math.abs(dy) < 1 && dx > 0) { exit = exit || 'r'; enter = enter || 'l'; }
      else if (Math.abs(dx) < 1) { exit = exit || (dy > 0 ? 'b' : 't'); enter = enter || (dy > 0 ? 't' : 'b'); }
      else if (dx > 0 && isGateway(a) && !o.exit) { exit = dy > 0 ? 'b' : 't'; enter = enter || 'l'; }
      else if (dx > 0 && isGateway(b) && !o.enter) { exit = exit || 'r'; enter = dy > 0 ? 't' : 'b'; }
      else if (dx > 0) { exit = exit || 'r'; enter = enter || 'l'; }
      else throw new Error(`Luồng ${f.from} -> ${f.to} đi ngược, cần khai báo exit/enter`);
    }
    const p1 = this.side(a, exit, o.exitOff || 0);
    const p2 = this.side(b, enter, o.enterOff || 0);
    let mid = [];
    const hz = (s) => s === 'l' || s === 'r';
    if (o.via) mid = o.via;
    else if (!hz(exit) && hz(enter)) mid = [{ x: p1.x, y: p2.y }];
    else if (hz(exit) && !hz(enter)) mid = [{ x: p2.x, y: p1.y }];
    else if (hz(exit) && hz(enter)) {
      if (Math.abs(p1.y - p2.y) > 0.5) {
        const mx = o.midX ?? (p1.x + p2.x) / 2;
        mid = [{ x: mx, y: p1.y }, { x: mx, y: p2.y }];
      }
    } else if (Math.abs(p1.x - p2.x) > 0.5) {
      const my = o.midY ?? (p1.y + p2.y) / 2;
      mid = [{ x: p1.x, y: my }, { x: p2.x, y: my }];
    }
    return [p1, ...mid, p2];
  }

  flowLabel(f, pts) {
    if (!f.name) return null;
    const { w, h } = labelBox(f.name);
    const p1 = pts[0];
    const p2 = pts[1];
    const lp = f.opt.lp || {};
    let x, y;
    if (Math.abs(p1.y - p2.y) < 0.5) {
      const dir = p2.x >= p1.x ? 1 : -1;
      x = dir > 0 ? p1.x + 8 : p1.x - 8 - w;
      y = p1.y - 5 - h;
    } else {
      const down = p2.y > p1.y;
      x = f.opt.labelSide === 'left' ? p1.x - 7 - w : p1.x + 7;
      y = down ? p1.y + 20 : p1.y - 20 - h;
    }
    return { x: x + (lp.dx || 0), y: y + (lp.dy || 0), w, h };
  }

  nodeLabel(n) {
    if (!n.name) return null;
    if (!(isGateway(n) || isEvent(n))) return null;
    const { w, h } = labelBox(n.name);
    const pos = n.opt.labelPos || (isGateway(n) ? 'tl' : 'bottom');
    let x, y;
    if (pos === 'bottom') { x = n.cx - w / 2; y = n.y + n.h + 5; }
    else if (pos === 'top') { x = n.cx - w / 2; y = n.y - 5 - h; }
    else if (pos === 'tr') { x = n.cx + 8; y = n.y + 6 - h; }
    else if (pos === 'tl') { x = n.cx - 8 - w; y = n.y + 6 - h; }
    else if (pos === 'br') { x = n.cx + 8; y = n.y + n.h - 6; }
    else if (pos === 'bl') { x = n.cx - 8 - w; y = n.y + n.h - 6; }
    else if (pos === 'right') { x = n.x + n.w + 6; y = n.cy - h / 2; }
    else if (pos === 'left') { x = n.x - 6 - w; y = n.cy - h / 2; }
    return { x: x + (n.opt.labelDx || 0), y: y + (n.opt.labelDy || 0), w, h };
  }

  msgGeom(mf) {
    const o = mf.opt;
    const fromPool = this.pools.find((p) => p.id === mf.from);
    const toPool = this.pools.find((p) => p.id === mf.to);
    const node = this.nodes[fromPool ? mf.to : mf.from];
    const pool = fromPool || toPool;
    if (!node || !pool) throw new Error(`Message Flow ${mf.from} -> ${mf.to} phải nối một phần tử với một pool`);
    const above = pool.y < node.lane.pool.y;
    const x = node.cx + (o.dx || 0);
    const pn = { x, y: above ? node.y : node.y + node.h };
    if (isEvent(node) || isGateway(node)) {
      // điểm trên đường tròn khi lệch tâm
      const r = node.w / 2;
      const d = Math.min(Math.abs(o.dx || 0), r);
      const dyc = Math.sqrt(r * r - d * d);
      pn.y = above ? node.cy - dyc : node.cy + dyc;
    }
    const pp = { x, y: above ? pool.y + pool.h : pool.y };
    const pts = fromPool ? [pp, pn] : [pn, pp];
    let label = null;
    if (mf.name) {
      const { w, h } = labelBox(mf.name);
      const lx = o.labelSide === 'left' ? x - 7 - w : x + 7;
      const ly = above ? pool.y + pool.h + 7 : pool.y - 7 - h;
      label = { x: lx + (o.lp?.dx || 0), y: ly + (o.lp?.dy || 0), w, h };
    }
    return { pts, label };
  }

  noteGeom(nt) {
    const o = nt.opt;
    const w = o.w || 150;
    const lines = wrap(nt.text, w - 16, 12);
    const h = Math.ceil(lines.length * 14.4) + 12;
    let x, y, anchor, target;
    const t = o.attach ? this.nodes[o.attach] || this.datas[o.attach] : null;
    if (o.at) {
      x = o.at.x;
      y = o.at.y;
    } else if (t) {
      const pos = o.pos || 'above';
      x = t.cx - 20 + (o.dx || 0);
      if (pos === 'above') y = t.y - 28 - h + (o.dy || 0);
      else y = t.y + t.h + 28 + (o.dy || 0);
    } else throw new Error('Ghi chú cần attach hoặc at');
    if (t) {
      const above = y + h / 2 < t.cy;
      // góc của ghi chú dùng làm điểm nối: mặc định là góc trái gần phần tử
      const ax = o.corner === 'right' ? x + w : x;
      anchor = above ? { x: ax, y: y + h } : { x: ax, y };
      target = above ? { x: t.cx + (o.tx || 0), y: t.y } : { x: t.cx + (o.tx || 0), y: t.y + t.h };
      if (o.side === 'left') { anchor = { x, y: y + h / 2 }; target = { x: t.x + t.w, y: t.cy + (o.ty || 0) }; }
      if (o.side === 'right') { anchor = { x: x + w, y: y + h / 2 }; target = { x: t.x, y: t.cy + (o.ty || 0) }; }
    }
    return { x, y, w, h, anchor, target };
  }

  dataLinkGeom(dl) {
    const t = this.n(dl.task);
    const d = this.datas[dl.data];
    const above = d.cy < t.cy;
    const pd = { x: d.cx, y: above ? d.y + d.h : d.y };
    const pt = { x: d.cx, y: above ? t.y : t.y + t.h };
    return dl.kind === 'out' ? [pt, pd] : [pd, pt];
  }

  // ---- Kiểm tra bố cục: chồng lấn và đường nối cắt qua phần tử ----
  layoutCheck() {
    const warn = [];
    const rects = [];
    const add = (id, kind, r) => r && rects.push({ id, kind, x: r.x, y: r.y, w: r.w, h: r.h });
    for (const n of Object.values(this.nodes)) {
      add(n.id, 'node', n);
      add(n.id + '.label', 'label', this.nodeLabel(n));
    }
    for (const d of Object.values(this.datas)) add(d.id, 'node', d);
    const segs = [];
    for (const f of this.flows) {
      const pts = this.route(f);
      add(f.id + '.label', 'label', this.flowLabel(f, pts));
      for (let i = 0; i < pts.length - 1; i++) segs.push({ id: `${f.from}->${f.to}`, a: pts[i], b: pts[i + 1], ends: [f.from, f.to], kind: 'seq' });
    }
    for (const mf of this.msgs) {
      const g = this.msgGeom(mf);
      add(mf.id + '.label', 'label', g.label);
      segs.push({ id: `${mf.from}=>${mf.to}`, a: g.pts[0], b: g.pts[1], ends: [mf.from, mf.to], kind: 'msg' });
    }
    for (const nt of this.notes) {
      const g = this.noteGeom(nt);
      add(nt.id, 'note', g);
      if (g.anchor) segs.push({ id: `${nt.id}~${nt.opt.attach}`, a: g.anchor, b: g.target, ends: [nt.id, nt.opt.attach], kind: 'assoc' });
    }
    for (const dl of this.dataLinks) {
      const pts = this.dataLinkGeom(dl);
      segs.push({ id: `${dl.task}~${dl.data}`, a: pts[0], b: pts[1], ends: [dl.task, dl.data], kind: 'assoc' });
    }
    const short = (id) => {
      const nt = this.notes.find((x) => x.id === id);
      return nt ? `${id} "${nt.text.slice(0, 28)}..."` : id;
    };
    const ov = (a, b, pad = 1) => a.x + pad < b.x + b.w && b.x + pad < a.x + a.w && a.y + pad < b.y + b.h && b.y + pad < a.y + a.h;
    for (let i = 0; i < rects.length; i++)
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i], b = rects[j];
        if (a.id + '.label' === b.id || b.id + '.label' === a.id) continue;
        if (ov(a, b)) warn.push(`CHỒNG: ${short(a.id)} và ${short(b.id)}`);
      }
    const hit = (s, r) => {
      // Liang-Barsky với hình chữ nhật thu nhỏ 2px
      const x0 = r.x + 2, x1 = r.x + r.w - 2, y0 = r.y + 2, y1 = r.y + r.h - 2;
      let t0 = 0, t1 = 1;
      const dx = s.b.x - s.a.x, dy = s.b.y - s.a.y;
      const clip = (p, q) => {
        if (p === 0) return q >= 0;
        const t = q / p;
        if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; }
        else { if (t < t0) return false; if (t < t1) t1 = t; }
        return true;
      };
      return clip(-dx, s.a.x - x0) && clip(dx, x1 - s.a.x) && clip(-dy, s.a.y - y0) && clip(dy, y1 - s.a.y) && t0 < t1;
    };
    for (const s of segs)
      for (const r of rects) {
        const base = r.id.replace('.label', '');
        if (s.ends.includes(base) && r.kind !== 'label') continue;
        if (r.kind === 'label' && s.id.startsWith(base)) continue;
        if (hit(s, r)) warn.push(`CẮT: đường ${short(s.id)} đi qua ${short(r.id)}`);
      }
    // đếm giao cắt giữa các đoạn trực giao
    let cross = 0;
    const list = [];
    for (let i = 0; i < segs.length; i++)
      for (let j = i + 1; j < segs.length; j++) {
        const a = segs[i], b = segs[j];
        if (a.id === b.id) continue;
        const d = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
        const d1 = d(a.a, a.b, b.a), d2 = d(a.a, a.b, b.b), d3 = d(b.a, b.b, a.a), d4 = d(b.a, b.b, a.b);
        if (d1 * d2 < 0 && d3 * d4 < 0) { cross++; list.push(`${a.id} x ${b.id}`); }
      }
    return { warn, cross, crossList: list };
  }

  // ---- Xuất XML ----
  async toXML() {
    const o = this.o;
    const moddle = new BpmnModdle();
    const m = (t, a) => moddle.create(t, a);
    const B = (r) => m('dc:Bounds', { x: R(r.x), y: R(r.y), width: R(r.w), height: R(r.h) });
    const defs = m('bpmn:Definitions', {
      id: `Definitions_${o.id}`,
      targetNamespace: 'http://bpmn.io/schema/bpmn',
      exporter: o.exporter || 'CellphoneS As-Is BPMN generator',
      exporterVersion: '1.0'
    });
    const collab = m('bpmn:Collaboration', { id: `Collaboration_${o.id}` });
    const planeEls = [];
    const obj = {}; // id -> phần tử BPMN
    const procOf = {}; // pool id -> process
    const roots = [collab];

    for (const p of this.pools) {
      const part = m('bpmn:Participant', { id: `Participant_${p.id}`, name: p.name });
      collab.get('participants').push(part);
      obj[p.id] = part;
      planeEls.push(m('bpmndi:BPMNShape', { id: `Participant_${p.id}_di`, bpmnElement: part, isHorizontal: true, bounds: B(p) }));
      if (p.blackbox) continue;
      const proc = m('bpmn:Process', { id: `Process_${p.id}`, name: p.name, isExecutable: false });
      part.processRef = proc;
      procOf[p.id] = proc;
      roots.push(proc);
      const ls = m('bpmn:LaneSet', { id: `LaneSet_${p.id}` });
      proc.get('laneSets').push(ls);
      for (const l of p.lanes) {
        const lane = m('bpmn:Lane', { id: `Lane_${l.id}`, name: l.name });
        ls.get('lanes').push(lane);
        obj['lane:' + l.id] = lane;
        planeEls.push(m('bpmndi:BPMNShape', { id: `Lane_${l.id}_di`, bpmnElement: lane, isHorizontal: true, bounds: B(l) }));
      }
    }

    // Phần tử luồng
    for (const n of Object.values(this.nodes)) {
      const el = m(BPMN_TYPE[n.type], { id: n.id, name: n.name || undefined });
      const def = n.opt.def;
      if (def === 'message') el.get('eventDefinitions').push(m('bpmn:MessageEventDefinition', { id: `${n.id}_def` }));
      if (def === 'timer') el.get('eventDefinitions').push(m('bpmn:TimerEventDefinition', { id: `${n.id}_def` }));
      if (def === 'link') el.get('eventDefinitions').push(m('bpmn:LinkEventDefinition', { id: `${n.id}_def`, name: n.opt.link || n.name }));
      if (def === 'conditional')
        el.get('eventDefinitions').push(
          m('bpmn:ConditionalEventDefinition', { id: `${n.id}_def`, condition: m('bpmn:FormalExpression', { body: n.name }) })
        );
      obj[n.id] = el;
      procOf[n.lane.pool.id].get('flowElements').push(el);
      obj['lane:' + n.lane.id].get('flowNodeRef').push(el);
      const attrs = { id: `${n.id}_di`, bpmnElement: el, bounds: B(n) };
      if (n.type === 'exclusiveGateway') attrs.isMarkerVisible = true;
      if (n.type === 'subProcess') attrs.isExpanded = false;
      const lb = this.nodeLabel(n);
      if (lb) attrs.label = m('bpmndi:BPMNLabel', { bounds: B(lb) });
      const nodeShape = m('bpmndi:BPMNShape', attrs);
      const mk = n.opt.mark && MARKS[n.opt.mark];
      if (mk) {
        nodeShape.set('bioc:stroke', mk.stroke);
        nodeShape.set('bioc:fill', mk.fill);
        nodeShape.set('color:border-color', mk.stroke);
        nodeShape.set('color:background-color', mk.fill);
      }
      planeEls.push(nodeShape);
    }

    // Data Object
    for (const d of Object.values(this.datas)) {
      const near = this.n(d.opt.near);
      const proc = procOf[near.lane.pool.id];
      const dobj = m('bpmn:DataObject', { id: `${d.id}_obj` });
      const ref = m('bpmn:DataObjectReference', { id: d.id, name: d.name, dataObjectRef: dobj });
      proc.get('flowElements').push(dobj, ref);
      obj[d.id] = ref;
      const { w, h } = labelBox(d.name);
      const lb = d.opt.labelPos === 'top' ? { x: d.cx - w / 2, y: d.y - 4 - h, w, h } : d.opt.labelPos === 'right' ? { x: d.x + d.w + 6, y: d.cy - h / 2, w, h } : { x: d.cx - w / 2, y: d.y + d.h + 4, w, h };
      planeEls.push(m('bpmndi:BPMNShape', { id: `${d.id}_di`, bpmnElement: ref, bounds: B(d), label: m('bpmndi:BPMNLabel', { bounds: B(lb) }) }));
    }
    for (const dl of this.dataLinks) {
      const task = obj[dl.task];
      const ref = obj[dl.data];
      let assoc;
      if (dl.kind === 'out') {
        assoc = m('bpmn:DataOutputAssociation', { id: dl.id, targetRef: ref });
        task.get('dataOutputAssociations').push(assoc);
      } else {
        const prop = m('bpmn:Property', { id: `${dl.id}_prop`, name: '__targetRef_placeholder' });
        task.get('properties').push(prop);
        assoc = m('bpmn:DataInputAssociation', { id: dl.id, sourceRef: [ref], targetRef: prop });
        task.get('dataInputAssociations').push(assoc);
      }
      const pts = this.dataLinkGeom(dl);
      planeEls.push(m('bpmndi:BPMNEdge', { id: `${dl.id}_di`, bpmnElement: assoc, waypoint: pts.map((p) => m('dc:Point', { x: R(p.x), y: R(p.y) })) }));
    }

    // Sequence Flow
    const problems = [];
    for (const f of this.flows) {
      const a = this.n(f.from);
      const b = this.n(f.to);
      if (a.lane.pool !== b.lane.pool) problems.push(`Sequence Flow ${f.from} -> ${f.to} đi qua ranh giới pool`);
      const sf = m('bpmn:SequenceFlow', { id: f.id, name: f.name || undefined, sourceRef: obj[f.from], targetRef: obj[f.to] });
      obj[f.id] = sf;
      obj[f.from].get('outgoing').push(sf);
      obj[f.to].get('incoming').push(sf);
      procOf[a.lane.pool.id].get('flowElements').push(sf);
      const pts = this.route(f);
      const attrs = { id: `${f.id}_di`, bpmnElement: sf, waypoint: pts.map((p) => m('dc:Point', { x: R(p.x), y: R(p.y) })) };
      const lb = this.flowLabel(f, pts);
      if (lb) attrs.label = m('bpmndi:BPMNLabel', { bounds: B(lb) });
      planeEls.push(m('bpmndi:BPMNEdge', attrs));
    }
    // Điều kiện trên các nhánh của Exclusive Gateway
    for (const n of Object.values(this.nodes)) {
      if (n.type !== 'exclusiveGateway') continue;
      const out = obj[n.id].get('outgoing');
      if (out.length < 2) continue;
      for (const sf of out) {
        if (!sf.name) problems.push(`Nhánh ${n.id} -> ${sf.targetRef.id} thiếu điều kiện`);
        sf.conditionExpression = m('bpmn:FormalExpression', { body: sf.name || '' });
      }
    }

    // Message Flow
    for (const mf of this.msgs) {
      const s = obj[mf.from];
      const t = obj[mf.to];
      if (!s || !t) throw new Error(`Message Flow thiếu đầu nối: ${mf.from} -> ${mf.to}`);
      const el = m('bpmn:MessageFlow', { id: mf.id, name: mf.name || undefined, sourceRef: s, targetRef: t });
      collab.get('messageFlows').push(el);
      const g = this.msgGeom(mf);
      const attrs = { id: `${mf.id}_di`, bpmnElement: el, waypoint: g.pts.map((p) => m('dc:Point', { x: R(p.x), y: R(p.y) })) };
      if (g.label) attrs.label = m('bpmndi:BPMNLabel', { bounds: B(g.label) });
      planeEls.push(m('bpmndi:BPMNEdge', attrs));
    }

    // Text Annotation
    for (const nt of this.notes) {
      const g = this.noteGeom(nt);
      const ann = m('bpmn:TextAnnotation', { id: nt.id, text: nt.text });
      const t = nt.opt.attach ? this.nodes[nt.opt.attach] : null;
      const tData = nt.opt.attach ? this.datas[nt.opt.attach] : null;
      const owner = t ? procOf[t.lane.pool.id] : tData ? procOf[this.n(tData.opt.near).lane.pool.id] : collab;
      owner.get('artifacts').push(ann);
      const color = COLORS[nt.opt.kind || 'info'];
      const shape = m('bpmndi:BPMNShape', { id: `${nt.id}_di`, bpmnElement: ann, bounds: B(g) });
      shape.set('bioc:stroke', color);
      shape.set('color:border-color', color);
      planeEls.push(shape);
      if (g.anchor) {
        const as = m('bpmn:Association', { id: `${nt.id}_assoc`, sourceRef: ann, targetRef: obj[nt.opt.attach] });
        owner.get('artifacts').push(as);
        const edge = m('bpmndi:BPMNEdge', {
          id: `${nt.id}_assoc_di`,
          bpmnElement: as,
          waypoint: [g.anchor, g.target].map((p) => m('dc:Point', { x: R(p.x), y: R(p.y) }))
        });
        edge.set('bioc:stroke', color);
        edge.set('color:border-color', color);
        planeEls.push(edge);
      }
    }

    defs.rootElements = roots;
    const plane = m('bpmndi:BPMNPlane', { id: `Plane_${o.id}`, bpmnElement: collab, planeElement: planeEls });
    defs.diagrams = [m('bpmndi:BPMNDiagram', { id: `Diagram_${o.id}`, name: o.name, plane })];
    const { xml } = await moddle.toXML(defs, { format: true });
    return { xml, problems };
  }

  // Tiêu đề và chú giải dùng chung
  header(title) {
    const o = this.o;
    this.note(
      `${title}\nMô hình As-Is sơ bộ, dựng từ tài liệu công khai và hiểu biết của nhóm nghiên cứu. Đây không phải quy trình nội bộ chính thức của CellphoneS.`,
      { at: { x: o.x0, y: 30 }, w: 620, kind: 'info' }
    );
    const y = 30;
    const x = o.x0 + 660;
    this.note('Chú giải màu ghi chú', { at: { x, y }, w: 150, kind: 'info' });
    this.note('Xanh lá: có nguồn công khai', { at: { x: x + 170, y }, w: 190, kind: 'source' });
    this.note('Cam: cần khảo sát', { at: { x: x + 380, y }, w: 140, kind: 'survey' });
    this.note('Tím: do nhóm nghiên cứu đưa ra', { at: { x: x + 540, y }, w: 210, kind: 'team' });
    this.note('Xanh dương: khoảng thời gian cần đo', { at: { x: x + 770, y }, w: 240, kind: 'time' });
  }

  // Tiêu đề và chú giải của bản To-Be
  headerToBe(title) {
    const o = this.o;
    this.note(
      `${title}
Mô hình To-Be đề xuất, dựng từ các điểm nghẽn tiềm ẩn của mô hình As-Is. Các điểm nghẽn chưa được đo, nên mỗi thay đổi cần được kiểm chứng trước khi áp dụng. Đây không phải quy trình chính thức của CellphoneS.`,
      { at: { x: o.x0, y: 30 }, w: 640, kind: 'info' }
    );
    const x = o.x0 + 680;
    const y1 = 30;
    const y2 = 66;
    this.note('Chú giải', { at: { x, y: y1 }, w: 80, kind: 'info' });
    this.note('Ô nền xanh lá: bước mới', { at: { x: x + 100, y: y1 }, w: 180, kind: 'newStep' });
    this.note('Ô nền vàng: bước As-Is được thay đổi', { at: { x: x + 300, y: y1 }, w: 250, kind: 'changedStep' });
    this.note('Ghi chú đỏ: nội dung thay đổi so với As-Is', { at: { x: x + 570, y: y1 }, w: 280, kind: 'change' });
    this.note('Ghi chú xanh ngọc: cần doanh nghiệp quyết định', { at: { x: x + 100, y: y2 }, w: 310, kind: 'decide' });
    this.note('Ghi chú cam: cần khảo sát trước khi áp dụng', { at: { x: x + 430, y: y2 }, w: 290, kind: 'survey' });
    this.note('Ghi chú xanh dương: mốc thời gian được lưu lại', { at: { x: x + 740, y: y2 }, w: 300, kind: 'time' });
  }
}
