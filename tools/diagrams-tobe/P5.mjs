// Sơ đồ chi tiết 5 (To-Be): Trả thiết bị và hoàn tất yêu cầu
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'ToBe_P5', name: 'CellphoneS To-Be - Sơ đồ chi tiết 5', cols: 25, y0: 140, exporter: 'CellphoneS To-Be BPMN generator' });
  d.headerToBe('SƠ ĐỒ CHI TIẾT 5 (TO-BE): Trả thiết bị và hoàn tất yêu cầu');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [{ id: 'CH', name: 'Cửa hàng CellphoneS', rows: 3, padTop: 125, padBottom: 100 }]
  });

  const L = 'CH';
  // Hàng 1: trục chính. Hàng 0: nhắc khách, xác minh thay thế. Hàng 2: sửa lại, quá 60 ngày.
  d.start('S', 'Thiết bị về đến cửa hàng, hoặc phải trả lại', { lane: L, col: 0, row: 1 });
  d.task('T1', 'Xác nhận đã nhận thiết bị, thử lại lỗi ban đầu theo phiếu', { lane: L, col: 1, row: 1, mark: 'changed' });
  d.xor('g0', 'Kết quả sau\nkhi nhận lại?', { lane: L, col: 2, row: 1, labelPos: 'tl' });
  d.task('Th', 'Lập báo giá sửa có phí để gửi kèm thông báo', { lane: L, col: 3, row: 0, mark: 'new' });
  d.xor('mT', '', { lane: L, col: 3, row: 1 });
  d.task('Ts1', 'Mở yêu cầu sửa lại ưu tiên', { lane: L, col: 3, row: 2, mark: 'new' });
  d.end('Es1', 'Chuyển lại bộ phận sửa chữa: cửa hàng phát hiện còn lỗi', { lane: L, col: 4, row: 2 });
  d.task('T3', 'Báo khách đến nhận, ghi nhận đã báo thành công', { lane: L, col: 4, row: 1, mark: 'changed' });
  d.xor('mEB', '', { lane: L, col: 5, row: 1 });
  d.task('Tn', 'Nhắc khách đến nhận', { lane: L, col: 5, row: 0, mark: 'new' });
  d.ebg('EB', '', { lane: L, col: 6, row: 1 });
  d.catchEv('TMn', 'Đến mốc nhắc', { lane: L, col: 6, row: 0, def: 'timer', labelPos: 'right', mark: 'new' });
  d.catchEv('TM60', 'Hết 60 ngày hiệu lực của phiếu tiếp nhận', { lane: L, col: 6, row: 2, def: 'timer' });
  d.catchEv('C1', 'Khách đến nhận thiết bị', { lane: L, col: 7, row: 1, def: 'message' });
  d.task('Trs', 'Rà soát việc đã nhắc khách, người có thẩm quyền duyệt', { lane: L, col: 7, row: 2, mark: 'new' });
  d.task('T5', 'Kiểm tra phiếu tiếp nhận hoặc mã phiếu', { lane: L, col: 8, row: 1, mark: 'changed' });
  d.task('T4', 'Tháo gỡ linh kiện thiết bị để tái chế', { lane: L, col: 8, row: 2 });
  d.xor('g2', 'Khách có phiếu\nhoặc mã phiếu?', { lane: L, col: 9, row: 1, labelPos: 'bl', labelDy: 4 });
  d.end('E3', 'Thiết bị bị tháo gỡ linh kiện do quá 60 ngày', { lane: L, col: 9, row: 2, labelPos: 'right' });
  d.task('Txm', 'Xác minh thay thế, người có thẩm quyền duyệt', { lane: L, col: 10, row: 0, mark: 'new' });
  d.xor('gxm', 'Xác minh\nđược?', { lane: L, col: 11, row: 0 });
  d.xor('mx', '', { lane: L, col: 11, row: 1 });
  d.end('E4a', 'Chưa trả thiết bị: không xác minh được người nhận', { lane: L, col: 12, row: 0 });
  d.task('T6', 'Bàn giao, cùng khách kiểm tra theo danh sách ngắn', { lane: L, col: 13, row: 1, mark: 'changed' });
  d.catchEv('C2', 'Nhận ý kiến của khách sau khi kiểm tra', { lane: L, col: 14, row: 1, def: 'message' });
  d.xor('g3', 'Khách nhận\nthiết bị?', { lane: L, col: 15, row: 1 });
  d.task('Ts2', 'Mở yêu cầu chuyển lại bộ phận sửa chữa, hẹn ngày mới', { lane: L, col: 15, row: 2, mark: 'new' });
  d.end('Es2', 'Chuyển lại bộ phận sửa chữa: theo ý kiến của khách', { lane: L, col: 16, row: 2, labelPos: 'right' });
  d.xor('g4', 'Còn phí chưa\nthanh toán?', { lane: L, col: 16, row: 1 });
  d.task('T7', 'Thu phí sửa chữa', { lane: L, col: 17, row: 1 });
  d.xor('m1', '', { lane: L, col: 18, row: 1 });
  d.xor('g5', 'Khách có mượn\nmáy dùng tạm?', { lane: L, col: 19, row: 1 });
  d.task('T8', 'Thu lại máy dùng tạm', { lane: L, col: 20, row: 1 });
  d.xor('m2', '', { lane: L, col: 21, row: 1 });
  d.task('T9', 'Hoàn tất yêu cầu, lưu thời điểm các mốc', { lane: L, col: 22, row: 1, mark: 'changed' });
  d.xor('g6', 'Thiết bị đã\nđược sửa?', { lane: L, col: 23, row: 1 });
  d.end('E1', 'Đã trả thiết bị sau khi sửa chữa, bảo hành hoặc thay thế', { lane: L, col: 24, row: 1 });
  d.end('E2', 'Đã trả thiết bị chưa sửa', { lane: L, col: 24, row: 2 });

  d.flow('S', 'T1');
  d.flow('T1', 'g0');
  d.flow('g0', 'Th', 'Hãng từ chối\nbảo hành');
  d.flow('g0', 'mT', 'Sẵn\nsàng trả', { exit: 'r', enter: 'l' });
  d.flow('g0', 'Ts1', 'Còn lỗi\nban đầu');
  d.flow('Th', 'mT');
  d.flow('Ts1', 'Es1');
  d.flow('mT', 'T3');
  d.flow('T3', 'mEB');
  d.flow('mEB', 'EB');
  d.flow('EB', 'C1', '', { exit: 'r', enter: 'l' });
  d.flow('EB', 'TMn', '', { exit: 't', enter: 'b' });
  d.flow('EB', 'TM60', '', { exit: 'b', enter: 't' });
  d.flow('TMn', 'Tn', '', { exit: 'l', enter: 'r' });
  d.flow('Tn', 'mEB', '', { exit: 'b', enter: 't' });
  d.flow('TM60', 'Trs');
  d.flow('Trs', 'T4');
  d.flow('T4', 'E3');
  d.flow('C1', 'T5');
  d.flow('T5', 'g2');
  d.flow('g2', 'Txm', 'Không');
  d.flow('g2', 'mx', 'Có', { exit: 'r', enter: 'l' });
  d.flow('Txm', 'gxm');
  d.flow('gxm', 'mx', 'Có', { exit: 'b', enter: 't' });
  d.flow('gxm', 'E4a', 'Không', { exit: 'r', enter: 'l' });
  d.flow('mx', 'T6');
  d.flow('T6', 'C2');
  d.flow('C2', 'g3');
  d.flow('g3', 'g4', 'Nhận', { exit: 'r', enter: 'l' });
  d.flow('g3', 'Ts2', 'Không', { exit: 'b', enter: 't' });
  d.flow('Ts2', 'Es2');
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
  d.msg('Tn', 'KH', 'Lời nhắc đến nhận');
  d.msg('KH', 'C1', 'Khách đến cửa hàng', { labelSide: 'left' });
  d.msg('KH', 'T5', 'Phiếu hoặc mã phiếu');
  d.msg('KH', 'Txm', 'Mã xác nhận, giấy tờ tùy thân', { labelSide: 'left' });
  d.msg('T6', 'KH', 'Thiết bị và thông tin bảo hành', { labelSide: 'left' });
  d.msg('KH', 'C2', 'Ý kiến sau khi kiểm tra');
  d.msg('KH', 'T7', 'Thanh toán');
  d.msg('KH', 'T8', 'Máy dùng tạm');

  d.data('D_phieu', 'Phiếu tiếp nhận hoặc mã phiếu', { near: 'T5', pos: 'above', dx: 45, labelPos: 'right' });
  d.dataIn('D_phieu', 'T5');

  d.note('Cửa hàng thử lại đúng lỗi ban đầu trước khi báo khách. Lỗi còn lại được phát hiện sớm hơn một bước, khách không phải đến vô ích.', { attach: 'T1', pos: 'above', kind: 'change', w: 150, dx: -40 });
  d.note('Mốc thời gian được lưu: lúc máy về cửa hàng, lúc báo khách thành công, lúc khách nhận máy.', { attach: 'S', pos: 'below', kind: 'time', w: 150, dx: -40, dy: 40 });
  d.note('Hãng từ chối bảo hành: khách nhận lý do của hãng và báo giá sửa có phí trong hệ thống ngay trong thông báo, để quyết định trong một lần liên hệ.', { attach: 'Th', pos: 'above', kind: 'change', w: 160, dx: -70 });
  d.note('Sửa lại được đánh dấu riêng, để đếm được số lần làm lại.', { attach: 'Ts1', pos: 'below', kind: 'change', w: 150, dx: -30 });
  d.note('Thông báo gồm kết quả, số tiền, hạn nhận, lời nhắc mang phiếu và máy dùng tạm. Nhắc lại theo các mốc, lần cuối bằng gọi điện. Cần doanh nghiệp quyết định: số lần nhắc.', { attach: 'Tn', pos: 'above', kind: 'decide', w: 150, dx: 32, tx: 12 });
  d.note('Cần doanh nghiệp quyết định: mốc bắt đầu tính 60 ngày (đề xuất: từ lúc báo khách thành công), và việc rà soát trước khi tháo gỡ.', { attach: 'Trs', pos: 'below', kind: 'decide', w: 215, dx: -40 });
  d.note('Thay cho việc không trả máy khi mất phiếu: đối chiếu mã gửi về số điện thoại đã đăng ký, giấy tờ tùy thân và số IMEI. Cần doanh nghiệp quyết định, vì thay đổi quy định đã công bố.', { attach: 'Txm', pos: 'above', kind: 'decide', w: 200, dx: 32, tx: 12 });
  d.note('Hồ sơ chưa trả được có người phụ trách và hạn xử lý.', { attach: 'E4a', pos: 'above', kind: 'change', w: 130, dx: 5, dy: -4 });
  d.note('Nhân viên cùng khách kiểm tra lỗi ban đầu và các tính năng cơ bản; khách xác nhận kết quả.', { attach: 'T6', pos: 'above', kind: 'change', w: 140, dx: 32, tx: 12 });
  d.note('Khách không nhận vì còn lỗi, hoặc chọn sửa có phí sau khi hãng từ chối: thiết bị quay lại bộ phận sửa chữa theo đường ưu tiên, không xếp hàng lại từ đầu.', { attach: 'Ts2', pos: 'below', kind: 'change', w: 215, dx: -40 });
  d.note('Khách có thể thanh toán trước qua kênh trực tuyến khi nhận thông báo.', { attach: 'T7', pos: 'above', kind: 'change', w: 150, dx: 32, tx: 12 });
  d.note('Thời điểm của từng mốc được lưu khi đóng hồ sơ, làm số liệu cho các khoảng thời gian cần đo.', { attach: 'T9', pos: 'above', kind: 'time', w: 150, dx: -30 });
  d.note('Không đồng nhất "đã bàn giao" với "đã sửa chữa thành công".', { attach: 'g6', pos: 'below', kind: 'info', w: 150, dx: -150, dy: 20, corner: 'right', tx: -6 });
  return d;
}
