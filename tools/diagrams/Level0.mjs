// Sơ đồ tổng quan
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'Level0', name: 'CellphoneS As-Is - Sơ đồ tổng quan', cols: 18 });
  d.header('SƠ ĐỒ TỔNG QUAN: Tiếp nhận và xử lý yêu cầu bảo hành, sửa chữa thiết bị qua cửa hàng CellphoneS');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [
      { id: 'CH', name: 'Cửa hàng CellphoneS', rows: 3, padTop: 95, padBottom: 85 },
      { id: 'SC', name: 'Bộ phận sửa chữa (Điện Thoại Vui; CareS với thiết bị Apple)', rows: 1, padTop: 45, padBottom: 100 }
    ]
  });
  d.pool('HANG', 'Trung tâm bảo hành của hãng', { blackbox: true });

  const L = 'CH';
  d.start('S', 'Khách nêu yêu cầu tại cửa hàng', { lane: L, col: 0, row: 1, def: 'message' });
  d.sub('P1', '1. Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy', { lane: L, col: 1, row: 1 });
  d.xor('g1', 'Kết quả\ntại quầy?', { lane: L, col: 2, row: 1 });
  d.end('E_doi', 'Chuyển sang quy trình đổi trả', { lane: L, col: 2, row: 0, labelPos: 'right' });
  d.end('E_ve', 'Khách mang máy về', { lane: L, col: 2, row: 2, labelPos: 'right' });
  d.sub('P2', '2. Nhận thiết bị và lập phiếu tiếp nhận', { lane: L, col: 3, row: 1 });
  d.xor('g2', 'Đã nhận\nthiết bị?', { lane: L, col: 4, row: 1 });
  d.end('E_chua', 'Khách chưa giao máy', { lane: L, col: 4, row: 2, labelPos: 'right' });
  d.xor('g3', 'Xử lý ở đâu?', { lane: L, col: 5, row: 1, labelPos: 'br' });
  d.task('TQ', 'Xử lý nhanh lỗi tại cửa hàng', { lane: L, col: 6, row: 0 });
  d.xor('gq', 'Cần chuyển sang\nbộ phận sửa chữa?', { lane: L, col: 7, row: 0 });
  d.xor('mP3', '', { lane: L, col: 7, row: 1 });
  d.sub('P3', '3. Chuyển thiết bị đến nơi xử lý', { lane: L, col: 8, row: 1 });
  d.xor('g4', 'Kết quả chuyển\nthiết bị?', { lane: L, col: 9, row: 1 });
  d.xor('mQ', '', { lane: L, col: 9, row: 0 });
  d.catchEv('CHg', 'Nhận kết quả và thiết bị từ hãng', { lane: L, col: 10, row: 1, def: 'message', labelPos: 'top' });
  d.xor('mA', '', { lane: L, col: 11, row: 1 });
  d.sub('P4', '4. Kiểm tra kỹ thuật và sửa chữa', { lane: 'SC', col: 12, row: 0 });
  d.xor('mB', '', { lane: L, col: 13, row: 1 });
  d.sub('P5', '5. Trả thiết bị và hoàn tất yêu cầu', { lane: L, col: 14, row: 1 });
  d.xor('g5', 'Kết quả trả\nthiết bị?', { lane: L, col: 15, row: 1 });
  d.end('E_ok', 'Đã trả thiết bị sau khi sửa chữa, bảo hành hoặc thay thế', { lane: L, col: 16, row: 1, labelPos: 'right' });
  d.end('E_cs', 'Đã trả thiết bị chưa sửa', { lane: L, col: 16, row: 0, labelPos: 'right' });
  d.xor('g7', 'Vì sao chưa trả được?', { lane: L, col: 15, row: 2, labelPos: 'br', labelDy: 12 });
  d.end('E_60', 'Thiết bị bị tháo gỡ linh kiện để tái chế', { lane: L, col: 16, row: 2, labelPos: 'right' });
  d.end('E_nl', 'Chưa hoàn tất bàn giao, chuyển xử lý ngoại lệ', { lane: L, col: 14, row: 2, labelPos: 'bottom' });

  d.flow('S', 'P1');
  d.flow('P1', 'g1');
  d.flow('g1', 'E_doi', 'Đủ điều kiện đổi mới');
  d.flow('g1', 'E_ve', 'Khách không tiếp tục');
  d.flow('g1', 'P2', 'Khách\ngiao máy', { exit: 'r', enter: 'l' });
  d.flow('P2', 'g2');
  d.flow('g2', 'E_chua', 'Chưa');
  d.flow('g2', 'g3', 'Rồi', { exit: 'r', enter: 'l' });
  d.flow('g3', 'TQ', 'Xử lý nhanh tại cửa hàng');
  d.flow('g3', 'mP3', 'Bộ phận sửa chữa hoặc hãng', { exit: 'r', enter: 'l' });
  d.flow('TQ', 'gq');
  d.flow('gq', 'mP3', 'Có');
  d.flow('gq', 'mQ', 'Không', { exit: 'r', enter: 'l' });
  d.flow('mP3', 'P3');
  d.flow('P3', 'g4');
  d.flow('g4', 'mQ', 'Không có nơi xử lý phù hợp');
  d.flow('g4', 'CHg', 'Hãng đã nhận', { exit: 'r', enter: 'l' });
  d.flow('g4', 'P4', 'Bộ phận sửa chữa đã nhận', { exit: 'b', enter: 'l' });
  d.flow('CHg', 'mA');
  d.flow('mQ', 'mA', '', { exit: 'r', enter: 't' });
  d.flow('mA', 'mB');
  d.flow('P4', 'mB', '', { exit: 'r', enter: 'b' });
  d.flow('mB', 'P5');
  d.flow('P5', 'g5');
  d.flow('g5', 'E_cs', 'Đã trả, thiết bị chưa sửa');
  d.flow('g5', 'E_ok', 'Đã trả sau khi xử lý', { exit: 'r', enter: 'l' });
  d.flow('g5', 'g7', 'Chưa trả được thiết bị');
  d.flow('g7', 'E_60', 'Quá 60 ngày khách không đến nhận', { exit: 'r', enter: 'l' });
  d.flow('g7', 'E_nl', 'Thiếu phiếu, hoặc khách không nhận thiết bị', { exit: 'l', enter: 'r' });

  d.msg('KH', 'S', 'Yêu cầu bảo hành, sửa chữa', { labelSide: 'left' });
  d.msg('P1', 'KH', 'Tư vấn hướng xử lý sơ bộ', { dx: -20, labelSide: 'left' });
  d.msg('KH', 'P1', 'Quyết định của khách', { dx: 20 });
  d.msg('KH', 'P2', 'Thiết bị', { dx: -20, labelSide: 'left' });
  d.msg('P2', 'KH', 'Phiếu tiếp nhận, máy dùng tạm nếu có', { dx: 20 });
  d.msg('P3', 'HANG', 'Thiết bị và hồ sơ yêu cầu');
  d.msg('HANG', 'CHg', 'Kết quả và thiết bị');
  d.msg('P4', 'KH', 'Phương án và chi phí', { dx: -20, labelSide: 'left' });
  d.msg('KH', 'P4', 'Đồng ý hoặc từ chối', { dx: 20 });
  d.msg('P5', 'KH', 'Thông báo nhận máy, thiết bị', { dx: -20, labelSide: 'left' });
  d.msg('KH', 'P5', 'Phiếu tiếp nhận, phí sửa chữa nếu có', { dx: 20 });

  d.note('Nhóm nghiên cứu: kiểm tra bảo hành ngay tại quầy, trước khi nhận máy. Kết quả chỉ là phân loại sơ bộ.', { attach: 'P1', pos: 'below', kind: 'team', dx: -55, w: 170 });
  d.note('Có nguồn (Chính sách bảo hành CellphoneS): đổi mới trong 30 ngày khi lỗi phần cứng từ nhà sản xuất.', { attach: 'E_doi', pos: 'above', kind: 'source', w: 150, dx: -5 });
  d.note('Nhóm nghiên cứu: phiếu tiếp nhận được lập cho mọi thiết bị, kể cả lỗi sửa nhanh.', { attach: 'P2', pos: 'below', kind: 'team', w: 160, dx: -10, dy: 30 });
  d.note('Nhóm nghiên cứu: cửa hàng tự xử lý lỗi đơn giản như thay miếng dán màn hình, lỗi phần mềm. Cần khảo sát: danh mục lỗi.', { attach: 'TQ', pos: 'above', kind: 'team', w: 215, dx: -40 });
  d.note('Có: cửa hàng không xử lý được và khách đồng ý chuyển. Không: đã xử lý xong, hoặc khách không tiếp tục.', { attach: 'gq', pos: 'above', kind: 'info', w: 200, dx: 45, dy: -4, tx: 6 });
  d.note('Cần khảo sát: cách chuyển thiết bị, người phụ trách, mốc giao và mốc nhận.', { attach: 'P3', pos: 'below', kind: 'survey', w: 150, dx: -150, dy: 10, corner: 'right', tx: -30 });
  d.note('Cần khảo sát: không có nguồn về quy trình bên trong của hãng; khi hãng từ chối bảo hành thì xử lý thế nào.', { attach: 'CHg', pos: 'below', kind: 'survey', w: 190, dx: 35, dy: 25 });
  d.note('Có nguồn (Trang chủ Điện Thoại Vui, Hướng dẫn của CareS): kiểm tra, báo giá, sửa sau khi khách đồng ý, kiểm tra lại.', { attach: 'P4', pos: 'below', kind: 'source', w: 230, dx: 0, dy: -6 });
  d.note('Có nguồn (Quy định tiếp nhận của CellphoneS): phiếu có giá trị lấy máy trong 60 ngày.', { attach: 'E_60', pos: 'below', kind: 'source', w: 185, dx: 5, dy: 14 });
  d.note('Theo dõi trạng thái xuyên suốt. Có nguồn: khách tra cứu qua trang Điện Thoại Vui và Smember. Cần khảo sát: ai cập nhật, khi nào, ở hệ thống nào; cửa hàng và bộ phận sửa chữa có thấy cùng trạng thái không; khách được báo hay phải tự tra cứu.', { at: { x: d.o.x0, y: 96 }, w: 900, kind: 'survey' });
  return d;
}
