// Sơ đồ chi tiết 4 (To-Be): Kiểm tra kỹ thuật và sửa chữa (trường hợp sửa chữa trong hệ thống)
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'ToBe_P4', name: 'CellphoneS To-Be - Sơ đồ chi tiết 4', cols: 21, y0: 185, exporter: 'CellphoneS To-Be BPMN generator' });
  d.headerToBe('SƠ ĐỒ CHI TIẾT 4 (TO-BE): Kiểm tra kỹ thuật và sửa chữa');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [{ id: 'SC', name: 'Bộ phận sửa chữa (Điện Thoại Vui; CareS với thiết bị Apple)', rows: 4, padTop: 115, padBottom: 110 }]
  });

  const L = 'SC';
  // Hàng 0: hết hạn phản hồi. Hàng 1: báo giá và chờ khách. Hàng 2: trục chính. Hàng 3: chờ linh kiện, sửa lại.
  d.start('S', 'Bộ phận sửa chữa đã nhận thiết bị', { lane: L, col: 0, row: 2 });
  d.task('T0', 'Phân loại nhanh, xếp vào hàng chờ lỗi đơn giản hoặc phức tạp', { lane: L, col: 1, row: 2, mark: 'new' });
  d.task('T1', 'Kiểm tra và chẩn đoán nguyên nhân lỗi', { lane: L, col: 2, row: 2 });
  d.task('T3', 'Xác định phương án, chi phí và linh kiện có sẵn hay không', { lane: L, col: 3, row: 2, mark: 'changed' });
  d.xor('g1', 'Cần khách xác nhận\ntrước khi sửa?', { lane: L, col: 4, row: 2, labelPos: 'bl', labelDy: 4 });
  d.task('T4', 'Gửi báo giá: chi phí, điều kiện bảo hành, thời gian', { lane: L, col: 5, row: 1, mark: 'changed' });
  d.ebg('EB', '', { lane: L, col: 6, row: 1 });
  d.catchEv('TMd', 'Hết hạn phản hồi', { lane: L, col: 6, row: 0, def: 'timer', labelPos: 'left', mark: 'new' });
  d.catchEv('C1', 'Nhận phản hồi của khách', { lane: L, col: 7, row: 1, def: 'message' });
  d.xor('g2', 'Khách\nđồng ý?', { lane: L, col: 8, row: 1, labelPos: 'bl', labelDy: 4 });
  d.xor('mX', '', { lane: L, col: 8, row: 0 });
  d.xor('mR', '', { lane: L, col: 9, row: 2 });
  d.task('Tb', 'Báo khách phương án và ngày dự kiến', { lane: L, col: 10, row: 2, mark: 'new' });
  d.xor('g3', 'Phải chờ\nlinh kiện?', { lane: L, col: 11, row: 2 });
  d.catchEv('C2', 'Linh kiện đã về', { lane: L, col: 11, row: 3, def: 'conditional', labelPos: 'left' });
  d.xor('mP', '', { lane: L, col: 12, row: 2 });
  d.task('T5', 'Sửa chữa hoặc thay thế linh kiện', { lane: L, col: 13, row: 2 });
  d.task('T6', 'Kiểm tra sau sửa chữa theo danh sách kiểm', { lane: L, col: 14, row: 2, mark: 'changed' });
  d.xor('g4', 'Kết quả\nkiểm tra đạt?', { lane: L, col: 15, row: 2 });
  d.xor('g5', 'Có thể\nsửa lại?', { lane: L, col: 15, row: 3, labelPos: 'bottom' });
  d.task('Tl', 'Ghi lý do chưa đạt, sửa lại', { lane: L, col: 14, row: 3, mark: 'new' });
  d.xor('mE', '', { lane: L, col: 17, row: 2 });
  d.task('T7', 'Ghi nhận kết quả, báo ngay cho cửa hàng và khách', { lane: L, col: 18, row: 2, mark: 'changed' });
  d.task('T9', 'Chuyển thiết bị về cửa hàng theo chuyến cố định, xác nhận đã giao', { lane: L, col: 19, row: 2, mark: 'changed' });
  d.end('E', 'Kết quả và thiết bị đã về cửa hàng', { lane: L, col: 20, row: 2 });

  d.flow('S', 'T0');
  d.flow('T0', 'T1');
  d.flow('T1', 'T3');
  d.flow('T3', 'g1');
  d.flow('g1', 'T4', 'Có');
  d.flow('g1', 'mR', 'Không', { exit: 'r', enter: 'l' });
  d.flow('T4', 'EB');
  d.flow('EB', 'C1', '', { exit: 'r', enter: 'l' });
  d.flow('EB', 'TMd', '', { exit: 't', enter: 'b' });
  d.flow('C1', 'g2');
  d.flow('g2', 'mR', 'Đồng ý', { exit: 'r', enter: 't' });
  d.flow('g2', 'mX', 'Từ chối', { exit: 't', enter: 'b' });
  d.flow('TMd', 'mX');
  d.flow('mX', 'mE', '', { exit: 'r', enter: 't' });
  d.flow('mR', 'Tb');
  d.flow('Tb', 'g3');
  d.flow('g3', 'mP', 'Không', { exit: 'r', enter: 'l' });
  d.flow('g3', 'C2', 'Có');
  d.flow('C2', 'mP', '', { exit: 'r', enter: 'b' });
  d.flow('mP', 'T5');
  d.flow('T5', 'T6');
  d.flow('T6', 'g4');
  d.flow('g4', 'mE', 'Đạt', { exit: 'r', enter: 'l' });
  d.flow('g4', 'g5', 'Chưa đạt');
  d.flow('g5', 'Tl', 'Có', { exit: 'l', enter: 'r' });
  d.flow('Tl', 'mP', '', { exit: 'l', enter: 'b' });
  d.flow('g5', 'mE', 'Không', { exit: 'r', enter: 'b' });
  d.flow('mE', 'T7');
  d.flow('T7', 'T9');
  d.flow('T9', 'E');

  d.msg('T4', 'KH', 'Báo giá, điều kiện bảo hành, thời gian', { labelSide: 'left' });
  d.msg('KH', 'C1', 'Đồng ý hoặc từ chối');
  d.msg('Tb', 'KH', 'Phương án và ngày dự kiến', { labelSide: 'left' });
  d.msg('T7', 'KH', 'Đã xử lý xong, ngày có tại cửa hàng');

  d.data('D_muc', 'Mức chi phí khách đã chấp nhận, ghi trên phiếu', { near: 'T3', pos: 'above', labelPos: 'right' });
  d.dataIn('D_muc', 'T3');
  d.data('D_kq', 'Kết quả kiểm tra', { near: 'T1', pos: 'below', labelPos: 'right' });
  d.dataOut('T1', 'D_kq');
  d.data('D_bg', 'Báo giá', { near: 'T4', pos: 'below', dx: -45, dy: -8, labelPos: 'right' });
  d.dataOut('T4', 'D_bg');
  d.data('D_kqxl', 'Kết quả xử lý', { near: 'T7', pos: 'below', labelPos: 'right' });
  d.dataOut('T7', 'D_kqxl');

  d.note('Phạm vi: sửa chữa trong hệ thống, tại Điện Thoại Vui hoặc CareS. Trường hợp gửi bảo hành tại hãng: xem sơ đồ tổng quan.', { at: { x: d.o.x0, y: 118 }, w: 760, kind: 'info' });
  d.note('Lỗi đơn giản và lỗi phức tạp đi hai hàng chờ riêng. Thứ tự tính từ lúc khách giao máy tại cửa hàng.', { attach: 'T0', pos: 'above', kind: 'change', w: 150, dx: -30 });
  d.note('Mốc thời gian được lưu: lúc nhận máy, lúc chẩn đoán xong, lúc gửi báo giá, lúc khách trả lời, lúc sửa xong.', { attach: 'S', pos: 'below', kind: 'time', w: 150, dx: -40, dy: 30 });
  d.note('Linh kiện được kiểm tra ngay lúc này, nên thời gian chờ linh kiện có sẵn trong báo giá.', { attach: 'T3', pos: 'below', kind: 'change', w: 150, dx: -30 });
  d.note('Không cần hỏi khi máy được bảo hành, hoặc khi chi phí nằm trong mức khách đã chấp nhận tại quầy. Chỉ hỏi lại khi chi phí vượt mức đó.', { attach: 'g1', pos: 'below', kind: 'change', w: 190, dx: 150, dy: 22, tx: 8 });
  d.note('Báo giá gửi qua kênh khách bấm đồng ý hoặc từ chối được ngay; câu trả lời được lưu làm xác nhận. Có thể giữ chỗ linh kiện trong lúc chờ.', { attach: 'T4', pos: 'above', kind: 'change', w: 150, dx: -170, corner: 'right', tx: -25 });
  d.note('Cần doanh nghiệp quyết định: hạn phản hồi và số lần nhắc. Hết hạn thì trả máy chưa sửa.', { attach: 'TMd', pos: 'above', kind: 'decide', w: 140, dx: -50 });
  d.note('Khách được báo cả khi không phát sinh chi phí: máy được sửa theo phương án nào, dự kiến xong ngày nào.', { attach: 'Tb', pos: 'below', kind: 'change', w: 150, dx: -190, corner: 'right', tx: -25 });
  d.note('Cần khảo sát: có phải chờ linh kiện không, chờ bao lâu. Máy còn dùng được thì khách có thể nhận lại trong lúc chờ.', { attach: 'C2', pos: 'below', kind: 'survey', w: 215, dx: -60, dy: 4 });
  d.note('Danh sách kiểm gồm lỗi ban đầu theo mô tả trên phiếu và các tính năng cơ bản.', { attach: 'T6', pos: 'above', kind: 'change', w: 150, dx: -30 });
  d.note('Cần doanh nghiệp quyết định: số lần sửa lại tối đa. Hết số lần thì người có kinh nghiệm hơn xem xét; nếu đổi chi phí thì hỏi lại khách.', { attach: 'Tl', pos: 'below', kind: 'decide', w: 215, dx: -40 });
  d.note('Thông tin đi trước thiết bị: cửa hàng và khách biết ngay khi sửa xong, kèm ngày dự kiến máy có tại cửa hàng.', { attach: 'T7', pos: 'above', kind: 'change', w: 150, dx: 32, tx: 12 });
  d.note('Chuyến mang máy mới đến cũng mang máy đã xong về. Giao và nhận đều được xác nhận.', { attach: 'T9', pos: 'below', kind: 'change', w: 150, dx: 10 });
  return d;
}
