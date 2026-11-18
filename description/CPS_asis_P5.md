# Mô tả nghiệp vụ As-Is: Quy trình con 5

Tên: Trả thiết bị và hoàn tất yêu cầu.

- Tệp sơ đồ: [`bpmn/CellphoneS_AsIs_P5.bpmn`](../bpmn/CellphoneS_AsIs_P5.bpmn)
- Ảnh: [`png/CellphoneS_AsIs_P5.png`](../png/CellphoneS_AsIs_P5.png)

![Sơ đồ chi tiết 5](../png/CellphoneS_AsIs_P5.png)

Đây là mô hình As-Is sơ bộ, dựng từ tài liệu công khai và hiểu biết của nhóm nghiên cứu. Đây không phải quy trình nội bộ chính thức của CellphoneS.

## Mục đích

Trả thiết bị cho khách, giải quyết các nghĩa vụ liên quan và kết thúc yêu cầu.

## Các bên tham gia

- Cửa hàng CellphoneS (nhân viên cửa hàng).
- Khách hàng.

## Điểm bắt đầu

Có kết quả xử lý từ bộ phận sửa chữa, từ hãng hoặc từ nhánh xử lý nhanh tại cửa hàng; hoặc thiết bị phải trả lại vì không xử lý được.

## Diễn biến

1. **Nhận kết quả và nhận lại thiết bị.**
2. **Đối chiếu kết quả, xác định thiết bị sẵn sàng trả.**
3. **Báo khách đến nhận thiết bị.** Nếu khách đang chờ tại cửa hàng, như ở nhánh xử lý nhanh, khách được trả máy ngay.
4. **Chờ một trong hai sự kiện:**
   - Khách đến nhận thiết bị: sang bước 5.
   - Hết 60 ngày hiệu lực của phiếu tiếp nhận: cửa hàng tháo gỡ linh kiện thiết bị để tái chế, quy trình con kết thúc.
5. **Kiểm tra phiếu tiếp nhận của khách.**
   - Khách có phiếu: đi tiếp.
   - Khách không có phiếu: cửa hàng không trả thiết bị, quy trình con kết thúc ở trạng thái chưa trả.
6. **Bàn giao thiết bị để khách kiểm tra, rồi nhận ý kiến của khách.**
   - Khách nhận thiết bị: đi tiếp.
   - Khách không nhận vì thiết bị còn lỗi: việc bàn giao chưa hoàn tất, quy trình con kết thúc.
7. **Thu phí sửa chữa**, nếu có phát sinh phí.
8. **Thu lại máy dùng tạm**, nếu khách có mượn.
9. **Hoàn tất yêu cầu.**
10. **Phân loại kết thúc** theo việc thiết bị đã được sửa hay chưa.

## Các điểm quyết định

| Câu hỏi | Các nhánh |
|---|---|
| Khách đến nhận, hay hết 60 ngày? | Khách đến: kiểm tra phiếu. Hết 60 ngày: tháo gỡ linh kiện. |
| Khách có phiếu tiếp nhận? | Có: bàn giao. Không: chưa trả thiết bị. |
| Khách nhận thiết bị? | Nhận: đi tiếp. Không, thiết bị còn lỗi: chưa hoàn tất bàn giao. |
| Có phát sinh phí? | Có: thu phí. Không: bỏ qua. |
| Khách có mượn máy dùng tạm? | Có: thu lại. Không: bỏ qua. |
| Thiết bị đã được sửa? | Đã sửa chữa, bảo hành hoặc thay thế. Thiết bị chưa sửa. |

Hạn 60 ngày là điều kiện thời gian duy nhất trong toàn bộ mô hình, vì đây là con số duy nhất có nguồn công khai.

## Các kết thúc

1. Đã trả thiết bị sau khi sửa chữa, bảo hành hoặc thay thế.
2. Đã trả thiết bị chưa sửa.
3. Thiết bị bị tháo gỡ linh kiện do quá 60 ngày.
4. Chưa trả thiết bị: khách không có phiếu.
5. Chưa hoàn tất bàn giao: khách không nhận thiết bị.

Hai kết thúc cuối được gộp thành "chưa hoàn tất bàn giao, chuyển xử lý ngoại lệ" ở sơ đồ tổng quan. Mô hình không đồng nhất "đã bàn giao" với "đã sửa chữa thành công".

## Trao đổi với khách hàng

| Khách gửi | Khách nhận |
|---|---|
| Khách đến cửa hàng | Thông báo thiết bị sẵn sàng |
| Phiếu tiếp nhận | Thiết bị và thông tin bảo hành |
| Ý kiến sau khi kiểm tra | |
| Thanh toán, nếu có phí | |
| Máy dùng tạm, nếu có mượn | |

## Chứng từ

- **Phiếu tiếp nhận:** được lập ở quy trình con 2, dùng làm căn cứ trả máy ở bước 5.

## Mức độ chắc chắn của thông tin

- **Có nguồn công khai:**
  - Phải có phiếu tiếp nhận mới được trả máy (Quy định tiếp nhận của CellphoneS).
  - Phiếu có giá trị lấy máy trong 60 ngày; sau đó thiết bị bị tháo gỡ linh kiện để tái chế (Quy định tiếp nhận của CellphoneS).
  - Cung cấp thông tin bảo hành khi bàn giao (Trang chủ Điện Thoại Vui).
  - Khách trả lại máy đã mượn sau khi nhận lại máy của mình (Chính sách bảo hành CellphoneS).
- **Cần khảo sát:**
  - Cách cửa hàng nhận lại thiết bị từ nơi xử lý.
  - Cách đối chiếu kết quả và xác định thiết bị sẵn sàng trả.
  - Ai báo khách, qua kênh nào, khi nào coi là đã báo.
  - Mốc bắt đầu tính 60 ngày.
  - Cách xử lý khi khách mất phiếu. Mô hình không giả định có thể thay phiếu bằng căn cước, mã OTP hay số điện thoại.
  - Nhân viên cửa hàng có kiểm tra máy cùng khách không.
  - Cách xử lý khi khách không nhận máy vì còn lỗi.
  - Nơi thu phí và cách thu.
  - Cách ghi nhận việc trả máy dùng tạm.
  - Thao tác đóng hồ sơ, lưu hồ sơ điện tử, ghi nhận thời gian xử lý.

## Khoảng thời gian cần đo

- Khoảng 9: từ khi sửa xong đến khi thiết bị sẵn sàng trả tại cửa hàng.
- Khoảng 10: từ khi thiết bị sẵn sàng đến khi khách được báo.
- Khoảng 11: từ khi khách được báo đến khi khách nhận máy.
