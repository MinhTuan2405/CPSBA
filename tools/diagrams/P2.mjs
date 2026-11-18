// Sơ đồ chi tiết 2: Nhận thiết bị và lập phiếu tiếp nhận
import { Diagram } from '../lib/engine.mjs';

export default function build() {
  const d = new Diagram({ id: 'P2', name: 'CellphoneS As-Is - Sơ đồ chi tiết 2', cols: 11 });
  d.header('SƠ ĐỒ CHI TIẾT 2: Nhận thiết bị và lập phiếu tiếp nhận');

  d.pool('KH', 'Khách hàng', { blackbox: true });
  d.pool('CPS', 'Hệ thống CellphoneS', {
    lanes: [{ id: 'CH', name: 'Cửa hàng CellphoneS', rows: 2, padTop: 120, padBottom: 110 }]
  });

  const L = 'CH';
  d.start('S', 'Khách đồng ý giao máy', { lane: L, col: 0, row: 0 });
  d.task('T1', 'Hướng dẫn khách thoát tài khoản và sao lưu dữ liệu', { lane: L, col: 1, row: 0 });
  d.catchEv('C1', 'Nhận phản hồi của khách', { lane: L, col: 2, row: 0, def: 'message' });
  d.xor('g1', 'Khách giao\nthiết bị?', { lane: L, col: 3, row: 0 });
  d.end('E_chua', 'Khách chưa giao máy', { lane: L, col: 3, row: 1, labelPos: 'right' });
  d.task('T2', 'Nhận thiết bị từ khách', { lane: L, col: 4, row: 0 });
  d.task('T3', 'Ghi nhận thông tin tiếp nhận', { lane: L, col: 5, row: 0 });
  d.task('T4', 'Lập phiếu tiếp nhận và giao cho khách', { lane: L, col: 6, row: 0 });
  d.xor('g2', 'Áp dụng hỗ trợ\nmáy dùng tạm?', { lane: L, col: 7, row: 0, labelPos: 'top' });
  d.task('T5', 'Giao máy dùng tạm cho khách', { lane: L, col: 8, row: 0 });
  d.xor('m2', '', { lane: L, col: 9, row: 0 });
  d.end('E_ok', 'Đã nhận thiết bị, khách có phiếu tiếp nhận', { lane: L, col: 10, row: 0 });

  d.flow('S', 'T1');
  d.flow('T1', 'C1');
  d.flow('C1', 'g1');
  d.flow('g1', 'E_chua', 'Chưa:\nkhách ra về');
  d.flow('g1', 'T2', 'Có', { exit: 'r', enter: 'l' });
  d.flow('T2', 'T3');
  d.flow('T3', 'T4');
  d.flow('T4', 'g2');
  d.flow('g2', 'T5', 'Có', { exit: 'r', enter: 'l' });
  d.flow('g2', 'm2', 'Không', { exit: 'b', enter: 'b', midY: d.n('g2').cy + 75 });
  d.flow('T5', 'm2');
  d.flow('m2', 'E_ok');

  d.msg('T1', 'KH', 'Hướng dẫn chuẩn bị thiết bị', { labelSide: 'left' });
  d.msg('KH', 'C1', 'Phản hồi của khách');
  d.msg('KH', 'T2', 'Thiết bị');
  d.msg('T4', 'KH', 'Phiếu tiếp nhận');
  d.msg('T5', 'KH', 'Máy dùng tạm');

  d.data('D_phieu', 'Phiếu tiếp nhận', { near: 'T4', pos: 'below', labelPos: 'right' });
  d.dataOut('T4', 'D_phieu');

  d.note('Đo thời gian 2: từ khi khách đồng ý giao máy đến khi có phiếu tiếp nhận.', { attach: 'S', pos: 'above', kind: 'time', w: 150, dx: -30 });
  d.note('Có nguồn (Quy định tiếp nhận của CellphoneS): khách thoát tài khoản cá nhân, tự sao lưu dữ liệu trước khi bàn giao; CellphoneS không chịu trách nhiệm về dữ liệu.', { attach: 'T1', pos: 'below', kind: 'source', w: 150, dx: -40 });
  d.note('Cần khảo sát: khi khách chưa chuẩn bị xong, khách hoàn tất tại quầy hay quay lại sau. Có thể là điểm phát sinh thời gian chờ.', { attach: 'C1', pos: 'below', kind: 'survey', w: 150, dx: -40, dy: 32 });
  d.note('Cần khảo sát: thời điểm được ghi nhận là đã nhận máy.', { attach: 'T2', pos: 'below', kind: 'survey', w: 140, dx: -5, dy: 40 });
  d.note('Cần khảo sát: các trường được ghi khi nhận máy; số lần phải bổ sung thông tin. Tham khảo, có nguồn (Hướng dẫn của CareS): họ tên, số điện thoại, email, mô tả lỗi.', { attach: 'T3', pos: 'below', kind: 'survey', w: 150, dx: -30 });
  d.note('Có nguồn (Quy định tiếp nhận của CellphoneS): phải có phiếu mới lấy được máy; phiếu có giá trị 60 ngày.', { attach: 'T4', pos: 'above', kind: 'source', w: 150, dx: -150, corner: 'right', tx: -25 });
  d.note('Nhóm nghiên cứu: lập phiếu cho mọi thiết bị, kể cả lỗi sửa nhanh. Cần khảo sát: phần mềm lập phiếu, các trường trên phiếu.', { attach: 'D_phieu', pos: 'below', kind: 'team', w: 200, dx: -10, dy: -4 });
  d.note('Có nguồn (Chính sách bảo hành CellphoneS): khách được hỗ trợ miễn phí một điện thoại khác trong thời gian đợi. Cần khảo sát: điều kiện, thời điểm giao, cách ghi nhận.', { attach: 'T5', pos: 'above', kind: 'survey', w: 210, dx: 35, tx: 15 });
  return d;
}
