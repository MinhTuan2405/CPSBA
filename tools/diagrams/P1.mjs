// Sơ đồ chi tiết 1: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'P1', name: 'CellphoneS As-Is - Sơ đồ chi tiết 1', cols: 10 });
  d.header('SƠ ĐỒ CHI TIẾT 1: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [{ id: 'CH', name: 'Cửa hàng CellphoneS', rows: 2, padTop: 120, padBottom: 120 }]
  });

  const L = 'CH';
  d.start('S', 'Khách nêu yêu cầu tại cửa hàng', { lane: L, col: 0, row: 0, def: 'message' });
  d.task('T1', 'Tiếp nhận yêu cầu và hỏi hiện tượng lỗi', { lane: L, col: 1, row: 0 });
  d.task('T2', 'Tra cứu thông tin bảo hành của thiết bị', { lane: L, col: 2, row: 0 });
  d.task('T3', 'Xác định nhóm sản phẩm và quyền lợi bảo hành', { lane: L, col: 3, row: 0 });
  d.task('T4', 'Xác định hướng xử lý sơ bộ', { lane: L, col: 4, row: 0 });
  d.xor('g1', 'Đủ điều kiện\nđổi mới?', { lane: L, col: 5, row: 0 });
  d.task('T6', 'Tư vấn hướng xử lý cho khách', { lane: L, col: 6, row: 0 });
  d.task('T5', 'Hướng dẫn khách sang quy trình đổi trả', { lane: L, col: 6, row: 1 });
  d.end('E_doi', 'Chuyển sang quy trình đổi trả', { lane: L, col: 7, row: 1, labelPos: 'right' });
  d.catchEv('C1', 'Nhận quyết định của khách', { lane: L, col: 7, row: 0, def: 'message' });
  d.xor('g2', 'Khách\ntiếp tục?', { lane: L, col: 8, row: 0 });
  d.end('E_ok', 'Khách đồng ý giao máy', { lane: L, col: 9, row: 0 });
  d.end('E_ve', 'Khách mang máy về', { lane: L, col: 9, row: 1 });

  d.flow('S', 'T1');
  d.flow('T1', 'T2');
  d.flow('T2', 'T3');
  d.flow('T3', 'T4');
  d.flow('T4', 'g1');
  d.flow('g1', 'T6', 'Không', { exit: 'r', enter: 'l' });
  d.flow('g1', 'T5', 'Có');
  d.flow('T5', 'E_doi');
  d.flow('T6', 'C1');
  d.flow('C1', 'g2');
  d.flow('g2', 'E_ok', 'Đồng ý\ngiao máy', { exit: 'r', enter: 'l' });
  d.flow('g2', 'E_ve', 'Không\ntiếp tục');

  d.msg('KH', 'S', 'Yêu cầu bảo hành, sửa chữa', { labelSide: 'left' });
  d.msg('T6', 'KH', 'Hướng xử lý sơ bộ', { labelSide: 'left' });
  d.msg('KH', 'C1', 'Quyết định của khách');

  d.note('Có nguồn (Trang kiểm tra thời hạn bảo hành CellphoneS): khách có thể gọi tổng đài 1800.2097 trước khi đến. Cần khảo sát: cuộc gọi có tạo hồ sơ không.', { attach: 'S', pos: 'below', kind: 'survey', w: 155, dx: -35, dy: 30 });
  d.note('Cần khảo sát: cách ghi nhận yêu cầu ở bước này; thời gian khách chờ được phục vụ.', { attach: 'T1', pos: 'below', kind: 'survey', w: 150, dx: -20 });
  d.note('Nhóm nghiên cứu: tra cứu ngay tại quầy, khi khách còn giữ máy.', { attach: 'T2', pos: 'above', kind: 'team', w: 150 });
  d.note('Có nguồn (Trang kiểm tra thời hạn bảo hành CellphoneS): tra cứu bằng IMEI hoặc Seri. Cần khảo sát: công cụ nhân viên thực sự dùng; cách xử lý khi không tìm thấy thông tin.', { attach: 'T2', pos: 'below', kind: 'survey', w: 150, dx: -20 });
  d.note('Có nguồn (Chính sách bảo hành CellphoneS): máy mới bảo hành tại hãng; máy đã kích hoạt theo hãng rồi đến CellphoneS/ Điện Thoại Vui; máy cũ 6 tháng tại CellphoneS/ Điện Thoại Vui.', { attach: 'T3', pos: 'below', kind: 'source', w: 150, dx: -20 });
  d.note('Đo thời gian 1: từ khi khách nêu yêu cầu đến khi có hướng xử lý sơ bộ.', { attach: 'T4', pos: 'above', kind: 'time', w: 150 });
  d.note('Bốn hướng: xử lý nhanh tại cửa hàng; sửa chữa trong hệ thống; gửi bảo hành hãng; đổi mới. Cần khảo sát: quy tắc phân tuyến chi tiết.', { attach: 'T4', pos: 'below', kind: 'survey', w: 150, dx: -20 });
  d.note('Có nguồn (Chính sách bảo hành CellphoneS): đổi mới trong 30 ngày khi lỗi phần cứng từ nhà sản xuất. Cần khảo sát: ai kết luận lỗi thuộc nhà sản xuất.', { attach: 'T5', pos: 'below', kind: 'survey', w: 200, dx: -40 });
  d.note('Chỉ là phân loại sơ bộ. Kết luận sửa miễn phí hay có phí chỉ có sau khi kiểm tra kỹ thuật (sơ đồ chi tiết 4).', { attach: 'T6', pos: 'above', kind: 'info', w: 150, dx: -150, corner: 'right', tx: -25 });
  d.note('Gồm cả trường hợp khách tự mang máy đến trung tâm bảo hành của hãng. Khách chưa giao máy nên không có thủ tục trả máy.', { attach: 'E_ve', pos: 'below', kind: 'info', w: 190, dx: -110, dy: 22, corner: 'right', tx: 0 });
  return d;
}
