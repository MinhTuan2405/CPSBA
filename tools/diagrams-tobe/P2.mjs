// Sơ đồ chi tiết 2 (To-Be): Nhận thiết bị và lập phiếu tiếp nhận
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'ToBe_P2', name: 'CellphoneS To-Be - Sơ đồ chi tiết 2', cols: 14, y0: 140, exporter: 'CellphoneS To-Be BPMN generator' });
  d.headerToBe('SƠ ĐỒ CHI TIẾT 2 (TO-BE): Nhận thiết bị và lập phiếu tiếp nhận');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [{ id: 'CH', name: 'Cửa hàng CellphoneS', rows: 2, padTop: 120, padBottom: 155 }]
  });

  const L = 'CH';
  // Hàng 0: đường vòng khi phải chờ khách chuẩn bị thiết bị. Hàng 1: đường chính.
  d.start('S', 'Khách đồng ý giao máy', { lane: L, col: 0, row: 1 });
  d.xor('g0', 'Cần chờ khách\nchuẩn bị thiết bị?', { lane: L, col: 1, row: 1, labelPos: 'tl' });
  d.task('T1', 'Mời khách hoàn tất tại khu tự sao lưu', { lane: L, col: 2, row: 0, mark: 'changed' });
  d.catchEv('C1', 'Nhận phản hồi của khách', { lane: L, col: 3, row: 0, def: 'message' });
  d.xor('g1', 'Khách giao\nthiết bị?', { lane: L, col: 4, row: 0 });
  d.task('T0', 'Lưu hồ sơ để khách quay lại không phải làm lại', { lane: L, col: 5, row: 0, mark: 'new' });
  d.end('E_chua', 'Khách chưa giao máy, hồ sơ được lưu', { lane: L, col: 6, row: 0 });
  d.xor('m1', '', { lane: L, col: 4, row: 1 });
  d.task('T2', 'Nhận thiết bị, chụp ảnh tình trạng bên ngoài', { lane: L, col: 7, row: 1, mark: 'changed' });
  d.task('T3', 'Hoàn tất mẫu tiếp nhận, xác nhận số điện thoại và kênh liên lạc', { lane: L, col: 8, row: 1, mark: 'changed' });
  d.task('T4', 'Lập phiếu tiếp nhận, gửi mã phiếu cho khách', { lane: L, col: 9, row: 1, mark: 'changed' });
  d.xor('g2', 'Áp dụng hỗ trợ\nmáy dùng tạm?', { lane: L, col: 10, row: 1, labelPos: 'top' });
  d.task('T5', 'Giao máy dùng tạm, ghi nhận vào hồ sơ', { lane: L, col: 11, row: 1, mark: 'changed' });
  d.xor('m2', '', { lane: L, col: 12, row: 1 });
  d.end('E_ok', 'Đã nhận thiết bị, khách có phiếu tiếp nhận', { lane: L, col: 13, row: 1 });

  d.flow('S', 'g0');
  d.flow('g0', 'T1', 'Có');
  d.flow('g0', 'm1', 'Không', { exit: 'r', enter: 'l' });
  d.flow('T1', 'C1');
  d.flow('C1', 'g1');
  d.flow('g1', 'T0', 'Chưa:\nkhách ra về', { exit: 'r', enter: 'l' });
  d.flow('g1', 'm1', 'Có', { exit: 'b', enter: 't' });
  d.flow('T0', 'E_chua');
  d.flow('m1', 'T2');
  d.flow('T2', 'T3');
  d.flow('T3', 'T4');
  d.flow('T4', 'g2');
  d.flow('g2', 'T5', 'Có', { exit: 'r', enter: 'l' });
  d.flow('g2', 'm2', 'Không', { exit: 'b', enter: 'b', midY: d.n('g2').cy + 75 });
  d.flow('T5', 'm2');
  d.flow('m2', 'E_ok');

  d.msg('T1', 'KH', 'Lời mời hoàn tất chuẩn bị', { labelSide: 'left' });
  d.msg('KH', 'C1', 'Phản hồi của khách');
  d.msg('KH', 'T2', 'Thiết bị', { labelSide: 'left' });
  d.msg('T4', 'KH', 'Phiếu tiếp nhận và mã phiếu');
  d.msg('T5', 'KH', 'Máy dùng tạm');

  d.data('D_phieu', 'Phiếu tiếp nhận', { near: 'T4', pos: 'below', labelPos: 'right' });
  d.dataOut('T4', 'D_phieu');

  d.note('Mốc thời gian được lưu: lúc khách đồng ý giao máy, lúc lập phiếu tiếp nhận.', { attach: 'S', pos: 'above', kind: 'time', w: 150, dx: -40, dy: -10 });
  d.note('Không phải chờ khi khách đã chuẩn bị xong nhờ được nhắc từ đầu ở quầy, hoặc khi lỗi được xử lý nhanh mà không đụng đến dữ liệu trong máy.', { attach: 'g0', pos: 'below', kind: 'change', w: 215, dx: -40, dy: 10 });
  d.note('Khu tự sao lưu tách khỏi quầy, có mạng, ổ sạc và tờ hướng dẫn. Quầy được giải phóng cho khách tiếp theo.', { attach: 'T1', pos: 'above', kind: 'change', w: 150, dx: -170, corner: 'right', tx: -25 });
  d.note('Cần doanh nghiệp quyết định: cách làm khi thiết bị không thao tác được, ví dụ hướng dẫn khách gỡ thiết bị khỏi tài khoản từ một thiết bị khác.', { attach: 'C1', pos: 'above', kind: 'decide', w: 215, dx: 32, dy: -10, tx: 6 });
  d.note('Lần sau khách đi thẳng vào bước nhận máy, không phải tra cứu và tư vấn lại.', { attach: 'T0', pos: 'above', kind: 'change', w: 150, dx: 30 });
  d.note('Ảnh lúc nhận máy là căn cứ khi trả máy, tránh tranh cãi về tình trạng bên ngoài.', { attach: 'T2', pos: 'below', kind: 'change', w: 150, dx: -30 });
  d.note('Trường bắt buộc do cửa hàng và bộ phận sửa chữa cùng thống nhất, tự điền từ hồ sơ tại quầy. Cần khảo sát: các trường đang được ghi hiện nay.', { attach: 'T3', pos: 'above', kind: 'survey', w: 150, dx: -30 });
  d.note('Lập phiếu là mốc cửa hàng đã nhận máy, điểm bắt đầu của mọi khoảng thời gian cần đo.', { attach: 'T4', pos: 'above', kind: 'time', w: 150, dx: 32, tx: 12 });
  d.note('Phiếu không còn chỉ là một tờ giấy: mã phiếu gắn với số điện thoại của khách, và phiếu ghi ngày hết hạn nhận máy cụ thể.', { attach: 'D_phieu', pos: 'below', kind: 'change', w: 215, dx: -10, dy: -4 });
  d.note('Số máy đang cho mượn được theo dõi, để biết còn máy cho khách sau hay không.', { attach: 'T5', pos: 'above', kind: 'change', w: 150, dx: 32, tx: 12 });
  return d;
}
