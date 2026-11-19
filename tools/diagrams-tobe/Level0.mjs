// Sơ đồ tổng quan (To-Be)
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'ToBe_Level0', name: 'CellphoneS To-Be - Sơ đồ tổng quan', cols: 20, y0: 185, exporter: 'CellphoneS To-Be BPMN generator' });
  d.headerToBe('SƠ ĐỒ TỔNG QUAN (TO-BE): Tiếp nhận và xử lý yêu cầu bảo hành, sửa chữa thiết bị qua cửa hàng CellphoneS');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [
      { id: 'CH', name: 'Cửa hàng CellphoneS', rows: 4, padTop: 105, padBottom: 20 },
      { id: 'SC', name: 'Bộ phận sửa chữa (Điện Thoại Vui; CareS với thiết bị Apple)', rows: 1, padTop: 30, padBottom: 110 }
    ]
  });
  d.pool('HANG', 'Trung tâm bảo hành của hãng', { blackbox: true });

  const L = 'CH';
  d.start('S', 'Khách nêu yêu cầu tại cửa hàng', { lane: L, col: 0, row: 1, def: 'message' });
  d.sub('P1', '1. Tiếp nhận yêu cầu, phân tuyến và thỏa thuận tại quầy', { lane: L, col: 1, row: 1, mark: 'changed' });
  d.xor('g1', 'Kết quả\ntại quầy?', { lane: L, col: 2, row: 1 });
  d.end('E_doi', 'Chuyển sang quy trình đổi trả', { lane: L, col: 2, row: 0, labelPos: 'right' });
  d.end('E_ve', 'Khách không giao máy tại cửa hàng', { lane: L, col: 2, row: 2, labelPos: 'right' });
  d.sub('P2', '2. Nhận thiết bị và lập phiếu tiếp nhận', { lane: L, col: 3, row: 1, mark: 'changed' });
  d.xor('g2', 'Đã nhận\nthiết bị?', { lane: L, col: 4, row: 1 });
  d.end('E_chua', 'Khách chưa giao máy, hồ sơ được lưu', { lane: L, col: 4, row: 2, labelPos: 'right' });
  d.xor('g3', 'Xử lý ở đâu?', { lane: L, col: 5, row: 1, labelPos: 'br' });
  d.task('TQ', 'Xử lý nhanh lỗi theo danh mục, có giới hạn thời gian', { lane: L, col: 6, row: 0, mark: 'changed' });
  d.xor('gq', 'Cần chuyển sang\nbộ phận sửa chữa?', { lane: L, col: 7, row: 0 });
  d.xor('mP3', '', { lane: L, col: 7, row: 1 });
  d.catchEv('L0', 'Chuyển lại bộ phận sửa chữa', { lane: L, col: 7, row: 2, def: 'link', labelPos: 'left', mark: 'new' });
  d.sub('P3', '3. Chuyển thiết bị đến nơi xử lý', { lane: L, col: 8, row: 1, mark: 'changed' });
  d.xor('g4', 'Kết quả chuyển\nthiết bị?', { lane: L, col: 9, row: 1 });
  d.xor('mQ', '', { lane: L, col: 9, row: 0 });
  d.xor('mH', '', { lane: L, col: 10, row: 1 });
  d.task('Th', 'Hỏi hãng, cập nhật trạng thái cho khách', { lane: L, col: 10, row: 2, mark: 'new' });
  d.ebg('EBh', '', { lane: L, col: 11, row: 1 });
  d.catchEv('TMh', 'Đến kỳ rà soát máy đang ở hãng', { lane: L, col: 11, row: 2, def: 'timer', labelPos: 'right', mark: 'new' });
  d.catchEv('CHg', 'Nhận kết quả và thiết bị từ hãng', { lane: L, col: 12, row: 1, def: 'message', labelPos: 'top' });
  d.xor('mA', '', { lane: L, col: 13, row: 1 });
  d.sub('P4', '4. Kiểm tra kỹ thuật và sửa chữa', { lane: 'SC', col: 14, row: 0, mark: 'changed' });
  d.xor('mB', '', { lane: L, col: 15, row: 1 });
  d.sub('P5', '5. Trả thiết bị và hoàn tất yêu cầu', { lane: L, col: 16, row: 1, mark: 'changed' });
  d.xor('g5', 'Kết quả trả\nthiết bị?', { lane: L, col: 17, row: 1 });
  d.end('E_cs', 'Đã trả thiết bị chưa sửa', { lane: L, col: 18, row: 0, labelPos: 'right' });
  d.end('E_ok', 'Đã trả thiết bị sau khi sửa chữa, bảo hành hoặc thay thế', { lane: L, col: 18, row: 1, labelPos: 'right' });
  d.xor('g7', 'Vì sao chưa\ntrả được?', { lane: L, col: 17, row: 2, labelPos: 'bl', labelDy: 4 });
  d.end('E_60', 'Thiết bị bị tháo gỡ linh kiện để tái chế', { lane: L, col: 18, row: 2, labelPos: 'right' });
  d.end('E_nl', 'Chưa trả thiết bị: không xác minh được người nhận', { lane: L, col: 16, row: 2, labelPos: 'bottom' });
  d.throwEv('L1', 'Chuyển lại bộ phận sửa chữa', { lane: L, col: 17, row: 3, def: 'link', labelPos: 'right', mark: 'new' });

  d.flow('S', 'P1');
  d.flow('P1', 'g1');
  d.flow('g1', 'E_doi', 'Đủ điều kiện đổi mới');
  d.flow('g1', 'E_ve', 'Không tiếp tục, hoặc đến thẳng nơi sửa');
  d.flow('g1', 'P2', 'Khách\ngiao máy', { exit: 'r', enter: 'l' });
  d.flow('P2', 'g2');
  d.flow('g2', 'E_chua', 'Chưa');
  d.flow('g2', 'g3', 'Rồi', { exit: 'r', enter: 'l' });
  d.flow('g3', 'TQ', 'Xử lý nhanh tại cửa hàng');
  d.flow('g3', 'mP3', 'Bộ phận sửa chữa hoặc hãng', { exit: 'r', enter: 'l' });
  d.flow('TQ', 'gq');
  d.flow('gq', 'mP3', 'Có');
  d.flow('gq', 'mQ', 'Không', { exit: 'r', enter: 'l' });
  d.flow('L0', 'mP3');
  d.flow('mP3', 'P3');
  d.flow('P3', 'g4');
  d.flow('g4', 'mQ', 'Không có nơi xử lý phù hợp');
  d.flow('g4', 'mH', 'Hãng\nđã nhận', { exit: 'r', enter: 'l' });
  d.flow('g4', 'P4', 'Bộ phận sửa chữa đã nhận', { exit: 'b', enter: 'l' });
  d.flow('mH', 'EBh');
  d.flow('EBh', 'CHg', '', { exit: 'r', enter: 'l' });
  d.flow('EBh', 'TMh', '', { exit: 'b', enter: 't' });
  d.flow('TMh', 'Th', '', { exit: 'l', enter: 'r' });
  d.flow('Th', 'mH', '', { exit: 't', enter: 'b' });
  d.flow('CHg', 'mA');
  d.flow('mQ', 'mA', '', { exit: 'r', enter: 't' });
  d.flow('mA', 'mB');
  d.flow('P4', 'mB', '', { exit: 'r', enter: 'b' });
  d.flow('mB', 'P5');
  d.flow('P5', 'g5');
  d.flow('g5', 'E_cs', 'Đã trả, thiết bị chưa sửa');
  d.flow('g5', 'E_ok', 'Đã trả sau\nkhi xử lý', { exit: 'r', enter: 'l' });
  d.flow('g5', 'g7', 'Chưa trả được thiết bị');
  d.flow('g7', 'E_60', 'Quá 60 ngày, đã nhắc và rà soát', { exit: 'r', enter: 'l' });
  d.flow('g7', 'E_nl', 'Không xác\nminh được', { exit: 'l', enter: 'r' });
  d.flow('g7', 'L1', 'Cần sửa tiếp');

  d.msg('KH', 'S', 'Yêu cầu bảo hành, sửa chữa', { labelSide: 'left' });
  d.msg('P1', 'KH', 'Tư vấn và các lựa chọn', { dx: -20, labelSide: 'left' });
  d.msg('KH', 'P1', 'Quyết định của khách', { dx: 20 });
  d.msg('KH', 'P2', 'Thiết bị', { dx: -20, labelSide: 'left' });
  d.msg('P2', 'KH', 'Phiếu, mã phiếu, máy dùng tạm nếu có', { dx: 20 });
  d.msg('P3', 'KH', 'Thông báo nơi xử lý đã nhận máy');
  d.msg('P3', 'HANG', 'Thiết bị và hồ sơ yêu cầu');
  d.msg('HANG', 'CHg', 'Kết quả và thiết bị');
  d.msg('P4', 'KH', 'Phương án, chi phí, ngày dự kiến', { dx: -20, labelSide: 'left' });
  d.msg('KH', 'P4', 'Đồng ý hoặc từ chối', { dx: 20 });
  d.msg('P5', 'KH', 'Thông báo, lời nhắc, thiết bị', { dx: -20, labelSide: 'left' });
  d.msg('KH', 'P5', 'Phiếu hoặc mã phiếu, phí nếu có', { dx: 20 });

  d.note('Theo dõi trạng thái xuyên suốt: một mã hồ sơ từ phiếu tiếp nhận đi suốt quy trình ở cả cửa hàng và bộ phận sửa chữa; trạng thái đổi theo chính thao tác nghiệp vụ; khách được báo ở các mốc chính; thời điểm mỗi mốc được lưu lại. Cần khảo sát: hệ thống hiện tại đã làm được phần nào.', { at: { x: d.o.x0, y: 112 }, w: 1000, kind: 'survey' });
  d.note('Thay đổi chính: khách khai báo trước; nơi xử lý được chọn ngay tại quầy theo bảng quy tắc; thỏa thuận trước mức chi phí.', { attach: 'P1', pos: 'below', kind: 'change', w: 170, dx: -55 });
  d.note('Thay đổi chính: khách chuẩn bị máy từ trước; mẫu tiếp nhận thống nhất; phiếu có mã điện tử.', { attach: 'P2', pos: 'below', kind: 'change', w: 150, dx: -10, dy: 30 });
  d.note('Chỉ xử lý nhanh các lỗi có trong danh mục, trong thời gian giới hạn. Lỗi ngoài danh mục thì chuyển đi ngay.', { attach: 'TQ', pos: 'above', kind: 'change', w: 215, dx: -40 });
  d.note('Điểm nối: luồng đi tiếp từ điểm nối cùng tên ở cuối sơ đồ, thay cho một đường nối dài. Thiết bị quay lại theo đường ưu tiên, không xếp hàng lại từ đầu.', { attach: 'L0', pos: 'below', kind: 'change', w: 215, dx: -120 });
  d.note('Thay đổi chính: hồ sơ đi trước thiết bị; chuyển theo lịch cố định; xác nhận ở cả hai đầu.', { attach: 'P3', pos: 'below', kind: 'change', w: 140, dx: 32, tx: 14 });
  d.note('Mới: máy đang ở hãng được rà soát theo kỳ, có người phụ trách. Cần doanh nghiệp quyết định: chu kỳ rà soát.', { attach: 'Th', pos: 'below', kind: 'decide', w: 215, dx: -30 });
  d.note('Hãng từ chối bảo hành: cửa hàng báo khách ngay, kèm lý do của hãng và báo giá sửa có phí trong hệ thống (sơ đồ chi tiết 5).', { attach: 'CHg', pos: 'below', kind: 'change', w: 150, dx: 32, dy: 20, tx: 10 });
  d.note('Thay đổi chính: báo giá có hạn phản hồi; linh kiện được kiểm tra khi chẩn đoán; kết quả được báo trước khi thiết bị về.', { attach: 'P4', pos: 'below', kind: 'change', w: 230, dx: 0, dy: -6 });
  d.note('Thay đổi chính: cửa hàng thử lại máy trước khi báo khách; nhắc theo mốc; có cách xác minh thay thế khi mất phiếu; có đường quay lại sửa.', { attach: 'P5', pos: 'above', kind: 'change', w: 150, dx: -170, corner: 'right', tx: -35 });
  d.note('Cần doanh nghiệp quyết định: mốc bắt đầu tính 60 ngày và số lần nhắc trước khi tháo gỡ.', { attach: 'E_60', pos: 'below', kind: 'decide', w: 170, dx: 10, dy: 10 });
  return d;
}
