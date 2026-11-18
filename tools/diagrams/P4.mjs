// Sơ đồ chi tiết 4: Kiểm tra kỹ thuật và sửa chữa (trường hợp sửa chữa trong hệ thống)
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'P4', name: 'CellphoneS As-Is - Sơ đồ chi tiết 4', cols: 17 });
  d.header('SƠ ĐỒ CHI TIẾT 4: Kiểm tra kỹ thuật và sửa chữa');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [{ id: 'SC', name: 'Bộ phận sửa chữa (Điện Thoại Vui; CareS với thiết bị Apple)', rows: 3, padTop: 125, padBottom: 120 }]
  });

  const L = 'SC';
  d.start('S', 'Bộ phận sửa chữa đã nhận thiết bị', { lane: L, col: 0, row: 1 });
  d.task('T1', 'Kiểm tra tình trạng thiết bị', { lane: L, col: 1, row: 1 });
  d.task('T2', 'Chẩn đoán nguyên nhân lỗi', { lane: L, col: 2, row: 1 });
  d.task('T3', 'Xác định phương án xử lý', { lane: L, col: 3, row: 1 });
  d.xor('g1', 'Phương án có\nphát sinh chi phí?', { lane: L, col: 4, row: 1, labelPos: 'bl', labelDy: 4 });
  d.task('T4', 'Báo phương án và chi phí cho khách', { lane: L, col: 5, row: 0 });
  d.catchEv('C1', 'Nhận phản hồi của khách', { lane: L, col: 6, row: 0, def: 'message' });
  d.xor('g2', 'Khách\nđồng ý?', { lane: L, col: 7, row: 0 });
  d.xor('mR', '', { lane: L, col: 7, row: 1 });
  d.xor('g3', 'Phải chờ\nlinh kiện?', { lane: L, col: 8, row: 1 });
  d.catchEv('C2', 'Linh kiện đã về', { lane: L, col: 8, row: 2, def: 'conditional', labelPos: 'left' });
  d.xor('mP', '', { lane: L, col: 9, row: 1 });
  d.task('T5', 'Sửa chữa hoặc thay thế linh kiện', { lane: L, col: 10, row: 1 });
  d.task('T6', 'Kiểm tra thiết bị sau sửa chữa', { lane: L, col: 11, row: 1 });
  d.xor('g4', 'Kết quả\nkiểm tra đạt?', { lane: L, col: 12, row: 1 });
  d.xor('g5', 'Có thể\nxử lý lại?', { lane: L, col: 12, row: 2, labelPos: 'bl', labelDy: 4 });
  d.xor('mE', '', { lane: L, col: 13, row: 1 });
  d.task('T7', 'Ghi nhận kết quả xử lý', { lane: L, col: 14, row: 1 });
  d.task('T9', 'Chuyển kết quả và thiết bị về cửa hàng', { lane: L, col: 15, row: 1 });
  d.end('E', 'Kết quả và thiết bị đã về cửa hàng', { lane: L, col: 16, row: 1 });

  d.flow('S', 'T1');
  d.flow('T1', 'T2');
  d.flow('T2', 'T3');
  d.flow('T3', 'g1');
  d.flow('g1', 'T4', 'Có');
  d.flow('g1', 'mR', 'Không: bảo hành theo chính sách', { exit: 'r', enter: 'l', lp: { dx: 150, dy: 44 } });
  d.flow('T4', 'C1');
  d.flow('C1', 'g2');
  d.flow('g2', 'mR', 'Đồng ý');
  d.flow('g2', 'mE', 'Từ chối', { exit: 't', enter: 't', midY: d.laneTop('SC') + 18 });
  d.flow('mR', 'g3');
  d.flow('g3', 'mP', 'Không', { exit: 'r', enter: 'l' });
  d.flow('g3', 'C2', 'Có');
  d.flow('C2', 'mP', '', { exit: 'r', enter: 'b' });
  d.flow('mP', 'T5');
  d.flow('T5', 'T6');
  d.flow('T6', 'g4');
  d.flow('g4', 'mE', 'Đạt', { exit: 'r', enter: 'l' });
  d.flow('g4', 'g5', 'Chưa đạt');
  d.flow('g5', 'mP', 'Có', { exit: 'l', enter: 'b' });
  d.flow('g5', 'mE', 'Không', { exit: 'r', enter: 'b' });
  d.flow('mE', 'T7');
  d.flow('T7', 'T9');
  d.flow('T9', 'E');

  d.msg('T4', 'KH', 'Phương án, chi phí, thời gian', { labelSide: 'left' });
  d.msg('KH', 'C1', 'Đồng ý hoặc từ chối');

  d.data('D_kq', 'Kết quả kiểm tra', { near: 'T2', pos: 'below', labelPos: 'right' });
  d.dataOut('T2', 'D_kq');
  d.data('D_bg', 'Báo giá', { near: 'T4', pos: 'below', dx: -45, dy: -8, labelPos: 'right' });
  d.dataOut('T4', 'D_bg');
  d.data('D_kqxl', 'Kết quả xử lý', { near: 'T7', pos: 'below', labelPos: 'right' });
  d.dataOut('T7', 'D_kqxl');

  d.note('Đo thời gian 5: từ khi nhận thiết bị đến khi chẩn đoán xong.', { attach: 'S', pos: 'below', kind: 'time', w: 150, dx: -30, dy: 40 });
  d.note('Có nguồn (Trang chủ Điện Thoại Vui): kiểm tra thiết bị. Có nguồn (Hướng dẫn của CareS): kiểm tra ngoại quan.', { attach: 'T1', pos: 'above', kind: 'source', w: 150, dx: -30 });
  d.note('Có nguồn (Hướng dẫn của CareS): chẩn đoán bằng phần mềm chuyên dụng. Chỉ áp dụng cho CareS.', { attach: 'T2', pos: 'above', kind: 'source', w: 150, dx: -30 });
  d.note('Bảo hành theo chính sách, hoặc sửa chữa có phí. Phân loại sơ bộ tại quầy được xác nhận hoặc thay đổi ở bước này.', { attach: 'T3', pos: 'above', kind: 'info', w: 150, dx: -30 });
  d.note('Có nguồn (Điện Thoại Vui, CareS): báo giá và chỉ sửa sau khi khách đồng ý, công bố cho khách đến trực tiếp. Cần khảo sát: ai liên hệ khách, qua kênh nào, lưu xác nhận ra sao.', { attach: 'T4', pos: 'above', kind: 'survey', w: 215, dx: -230, dy: 14, corner: 'right', tx: -25 });
  d.note('Đo thời gian 6: từ khi báo phương án đến khi khách phản hồi.', { attach: 'C1', pos: 'above', kind: 'time', w: 130, dx: -120, dy: -6, corner: 'right', tx: -6 });
  d.note('Khách từ chối: dừng sửa chữa, trả thiết bị chưa sửa. Không có nguồn về hậu quả khi từ chối, ví dụ phí kiểm tra.', { attach: 'g2', kind: 'survey', w: 190, at: { x: d.n('g2').cx + 60, y: d.n('g2').cy - 12 }, side: 'left' });
  d.note('Cần khảo sát: việc chờ linh kiện chưa có nguồn. Đo thời gian 7: thời gian chờ linh kiện, nếu phát sinh.', { attach: 'C2', pos: 'below', kind: 'survey', w: 165, dx: -45, dy: 4 });
  d.note('Cần khảo sát: lỗi phức tạp có phải chuyển lên trung tâm sửa chữa của Apple không (chưa có nguồn).', { attach: 'T5', pos: 'above', kind: 'survey', w: 150, dx: -30 });
  d.note('Đo thời gian 8: thời gian sửa chữa.', { attach: 'T5', pos: 'below', kind: 'time', w: 130, dx: -15, dy: -16 });
  d.note('Có nguồn (Điện Thoại Vui): kiểm tra hoàn thiện. Có nguồn (CareS): kiểm tra lại chức năng liên quan lỗi ban đầu và tính năng cơ bản.', { attach: 'T6', pos: 'above', kind: 'source', w: 150, dx: -30 });
  d.note('Cần khảo sát: khi kiểm tra chưa đạt thì sửa lại, đổi phương án hay dừng. Mô hình có lối thoát khi không thể xử lý, không lặp vô hạn.', { attach: 'g5', pos: 'below', kind: 'survey', w: 200, dx: 40, dy: 4, tx: 6 });
  d.note('Kết quả gồm: đã sửa chữa hoặc bảo hành; khách từ chối; không thể xử lý.', { attach: 'T7', pos: 'above', kind: 'info', w: 140, dx: -20 });
  d.note('Cần khảo sát: cách chuyển thiết bị về cửa hàng, cách báo, thời điểm cập nhật trạng thái. Đo thời gian 9: từ khi sửa xong đến khi thiết bị sẵn sàng trả tại cửa hàng.', { attach: 'T9', pos: 'above', kind: 'survey', w: 190, dx: -10 });
  d.note('Phạm vi: sửa chữa trong hệ thống, dựa trên quy trình Điện Thoại Vui và CareS công bố cho khách đến trực tiếp. Trường hợp gửi hãng: xem sơ đồ tổng quan. Có nguồn (Hướng dẫn của CareS), chỉ để tham khảo: một số lỗi iPhone 1 đến 2 giờ, MacBook 7 đến 14 ngày; không dùng làm số liệu chung.', { at: { x: d.o.x0, y: 96 }, w: 1000, kind: 'info' });
  return d;
}
