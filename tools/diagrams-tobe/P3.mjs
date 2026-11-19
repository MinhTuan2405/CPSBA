// Sơ đồ chi tiết 3 (To-Be): Chuyển thiết bị đến nơi xử lý
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'ToBe_P3', name: 'CellphoneS To-Be - Sơ đồ chi tiết 3', cols: 15, y0: 140, exporter: 'CellphoneS To-Be BPMN generator' });
  d.headerToBe('SƠ ĐỒ CHI TIẾT 3 (TO-BE): Chuyển thiết bị đến nơi xử lý');

  d.pool('HANG', 'Trung tâm bảo hành của hãng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [
      { id: 'CH', name: 'Cửa hàng CellphoneS', rows: 3, padTop: 130, padBottom: 20 },
      { id: 'SC', name: 'Bộ phận sửa chữa (Điện Thoại Vui; CareS với thiết bị Apple)', rows: 1, padTop: 30, padBottom: 150 }
    ]
  });
  d.pool('KH', 'Khách hàng', { blackbox: true });

  const L = 'CH';
  // Hàng 0: tuyến hãng. Hàng 1: trục chính. Hàng 2 và làn dưới: tuyến trong hệ thống.
  d.start('S', 'Thiết bị đã được nhận giữ', { lane: L, col: 0, row: 1 });
  d.xor('mA', '', { lane: L, col: 1, row: 1 });
  d.task('T1', 'Xác nhận nơi xử lý, kiểm hồ sơ theo danh sách kiểm', { lane: L, col: 2, row: 1, mark: 'changed' });
  d.xor('g1', 'Có nơi xử lý\nphù hợp?', { lane: L, col: 3, row: 1 });
  d.end('E0', 'Không có nơi xử lý phù hợp', { lane: L, col: 3, row: 2 });
  d.xor('g2', 'Chuyển\nđến đâu?', { lane: L, col: 4, row: 1, labelPos: 'tl' });
  d.task('T2h', 'Gửi thiết bị và hồ sơ đến hãng theo chuyến cố định', { lane: L, col: 5, row: 0, mark: 'changed' });
  d.catchEv('C1', 'Nhận phản hồi tiếp nhận của hãng', { lane: L, col: 6, row: 0, def: 'message' });
  d.xor('gH', 'Hãng\ntiếp nhận?', { lane: L, col: 7, row: 0, labelPos: 'bl', labelDy: 4 });
  d.task('T2', 'Gửi hồ sơ trước cho bộ phận sửa chữa', { lane: L, col: 5, row: 2, mark: 'new' });
  d.task('T3', 'Xem hồ sơ và trả lời cửa hàng', { lane: 'SC', col: 6, row: 0, mark: 'new' });
  d.xor('g3', 'Trả lời\nvề hồ sơ?', { lane: 'SC', col: 7, row: 0, labelPos: 'bl', labelDy: 4 });
  d.task('T5', 'Bổ sung thông tin theo yêu cầu', { lane: L, col: 7, row: 2 });
  d.xor('mS', '', { lane: L, col: 8, row: 2 });
  d.task('T6', 'Giao thiết bị theo chuyến cố định, xác nhận đã giao', { lane: L, col: 9, row: 2, mark: 'changed' });
  d.task('T8', 'Xác nhận đã nhận thiết bị', { lane: 'SC', col: 10, row: 0, mark: 'changed' });
  d.xor('mF', '', { lane: L, col: 12, row: 1 });
  d.task('T9', 'Ghi mốc nơi xử lý đã nhận, báo cho khách', { lane: L, col: 13, row: 1, mark: 'new' });
  d.end('E1', 'Nơi xử lý đã nhận thiết bị', { lane: L, col: 14, row: 1 });

  d.flow('S', 'mA');
  d.flow('mA', 'T1');
  d.flow('T1', 'g1');
  d.flow('g1', 'E0', 'Không');
  d.flow('g1', 'g2', 'Có', { exit: 'r', enter: 'l' });
  d.flow('g2', 'T2h', 'Trung tâm bảo\nhành của hãng');
  d.flow('g2', 'T2', 'Bộ phận sửa chữa\ntrong hệ thống');
  d.flow('T2h', 'C1');
  d.flow('C1', 'gH');
  d.flow('gH', 'mF', 'Có', { exit: 'r', enter: 't' });
  d.flow('gH', 'mA', 'Không', { exit: 't', enter: 't', midY: d.laneTop('CH') + 18 });
  d.flow('T2', 'T3');
  d.flow('T3', 'g3');
  d.flow('g3', 'T5', 'Cần bổ sung\nthông tin', { exit: 't', enter: 'b' });
  d.flow('g3', 'mS', 'Tiếp nhận', { exit: 'r', enter: 'b' });
  d.flow('g3', 'mA', 'Không tiếp nhận', { exit: 'b', enter: 'b', midY: d.laneBottom('SC') - 16 });
  d.flow('T5', 'mS');
  d.flow('mS', 'T6');
  d.flow('T6', 'T8');
  d.flow('T8', 'mF');
  d.flow('mF', 'T9');
  d.flow('T9', 'E1');

  d.msg('T2h', 'HANG', 'Thiết bị và hồ sơ yêu cầu', { labelSide: 'left' });
  d.msg('HANG', 'C1', 'Phản hồi tiếp nhận, mã tiếp nhận');
  d.msg('T9', 'KH', 'Thông báo: nơi xử lý đã nhận máy');

  d.note('Nơi xử lý đã được chọn tại quầy. Ở đây chỉ xác nhận lại và kiểm hồ sơ theo danh sách kiểm trước khi gửi.', { attach: 'T1', pos: 'above', kind: 'change', w: 150, dx: -30 });
  d.note('Thiết bị còn ở cửa hàng, nên được trả lại cho khách ngay (sơ đồ chi tiết 5).', { attach: 'E0', kind: 'info', w: 150, at: { x: d.n('E0').cx - 215, y: d.n('E0').cy - 30 }, side: 'right' });
  d.note('Danh sách kiểm hồ sơ riêng cho từng hãng. Cần khảo sát: cách gửi, người phụ trách, hồ sơ mỗi hãng yêu cầu.', { attach: 'T2h', pos: 'above', kind: 'survey', w: 150, dx: -170, corner: 'right', tx: -25 });
  d.note('Mã tiếp nhận của hãng được lưu vào hồ sơ. Cần khảo sát: hãng có cấp mã hay không.', { attach: 'C1', pos: 'above', kind: 'survey', w: 140, dx: 35, dy: -8, tx: 6 });
  d.note('Hồ sơ đi trước thiết bị: bộ phận sửa chữa trả lời khi thiết bị còn ở cửa hàng, nên máy không phải đi rồi quay về.', { attach: 'T2', pos: 'above', kind: 'change', w: 150, dx: -30 });
  d.note('Cần khảo sát: bộ phận sửa chữa có ở cùng địa điểm với cửa hàng không. Nếu có thì bàn giao ngay sau khi lập phiếu, không cần gom chuyến.', { attach: 'T3', pos: 'below', kind: 'survey', w: 150, dx: -50, dy: -4 });
  d.note('Chuyển theo lịch cố định, mỗi ca có một người phụ trách giao nhận. Cần doanh nghiệp quyết định: số chuyến mỗi ngày và giờ chốt.', { attach: 'T6', pos: 'above', kind: 'decide', w: 170, dx: -30 });
  d.note('Hai mốc thời gian được lưu: cửa hàng đã giao, nơi xử lý đã nhận. Máy đã giao mà chưa có xác nhận nhận được rà soát mỗi ngày.', { attach: 'T8', pos: 'below', kind: 'time', w: 215, dx: -40 });
  d.note('Khách được báo ngay khi nơi xử lý đã nhận máy, không phải tự hỏi.', { attach: 'T9', pos: 'above', kind: 'change', w: 150, dx: -30 });
  return d;
}
