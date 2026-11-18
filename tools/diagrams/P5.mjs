// Sơ đồ chi tiết 5: Trả thiết bị và hoàn tất yêu cầu
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'P5', name: 'CellphoneS As-Is - Sơ đồ chi tiết 5', cols: 20 });
  d.header('SƠ ĐỒ CHI TIẾT 5: Trả thiết bị và hoàn tất yêu cầu');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [{ id: 'CH', name: 'Cửa hàng CellphoneS', rows: 3, padTop: 125, padBottom: 95 }]
  });

  const L = 'CH';
  d.start('S', 'Có kết quả xử lý, hoặc thiết bị phải trả lại', { lane: L, col: 0, row: 0 });
  d.task('T1', 'Nhận kết quả và nhận lại thiết bị', { lane: L, col: 1, row: 0 });
  d.task('T2', 'Đối chiếu kết quả, xác định thiết bị sẵn sàng trả', { lane: L, col: 2, row: 0 });
  d.task('T3', 'Báo khách đến nhận thiết bị', { lane: L, col: 3, row: 0 });
  d.ebg('EB', '', { lane: L, col: 4, row: 0 });
  d.catchEv('C1', 'Khách đến nhận thiết bị', { lane: L, col: 5, row: 0, def: 'message' });
  d.catchEv('TM', 'Hết 60 ngày hiệu lực của phiếu tiếp nhận', { lane: L, col: 5, row: 1, def: 'timer' });
  d.task('T4', 'Tháo gỡ linh kiện thiết bị để tái chế', { lane: L, col: 6, row: 1 });
  d.end('E3', 'Thiết bị bị tháo gỡ linh kiện do quá 60 ngày', { lane: L, col: 6, row: 2, labelPos: 'right' });
  d.task('T5', 'Kiểm tra phiếu tiếp nhận của khách', { lane: L, col: 6, row: 0 });
  d.xor('g2', 'Khách có phiếu\ntiếp nhận?', { lane: L, col: 7, row: 0 });
  d.end('E4a', 'Chưa trả thiết bị: khách không có phiếu', { lane: L, col: 7, row: 1, labelPos: 'right' });
  d.task('T6', 'Bàn giao thiết bị để khách kiểm tra', { lane: L, col: 8, row: 0 });
  d.catchEv('C2', 'Nhận ý kiến của khách sau khi kiểm tra', { lane: L, col: 9, row: 0, def: 'message' });
  d.xor('g3', 'Khách nhận\nthiết bị?', { lane: L, col: 10, row: 0 });
  d.end('E4b', 'Chưa hoàn tất bàn giao: khách không nhận thiết bị', { lane: L, col: 10, row: 1, labelPos: 'right' });
  d.xor('g4', 'Có phát\nsinh phí?', { lane: L, col: 11, row: 0 });
  d.task('T7', 'Thu phí sửa chữa', { lane: L, col: 12, row: 0 });
  d.xor('m1', '', { lane: L, col: 13, row: 0 });
  d.xor('g5', 'Khách có mượn\nmáy dùng tạm?', { lane: L, col: 14, row: 0 });
  d.task('T8', 'Thu lại máy dùng tạm', { lane: L, col: 15, row: 0 });
  d.xor('m2', '', { lane: L, col: 16, row: 0 });
  d.task('T9', 'Hoàn tất yêu cầu', { lane: L, col: 17, row: 0 });
  d.xor('g6', 'Thiết bị đã\nđược sửa?', { lane: L, col: 18, row: 0 });
  d.end('E1', 'Đã trả thiết bị sau khi sửa chữa, bảo hành hoặc thay thế', { lane: L, col: 19, row: 0 });
  d.end('E2', 'Đã trả thiết bị chưa sửa', { lane: L, col: 19, row: 1 });

  d.flow('S', 'T1');
  d.flow('T1', 'T2');
  d.flow('T2', 'T3');
  d.flow('T3', 'EB');
  d.flow('EB', 'C1', '', { exit: 'r', enter: 'l' });
  d.flow('EB', 'TM');
  d.flow('TM', 'T4');
  d.flow('T4', 'E3');
  d.flow('C1', 'T5');
  d.flow('T5', 'g2');
  d.flow('g2', 'E4a', 'Không');
  d.flow('g2', 'T6', 'Có', { exit: 'r', enter: 'l' });
  d.flow('T6', 'C2');
  d.flow('C2', 'g3');
  d.flow('g3', 'E4b', 'Không: thiết bị còn lỗi');
  d.flow('g3', 'g4', 'Nhận', { exit: 'r', enter: 'l' });
  d.flow('g4', 'T7', 'Có', { exit: 'r', enter: 'l' });
  d.flow('g4', 'm1', 'Không', { exit: 'b', enter: 'b', midY: d.n('g4').cy + 75 });
  d.flow('T7', 'm1');
  d.flow('m1', 'g5');
  d.flow('g5', 'T8', 'Có', { exit: 'r', enter: 'l' });
  d.flow('g5', 'm2', 'Không', { exit: 'b', enter: 'b', midY: d.n('g5').cy + 75 });
  d.flow('T8', 'm2');
  d.flow('m2', 'T9');
  d.flow('T9', 'g6');
  d.flow('g6', 'E1', 'Đã sửa chữa, bảo hành hoặc thay thế', { exit: 'r', enter: 'l' });
  d.flow('g6', 'E2', 'Thiết bị chưa sửa');

  d.msg('T3', 'KH', 'Thông báo thiết bị sẵn sàng', { labelSide: 'left' });
  d.msg('KH', 'C1', 'Khách đến cửa hàng', { labelSide: 'left' });
  d.msg('KH', 'T5', 'Phiếu tiếp nhận');
  d.msg('T6', 'KH', 'Thiết bị và thông tin bảo hành', { labelSide: 'left' });
  d.msg('KH', 'C2', 'Ý kiến sau khi kiểm tra');
  d.msg('KH', 'T7', 'Thanh toán');
  d.msg('KH', 'T8', 'Máy dùng tạm');

  d.data('D_phieu', 'Phiếu tiếp nhận', { near: 'T5', pos: 'above', dx: 45, labelPos: 'right' });
  d.dataIn('D_phieu', 'T5');

  d.note('Đo thời gian 9: từ khi sửa xong đến khi thiết bị sẵn sàng trả tại cửa hàng.', { attach: 'T1', pos: 'above', kind: 'time', w: 150, dx: -30 });
  d.note('Cần khảo sát: cách cửa hàng nhận lại thiết bị từ nơi xử lý.', { attach: 'T1', pos: 'below', kind: 'survey', w: 150, dx: -30 });
  d.note('Cần khảo sát: cách đối chiếu kết quả và xác định thiết bị sẵn sàng trả.', { attach: 'T2', pos: 'below', kind: 'survey', w: 150, dx: -30 });
  d.note('Đo thời gian 10: từ khi thiết bị sẵn sàng đến khi khách được báo.', { attach: 'T3', pos: 'above', kind: 'time', w: 140, dx: -140, corner: 'right', tx: -25 });
  d.note('Cần khảo sát: ai báo, kênh nào, khi nào coi là đã báo. Khách đang chờ tại cửa hàng (xử lý nhanh) thì được trả máy ngay.', { attach: 'T3', pos: 'below', kind: 'survey', w: 150, dx: -30 });
  d.note('Đo thời gian 11: từ khi khách được báo đến khi khách nhận máy.', { attach: 'C1', pos: 'above', kind: 'time', w: 130, dx: 40, dy: -6, tx: 6 });
  d.note('Có nguồn (Quy định tiếp nhận của CellphoneS): phiếu có giá trị lấy máy trong 60 ngày; sau đó tháo gỡ linh kiện để tái chế. Cần khảo sát: mốc bắt đầu tính 60 ngày.', { attach: 'TM', pos: 'below', kind: 'survey', w: 170, dx: -130, dy: 26, corner: 'right', tx: -4 });
  d.note('Có nguồn (Quy định tiếp nhận của CellphoneS): không trả máy nếu không có phiếu. Cần khảo sát: cách xử lý khi mất phiếu. Mô hình không giả định thay phiếu bằng căn cước, OTP hay số điện thoại.', { attach: 'E4a', pos: 'below', kind: 'survey', w: 175, dx: 30, dy: 14, tx: 4 });
  d.note('Có nguồn (Trang chủ Điện Thoại Vui): cung cấp thông tin bảo hành khi bàn giao. Cần khảo sát: nhân viên cửa hàng có kiểm tra máy cùng khách không.', { attach: 'T6', pos: 'above', kind: 'survey', w: 150, dx: -160, dy: 4, corner: 'right', tx: -25 });
  d.note('Cần khảo sát: cách xử lý khi khách không nhận máy vì còn lỗi. Chưa coi là đã bàn giao.', { attach: 'E4b', pos: 'below', kind: 'survey', w: 170, dx: 30, dy: 14, tx: 4 });
  d.note('Cần khảo sát: nơi thu phí và cách thu.', { attach: 'T7', pos: 'above', kind: 'survey', w: 130, dx: 40, tx: 15 });
  d.note('Có nguồn (Chính sách bảo hành CellphoneS): khách trả lại máy đã mượn sau khi nhận lại máy của mình. Cần khảo sát: cách ghi nhận.', { attach: 'T8', pos: 'above', kind: 'survey', w: 150, dx: 40, tx: 15 });
  d.note('Cần khảo sát: thao tác đóng hồ sơ, lưu hồ sơ điện tử, ghi nhận thời gian xử lý.', { attach: 'T9', pos: 'above', kind: 'survey', w: 140, dx: 35 });
  d.note('Không đồng nhất "đã bàn giao" với "đã sửa chữa thành công".', { attach: 'g6', pos: 'below', kind: 'info', w: 150, dx: -150, dy: 20, corner: 'right', tx: -6 });
  return d;
}
