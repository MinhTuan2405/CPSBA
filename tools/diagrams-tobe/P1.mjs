// Sơ đồ chi tiết 1 (To-Be): Tiếp nhận yêu cầu, phân tuyến và thỏa thuận tại quầy
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'ToBe_P1', name: 'CellphoneS To-Be - Sơ đồ chi tiết 1', cols: 18, y0: 140, exporter: 'CellphoneS To-Be BPMN generator' });
  d.headerToBe('SƠ ĐỒ CHI TIẾT 1 (TO-BE): Tiếp nhận yêu cầu, phân tuyến và thỏa thuận tại quầy');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [{ id: 'CH', name: 'Cửa hàng CellphoneS', rows: 3, padTop: 120, padBottom: 85 }]
  });

  const L = 'CH';
  d.start('S', 'Khách nêu yêu cầu tại cửa hàng', { lane: L, col: 0, row: 1, def: 'message' });
  d.xor('g0', 'Khách đã\nkhai báo trước?', { lane: L, col: 1, row: 1, labelPos: 'bl', labelDy: 4 });
  d.task('T1a', 'Mở hồ sơ khách đã khai báo, xác nhận lại', { lane: L, col: 2, row: 0, mark: 'new' });
  d.task('T1', 'Tiếp nhận yêu cầu, ghi hiện tượng lỗi vào hồ sơ', { lane: L, col: 2, row: 1, mark: 'changed' });
  d.xor('m0', '', { lane: L, col: 3, row: 1 });
  d.task('T1b', 'Nhắc khách thoát tài khoản và bắt đầu sao lưu', { lane: L, col: 4, row: 1, mark: 'new' });
  d.task('T2', 'Tra cứu bảo hành: quyền lợi và nơi bảo hành hiện cùng lúc', { lane: L, col: 5, row: 1, mark: 'changed' });
  d.xor('gT', 'Tra cứu\ncó kết quả?', { lane: L, col: 6, row: 1, labelPos: 'bl', labelDy: 4 });
  d.task('T2b', 'Tra cứu theo các cách thay thế đã quy định', { lane: L, col: 7, row: 0, mark: 'new' });
  d.xor('mT', '', { lane: L, col: 8, row: 1 });
  d.task('T3', 'Kiểm tra ngoại quan nhanh', { lane: L, col: 9, row: 1, mark: 'new' });
  d.task('T4', 'Xác định hướng và nơi xử lý cụ thể theo bảng quy tắc', { lane: L, col: 10, row: 1, mark: 'changed' });
  d.xor('g1', 'Đủ điều kiện\nđổi mới?', { lane: L, col: 11, row: 1, labelPos: 'bl', labelDy: 4 });
  d.task('T6', 'Tư vấn hướng xử lý, chi phí tham khảo và các lựa chọn nơi sửa', { lane: L, col: 12, row: 1, mark: 'changed' });
  d.task('T5', 'Hướng dẫn khách sang quy trình đổi trả', { lane: L, col: 12, row: 2 });
  d.end('E_doi', 'Chuyển sang quy trình đổi trả', { lane: L, col: 13, row: 2, labelPos: 'bottom' });
  d.catchEv('C1', 'Nhận quyết định của khách', { lane: L, col: 13, row: 1, def: 'message' });
  d.xor('g2', 'Khách\nchọn gì?', { lane: L, col: 14, row: 1 });
  d.task('T8', 'Đặt lịch hộ khách tại nơi sửa chữa', { lane: L, col: 15, row: 0, mark: 'new' });
  d.task('T7', 'Ghi mức chi phí khách chấp nhận sửa không cần hỏi lại', { lane: L, col: 15, row: 1, mark: 'new' });
  d.task('T9', 'Lưu kết quả tra cứu và tư vấn vào hồ sơ', { lane: L, col: 15, row: 2, mark: 'new' });
  d.end('E_thang', 'Khách đến thẳng nơi sửa theo lịch hẹn', { lane: L, col: 16, row: 0 });
  d.end('E_ok', 'Khách đồng ý giao máy', { lane: L, col: 16, row: 1 });
  d.end('E_ve', 'Khách mang máy về, hồ sơ được lưu', { lane: L, col: 16, row: 2 });

  d.flow('S', 'g0');
  d.flow('g0', 'T1a', 'Có');
  d.flow('g0', 'T1', 'Chưa', { exit: 'r', enter: 'l' });
  d.flow('T1a', 'm0');
  d.flow('T1', 'm0');
  d.flow('m0', 'T1b');
  d.flow('T1b', 'T2');
  d.flow('T2', 'gT');
  d.flow('gT', 'T2b', 'Không');
  d.flow('gT', 'mT', 'Có', { exit: 'r', enter: 'l' });
  d.flow('T2b', 'mT');
  d.flow('mT', 'T3');
  d.flow('T3', 'T4');
  d.flow('T4', 'g1');
  d.flow('g1', 'T6', 'Không', { exit: 'r', enter: 'l' });
  d.flow('g1', 'T5', 'Có');
  d.flow('T5', 'E_doi');
  d.flow('T6', 'C1');
  d.flow('C1', 'g2');
  d.flow('g2', 'T8', 'Đến thẳng\nnơi sửa');
  d.flow('g2', 'T7', 'Giao máy tại\ncửa hàng', { exit: 'r', enter: 'l' });
  d.flow('g2', 'T9', 'Không\ntiếp tục');
  d.flow('T8', 'E_thang');
  d.flow('T7', 'E_ok');
  d.flow('T9', 'E_ve');

  d.msg('KH', 'S', 'Yêu cầu bảo hành, sửa chữa', { labelSide: 'left' });
  d.msg('T1b', 'KH', 'Hướng dẫn chuẩn bị thiết bị', { labelSide: 'left' });
  d.msg('T6', 'KH', 'Tư vấn và các lựa chọn', { labelSide: 'left' });
  d.msg('KH', 'C1', 'Quyết định của khách');

  d.data('D_bang', 'Bảng quy tắc phân tuyến', { near: 'T4', pos: 'above', labelPos: 'right' });
  d.dataIn('D_bang', 'T4');

  d.note('Khách có thể khai báo lỗi, số IMEI và đặt lịch trước khi đến, qua website, ứng dụng hoặc tổng đài. Tại quầy chỉ cần xác nhận lại.', { attach: 'T1a', pos: 'above', kind: 'change', w: 215, dx: -10 });
  d.note('Mốc thời gian được lưu: lúc khách đến cửa hàng, lúc khách được tiếp, lúc có hướng xử lý.', { attach: 'S', pos: 'below', kind: 'time', w: 150, dx: -35, dy: 30 });
  d.note('Hướng dẫn sao lưu được đưa lên đầu. Khách chuẩn bị máy trong lúc nhân viên tra cứu và tư vấn.', { attach: 'T1b', pos: 'below', kind: 'change', w: 150, dx: -30 });
  d.note('Cần khảo sát: công cụ tra cứu hiện tại đã hiện đủ nhóm sản phẩm, quyền lợi và nơi bảo hành chưa.', { attach: 'T2', pos: 'below', kind: 'survey', w: 150, dx: -30 });
  d.note('Thứ tự tra cứu thay thế: số điện thoại mua hàng, hóa đơn, số Seri trên máy. Vẫn không ra thì người được chỉ định quyết định.', { attach: 'T2b', pos: 'above', kind: 'change', w: 215, dx: -10 });
  d.note('Phát hiện sớm dấu hiệu có thể khiến máy không được bảo hành.', { attach: 'T3', pos: 'below', kind: 'change', w: 150, dx: -30 });
  d.note('Nơi xử lý cụ thể được chọn ngay tại quầy. Không có nơi phù hợp thì khách biết khi còn giữ máy.', { attach: 'T4', pos: 'below', kind: 'change', w: 150, dx: -30 });
  d.note('Cần doanh nghiệp quyết định: ai kết luận lỗi thuộc nhà sản xuất tại cửa hàng; mốc 30 ngày tính đến ngày khách báo lỗi.', { attach: 'g1', pos: 'above', kind: 'decide', w: 150, dx: -20, dy: -10 });
  d.note('Khách chọn mang máy thẳng đến nơi sửa: bỏ được hai lần giao nhận giữa cửa hàng và nơi sửa.', { attach: 'T8', pos: 'above', kind: 'change', w: 215, dx: -10 });
  d.note('Mức chi phí được ghi vào phiếu. Trong mức này thì bộ phận sửa chữa sửa luôn, không phải chờ khách trả lời.', { attach: 'E_ok', kind: 'change', w: 150, at: { x: d.n('E_ok').cx + 60, y: d.n('E_ok').cy - 48 }, side: 'left' });
  d.note('Khách quay lại không phải làm lại từ đầu.', { attach: 'T9', pos: 'below', kind: 'change', w: 150, dx: -30 });
  return d;
}
