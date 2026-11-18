// Sơ đồ chi tiết 3: Chuyển thiết bị đến nơi xử lý
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'P3', name: 'CellphoneS As-Is - Sơ đồ chi tiết 3', cols: 13 });
  d.header('SƠ ĐỒ CHI TIẾT 3: Chuyển thiết bị đến nơi xử lý');

  d.pool('HANG', 'Trung tâm bảo hành của hãng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [
      { id: 'CH', name: 'Cửa hàng CellphoneS', rows: 3, padTop: 90, padBottom: 100 },
      { id: 'SC', name: 'Bộ phận sửa chữa (Điện Thoại Vui; CareS với thiết bị Apple)', rows: 1, padTop: 35, padBottom: 95 }
    ]
  });

  const L = 'CH';
  d.start('S', 'Thiết bị đã được nhận giữ', { lane: L, col: 0, row: 1 });
  d.xor('mA', '', { lane: L, col: 1, row: 1 });
  d.task('T1', 'Xác định nơi xử lý cụ thể', { lane: L, col: 2, row: 1 });
  d.xor('g1', 'Có nơi xử lý\nphù hợp?', { lane: L, col: 3, row: 1 });
  d.end('E0', 'Không có nơi xử lý phù hợp', { lane: L, col: 3, row: 2, labelPos: 'right' });
  d.task('T2', 'Chuẩn bị hồ sơ và thông tin yêu cầu', { lane: L, col: 4, row: 1 });
  d.xor('g2', 'Chuyển\nđến đâu?', { lane: L, col: 5, row: 1 });
  d.task('T3h', 'Gửi thiết bị và hồ sơ đến hãng', { lane: L, col: 6, row: 1 });
  d.task('T3s', 'Bàn giao thiết bị và hồ sơ cho bộ phận sửa chữa', { lane: L, col: 6, row: 2 });
  d.catchEv('C1', 'Nhận phản hồi tiếp nhận của hãng', { lane: L, col: 7, row: 1, def: 'message' });
  d.task('T4', 'Tiếp nhận thiết bị từ cửa hàng', { lane: 'SC', col: 7, row: 0 });
  d.xor('mC', '', { lane: L, col: 8, row: 1 });
  d.xor('g3', 'Phản hồi của\nnơi xử lý?', { lane: L, col: 9, row: 1 });
  d.task('T5', 'Bổ sung thông tin theo yêu cầu', { lane: L, col: 10, row: 0 });
  d.xor('mD', '', { lane: L, col: 11, row: 1 });
  d.end('E1', 'Nơi xử lý đã nhận thiết bị', { lane: L, col: 12, row: 1 });

  d.flow('S', 'mA');
  d.flow('mA', 'T1');
  d.flow('T1', 'g1');
  d.flow('g1', 'E0', 'Không');
  d.flow('g1', 'T2', 'Có', { exit: 'r', enter: 'l' });
  d.flow('T2', 'g2');
  d.flow('g2', 'T3h', 'Hãng', { exit: 'r', enter: 'l' });
  d.flow('g2', 'T3s', 'Bộ phận sửa chữa trong hệ thống', { labelSide: 'left' });
  d.flow('T3h', 'C1');
  d.flow('C1', 'mC');
  d.flow('T3s', 'T4');
  d.flow('T4', 'mC', '', { exit: 'r', enter: 'b' });
  d.flow('mC', 'g3');
  d.flow('g3', 'mD', 'Đã nhận thiết bị', { exit: 'r', enter: 'l' });
  d.flow('g3', 'T5', 'Yêu cầu bổ sung thông tin');
  d.flow('T5', 'mD', '', { exit: 'r', enter: 't' });
  d.flow('g3', 'mA', 'Không tiếp nhận theo tuyến này', { exit: 'b', enter: 'b', midY: d.laneBottom('SC') - 16 });
  d.flow('mD', 'E1');

  d.msg('T3h', 'HANG', 'Thiết bị và hồ sơ yêu cầu', { labelSide: 'left' });
  d.msg('HANG', 'C1', 'Phản hồi tiếp nhận');

  d.note('Đo thời gian 3: từ khi có phiếu tiếp nhận đến khi cửa hàng giao thiết bị đi (mốc A).', { attach: 'S', pos: 'above', kind: 'time', w: 150, dx: -30 });
  d.note('Có nguồn (Chính sách bảo hành CellphoneS): nơi bảo hành theo nhóm sản phẩm. Cần khảo sát: ai có quyền chỉ định nơi xử lý.', { attach: 'T1', pos: 'above', kind: 'survey', w: 150, dx: -10 });
  d.note('Thiết bị được trả lại cho khách ở trạng thái chưa xử lý (sơ đồ chi tiết 5).', { attach: 'E0', pos: 'below', kind: 'info', w: 170, dx: -10, dy: 10 });
  d.note('Cần khảo sát: hồ sơ gồm những gì; có bước xác nhận hồ sơ đủ thông tin không.', { attach: 'T2', pos: 'above', kind: 'survey', w: 140, dx: -15 });
  d.note('Mốc A: cửa hàng đã giao thiết bị. Có nguồn (Chính sách bảo hành CellphoneS): cửa hàng tiếp nhận để gửi máy bảo hành chính hãng. Cần khảo sát: cách gửi, người phụ trách.', { attach: 'T3h', pos: 'above', kind: 'survey', w: 150, dx: -160, corner: 'right', tx: -25 });
  d.note('Mốc A: cửa hàng đã giao thiết bị. Cần khảo sát: bộ phận sửa chữa ở cùng địa điểm hay phải vận chuyển; hình thức xác nhận bàn giao.', { attach: 'T3s', pos: 'below', kind: 'survey', w: 215, dx: -165, dy: -8, corner: 'right', tx: -20 });
  d.note('Mốc B: nơi xử lý đã nhận thiết bị. Cần khảo sát: hai mốc A và B có được ghi nhận trên hệ thống không.', { attach: 'C1', pos: 'above', kind: 'survey', w: 150, dx: 35, dy: -20 });
  d.note('Đo thời gian 4: từ mốc A đến mốc B.', { attach: 'T4', pos: 'below', kind: 'time', w: 150, dx: -40, dy: -6 });
  d.note('Cần khảo sát: toàn bộ các tình huống ngoại lệ ở bước này. Mô hình giả định sau khi bổ sung thông tin thì nơi xử lý tiếp nhận.', { attach: 'T5', pos: 'above', kind: 'survey', w: 250, dx: -40 });
  d.note('Mô hình không giả định bộ phận kho vận, cấp duyệt của quản lý, biên bản giao nhận hay phần mềm quản lý vận chuyển.', { at: { x: d.o.x0, y: 96 }, w: 760, kind: 'info' });
  return d;
}
