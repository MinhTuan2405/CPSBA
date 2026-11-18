# DANH MỤC BƯỚC, NGUỒN VÀ NỘI DUNG CẦN KHẢO SÁT

Tài liệu đi kèm sáu sơ đồ BPMN As-Is của quy trình tiếp nhận và xử lý yêu cầu bảo hành, sửa chữa qua cửa hàng CellphoneS. Nội dung nghiệp vụ đầy đủ nằm ở `nghiep-vu.md`. Lập ngày 18/11/2026.

## 1. Các tệp sơ đồ

| Sơ đồ | Tệp BPMN (mở bằng Camunda Modeler hoặc bpmn.io) | Ảnh |
|---|---|---|
| Tổng quan | `bpmn/CellphoneS_AsIs_Level0.bpmn` | `svg/` và `png/CellphoneS_AsIs_Level0` |
| Chi tiết 1: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy | `bpmn/CellphoneS_AsIs_P1.bpmn` | `svg/` và `png/CellphoneS_AsIs_P1` |
| Chi tiết 2: Nhận thiết bị và lập phiếu tiếp nhận | `bpmn/CellphoneS_AsIs_P2.bpmn` | `svg/` và `png/CellphoneS_AsIs_P2` |
| Chi tiết 3: Chuyển thiết bị đến nơi xử lý | `bpmn/CellphoneS_AsIs_P3.bpmn` | `svg/` và `png/CellphoneS_AsIs_P3` |
| Chi tiết 4: Kiểm tra kỹ thuật và sửa chữa | `bpmn/CellphoneS_AsIs_P4.bpmn` | `svg/` và `png/CellphoneS_AsIs_P4` |
| Chi tiết 5: Trả thiết bị và hoàn tất yêu cầu | `bpmn/CellphoneS_AsIs_P5.bpmn` | `svg/` và `png/CellphoneS_AsIs_P5` |

## 2. Cách đọc sơ đồ

- **Ba khối:** Khách hàng; Hệ thống CellphoneS (gồm làn Cửa hàng CellphoneS và làn Bộ phận sửa chữa); Trung tâm bảo hành của hãng.
- **Khối Khách hàng và khối Trung tâm bảo hành của hãng** được vẽ dạng khối đóng: sơ đồ chỉ thể hiện những gì hai bên này trao đổi với hệ thống CellphoneS (đường nét đứt), không mô tả việc làm bên trong của họ.
- **Màu của ghi chú:**
  - Xanh lá: có nguồn công khai.
  - Cam: có nội dung cần khảo sát.
  - Tím: do nhóm nghiên cứu đưa ra, chưa có nguồn công khai.
  - Xanh dương: khoảng thời gian cần đo.
  - Xám: giải thích thêm.
- **Sự kiện chờ:** hình tròn viền kép có phong bì là lúc quy trình chờ nhận thông tin từ bên khác. Hình tròn viền kép có đồng hồ là hạn 60 ngày của phiếu tiếp nhận.

## 3. Danh mục các bước theo ba loại

### Sơ đồ tổng quan

| Bước | Loại | Ghi chú |
|---|---|---|
| Cấu trúc ba khối, Điện Thoại Vui và CareS thuộc hệ thống CellphoneS | Có nguồn | Chính sách bảo hành CellphoneS; Hướng dẫn của CareS |
| Xử lý nhanh lỗi tại cửa hàng | Nhóm nghiên cứu | Danh mục lỗi được xử lý tại chỗ cần khảo sát |
| Chờ nhận kết quả và thiết bị từ hãng | Cần khảo sát | Không có nguồn về quy trình bên trong của hãng |
| Kết thúc "tháo gỡ linh kiện để tái chế" sau 60 ngày | Có nguồn | Quy định tiếp nhận của CellphoneS |

### Sơ đồ chi tiết 1: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy

| Bước | Loại | Ghi chú |
|---|---|---|
| Khách nêu yêu cầu tại cửa hàng | Có nguồn | Chính sách bảo hành nêu việc khách đến cửa hàng để được tiếp nhận |
| Tiếp nhận yêu cầu và hỏi hiện tượng lỗi | Cần khảo sát | Cách ghi nhận yêu cầu |
| Tra cứu thông tin bảo hành ngay tại quầy | Nhóm nghiên cứu | Có nguồn về trang tra cứu bằng IMEI hoặc Seri; công cụ nhân viên dùng cần khảo sát |
| Xác định nhóm sản phẩm và quyền lợi bảo hành | Có nguồn | Bảng chính sách: máy mới, máy đã kích hoạt, máy cũ |
| Xác định hướng xử lý sơ bộ | Cần khảo sát | Quy tắc phân tuyến chưa công bố |
| Xét điều kiện đổi mới | Có nguồn | Trong 30 ngày, lỗi phần cứng từ nhà sản xuất; người kết luận cần khảo sát |
| Hướng dẫn khách sang quy trình đổi trả | Cần khảo sát | |
| Tư vấn hướng xử lý, khách quyết định | Nhóm nghiên cứu | Khách quyết định trước khi giao máy |

### Sơ đồ chi tiết 2: Nhận thiết bị và lập phiếu tiếp nhận

| Bước | Loại | Ghi chú |
|---|---|---|
| Hướng dẫn khách thoát tài khoản và sao lưu dữ liệu | Có nguồn | Quy định tiếp nhận của CellphoneS |
| Chờ khách chuẩn bị xong thiết bị | Cần khảo sát | Khách hoàn tất tại quầy hay quay lại sau |
| Nhận thiết bị từ khách | Cần khảo sát | Thời điểm được ghi nhận là đã nhận máy |
| Ghi nhận thông tin tiếp nhận | Cần khảo sát | Các trường được ghi; CareS có công bố bốn trường để tham khảo |
| Lập phiếu tiếp nhận và giao cho khách | Có nguồn | Phải có phiếu mới lấy được máy; phiếu có giá trị 60 ngày |
| Lập phiếu cho cả lỗi sửa nhanh | Nhóm nghiên cứu | |
| Giao máy dùng tạm | Có nguồn | Chính sách có nêu; điều kiện và thời điểm giao cần khảo sát |

### Sơ đồ chi tiết 3: Chuyển thiết bị đến nơi xử lý

| Bước | Loại | Ghi chú |
|---|---|---|
| Xác định nơi xử lý cụ thể | Cần khảo sát | Có nguồn về nơi bảo hành theo nhóm sản phẩm; người chỉ định cần khảo sát |
| Chuẩn bị hồ sơ và thông tin yêu cầu | Cần khảo sát | |
| Bàn giao thiết bị cho bộ phận sửa chữa | Cần khảo sát | Cùng địa điểm hay phải vận chuyển |
| Gửi thiết bị đến hãng | Có nguồn | Chính sách nêu cửa hàng tiếp nhận để gửi bảo hành chính hãng; cách gửi cần khảo sát |
| Nơi xử lý phản hồi việc tiếp nhận | Cần khảo sát | Hai mốc "đã giao" và "đã nhận" có được ghi nhận không |
| Bổ sung thông tin; xác định lại nơi xử lý; không còn nơi phù hợp | Cần khảo sát | Toàn bộ là giả thuyết |

### Sơ đồ chi tiết 4: Kiểm tra kỹ thuật và sửa chữa

| Bước | Loại | Ghi chú |
|---|---|---|
| Kiểm tra tình trạng thiết bị | Có nguồn | Trang chủ Điện Thoại Vui; Hướng dẫn của CareS |
| Chẩn đoán nguyên nhân lỗi | Có nguồn | Hướng dẫn của CareS, chỉ áp dụng cho CareS |
| Xác định phương án xử lý | Có nguồn | CareS công bố việc thông tin chi phí, điều kiện bảo hành, thời gian |
| Báo phương án và chi phí, chờ khách đồng ý | Có nguồn | Công bố cho khách đến trực tiếp; với máy nhận qua cửa hàng thì người liên hệ và kênh liên hệ cần khảo sát |
| Khách từ chối, trả thiết bị chưa sửa | Cần khảo sát | Không có nguồn về hậu quả khi từ chối |
| Chờ linh kiện | Cần khảo sát | Chưa có nguồn |
| Sửa chữa hoặc thay thế linh kiện | Có nguồn | Trang chủ Điện Thoại Vui; Hướng dẫn của CareS |
| Kiểm tra thiết bị sau sửa chữa | Có nguồn | Trang chủ Điện Thoại Vui; Hướng dẫn của CareS |
| Xử lý lại khi kiểm tra chưa đạt | Cần khảo sát | |
| Ghi nhận kết quả, chuyển về cửa hàng | Cần khảo sát | |

### Sơ đồ chi tiết 5: Trả thiết bị và hoàn tất yêu cầu

| Bước | Loại | Ghi chú |
|---|---|---|
| Nhận kết quả và nhận lại thiết bị | Cần khảo sát | |
| Đối chiếu kết quả, xác định thiết bị sẵn sàng trả | Cần khảo sát | |
| Báo khách đến nhận thiết bị | Cần khảo sát | Người báo, kênh báo |
| Hết 60 ngày, tháo gỡ linh kiện để tái chế | Có nguồn | Quy định tiếp nhận của CellphoneS; mốc bắt đầu tính cần khảo sát |
| Kiểm tra phiếu tiếp nhận; không có phiếu thì không trả máy | Có nguồn | Quy định tiếp nhận của CellphoneS; cách xử lý khi mất phiếu cần khảo sát |
| Bàn giao thiết bị, cung cấp thông tin bảo hành | Có nguồn | Trang chủ Điện Thoại Vui |
| Nhân viên kiểm tra máy cùng khách | Cần khảo sát | CareS chỉ khuyên khách tự kiểm tra tại trung tâm |
| Khách không nhận thiết bị | Cần khảo sát | |
| Thu phí sửa chữa | Cần khảo sát | Nơi thu, cách thu |
| Thu lại máy dùng tạm | Có nguồn | Chính sách bảo hành CellphoneS |
| Hoàn tất yêu cầu | Cần khảo sát | Thao tác đóng hồ sơ |

## 4. Bảng đối chiếu các bước quan trọng với nguồn

| Nội dung trong sơ đồ | Trang công khai | Trang đó ghi gì |
|---|---|---|
| Khách đến cửa hàng để gửi bảo hành | Chính sách bảo hành CellphoneS | Khách có thể tới trung tâm bảo hành chính hãng hoặc trực tiếp tới cửa hàng CellphoneS để được tiếp nhận gửi máy bảo hành chính hãng |
| Nhóm sản phẩm và nơi bảo hành | Chính sách bảo hành CellphoneS | Máy mới: trung tâm bảo hành chính hãng. Máy đã kích hoạt: hãng và CellphoneS/ Điện Thoại Vui. Máy cũ: 6 tháng tại CellphoneS/ Điện Thoại Vui |
| Đổi mới | Chính sách bảo hành CellphoneS | Đổi mới 30 ngày miễn phí khi lỗi phần cứng từ nhà sản xuất |
| Máy dùng tạm | Chính sách bảo hành CellphoneS | Khách được hỗ trợ miễn phí một điện thoại khác trong thời gian đợi, và trả lại sau khi nhận máy của mình |
| Thoát tài khoản, sao lưu | Quy định tiếp nhận của CellphoneS | Khách thoát các tài khoản cá nhân, tự sao lưu dữ liệu trước khi bàn giao cho nhân viên kỹ thuật; CellphoneS không chịu trách nhiệm về dữ liệu |
| Phiếu tiếp nhận | Quy định tiếp nhận của CellphoneS | Mang theo phiếu khi lấy máy; không trả máy nếu không có phiếu |
| Hạn 60 ngày | Quy định tiếp nhận của CellphoneS | Phiếu có giá trị lấy máy trong 60 ngày; sau đó tháo gỡ linh kiện máy để tái chế |
| Tra cứu bảo hành | Trang kiểm tra thời hạn bảo hành CellphoneS | Tra cứu bằng IMEI/Seri; số tổng đài 1800.2097 |
| Tra cứu tình trạng sửa chữa | Trang tra cứu Điện Thoại Vui | Hướng khách sang Smember; đăng nhập bằng số điện thoại và mã đơn hàng trên phiếu tiếp nhận |
| Kiểm tra, báo giá, sửa sau khi khách đồng ý, kiểm tra lại, bàn giao | Trang chủ Điện Thoại Vui | "Kiểm tra thiết bị, báo giá minh bạch và sửa chữa sau khi bạn đồng ý"; "Kiểm tra hoàn thiện, bàn giao thiết bị và cung cấp thông tin bảo hành" |
| Năm bước xử lý thiết bị Apple | Hướng dẫn của CareS | Tiếp nhận; kiểm tra ngoại quan và chẩn đoán bằng phần mềm; tư vấn phương án, chi phí, thời gian; sửa sau khi khách đồng ý; kiểm tra sau sửa và bàn giao |
| CareS thuộc hệ thống CellphoneS | Hướng dẫn của CareS | CareS là trung tâm bảo hành ủy quyền Apple thuộc hệ thống bán lẻ ủy quyền Apple CellphoneS |

## 5. Danh sách thông tin cần khảo sát

**Tại quầy**

1. Nhân viên kiểm tra bảo hành trước hay sau khi nhận máy.
2. Nhân viên dùng công cụ nào để tra cứu bảo hành.
3. Cách xử lý khi không tìm thấy thông tin sản phẩm.
4. Quy tắc chọn hướng xử lý giữa cửa hàng, bộ phận sửa chữa, hãng và đổi mới.
5. Ai kết luận lỗi thuộc nhà sản xuất khi xét đổi mới.
6. Danh mục lỗi cửa hàng tự xử lý nhanh, khoản phí và người thực hiện.

**Khi nhận máy**

7. Cách xử lý khi khách chưa thoát tài khoản hoặc chưa sao lưu.
8. Các trường thông tin được ghi khi nhận máy.
9. Phần mềm lập phiếu, các trường trên phiếu, phiếu có liên kết với hệ thống tra cứu không.
10. Điều kiện được mượn máy dùng tạm, thời điểm giao và cách ghi nhận.

**Khi chuyển máy**

11. Bộ phận sửa chữa làm việc tại cửa hàng hay ở địa điểm khác.
12. Ai chỉ định nơi xử lý, ai phụ trách chuyển máy, bàn giao được xác nhận bằng hình thức nào.
13. Thời điểm "cửa hàng đã giao" và "nơi xử lý đã nhận" có được ghi nhận trên hệ thống không.
14. Cách xử lý khi nơi nhận yêu cầu bổ sung thông tin hoặc không tiếp nhận.
15. Cách gửi máy đến hãng và cách nhận lại; xử lý khi hãng từ chối bảo hành.

**Khi sửa chữa**

16. Ai liên hệ khách để báo phương án và chi phí, qua kênh nào, lưu xác nhận ra sao.
17. Hậu quả khi khách từ chối, ví dụ phí kiểm tra.
18. Có phải chờ linh kiện không và chờ bao lâu.
19. Lỗi phức tạp có phải chuyển lên trung tâm sửa chữa của Apple không.
20. Cách xử lý khi kiểm tra sau sửa chưa đạt.
21. Cách chuyển kết quả và thiết bị về cửa hàng.

**Khi trả máy**

22. Ai báo khách đến nhận, qua kênh nào, khi nào coi là đã báo.
23. Mốc bắt đầu tính 60 ngày của phiếu tiếp nhận.
24. Cách xử lý khi khách mất phiếu.
25. Nhân viên có kiểm tra máy cùng khách không.
26. Cách xử lý khi khách không nhận máy vì còn lỗi.
27. Nơi thu phí và cách thu.
28. Thao tác đóng hồ sơ và lưu hồ sơ.

**Theo dõi trạng thái**

29. Ai cập nhật trạng thái, vào lúc nào, trên hệ thống nào.
30. Cửa hàng và bộ phận sửa chữa có thấy cùng một trạng thái không.
31. Khách được thông báo hay phải tự tra cứu.

**Số liệu cần đo** (11 khoảng thời gian, được đánh dấu màu xanh dương trên các sơ đồ chi tiết)

1. Từ khi khách nêu yêu cầu tại quầy đến khi có hướng xử lý sơ bộ.
2. Từ khi khách đồng ý giao máy đến khi có phiếu tiếp nhận.
3. Từ khi có phiếu tiếp nhận đến khi cửa hàng giao thiết bị đi.
4. Từ khi cửa hàng giao thiết bị đi đến khi nơi xử lý nhận được.
5. Từ khi nơi xử lý nhận thiết bị đến khi chẩn đoán xong.
6. Từ khi báo phương án đến khi khách phản hồi.
7. Thời gian chờ linh kiện, nếu phát sinh.
8. Thời gian sửa chữa.
9. Từ khi sửa xong đến khi thiết bị sẵn sàng trả tại cửa hàng.
10. Từ khi thiết bị sẵn sàng đến khi khách được báo.
11. Từ khi khách được báo đến khi khách nhận máy.

## 6. Kết quả kiểm tra kỹ thuật

Các kiểm tra sau đã được chạy trên cả sáu tệp `.bpmn` ngày 18/11/2026 và đều đạt:

| Kiểm tra | Công cụ | Kết quả |
|---|---|---|
| Đọc lại tệp XML | bpmn-moddle 10.3.1 | Không có cảnh báo |
| Đối chiếu với lược đồ XSD BPMN 2.0 của OMG (bộ tệp 20100501) | xmllint-wasm 5.3.0 | Cả sáu tệp hợp lệ |
| Mở tệp và vẽ sơ đồ | bpmn-js 18.33.0, thư viện của bpmn.io | Mở được, không có cảnh báo khi nhập |
| Bộ quy tắc mô hình hóa bpmnlint:recommended | bpmnlint 12.1.1 | Không có lỗi ở năm sơ đồ chi tiết; sơ đồ tổng quan có 10 ghi nhận, giải thích bên dưới |
| Kiểm tra cấu trúc theo đề bài | Tập lệnh `tools/check.mjs` | Đạt |

Kiểm tra cấu trúc gồm:

- Không có Sequence Flow đi qua ranh giới pool.
- Message Flow chỉ nối hai participant khác nhau và không nối vào gateway.
- Mọi nhánh của Exclusive Gateway đều có điều kiện, không trùng nhau.
- Không có gateway vừa gộp vừa rẽ nhánh.
- Mọi phần tử đều đi tới được từ điểm bắt đầu và đều dẫn tới một điểm kết thúc, nên không có luồng kẹt hay vòng lặp vô hạn.
- Không có Task mô tả trạng thái chờ; không dùng User Task, Service Task hay Parallel Gateway.
- Timer duy nhất là hạn 60 ngày của phiếu tiếp nhận.
- Mọi phần tử đều có hình vẽ trong tệp.

**Giới hạn của việc kiểm tra:**

- Mười ghi nhận của bpmnlint ở sơ đồ tổng quan đều cùng một loại: năm quy trình con thu gọn không có điểm bắt đầu và kết thúc bên trong. Đây là chủ ý, vì nội dung của chúng nằm ở năm tệp chi tiết riêng. Hệ quả là khi bấm vào quy trình con trong Camunda Modeler sẽ không mở ra được sơ đồ chi tiết; phải mở tệp chi tiết tương ứng.
- Tệp chưa được mở thử bằng chính ứng dụng Camunda Modeler. Việc mở thử được làm bằng bpmn-js, là thư viện vẽ sơ đồ mà Camunda Modeler và bpmn.io dùng.
- Lược đồ XSD dùng để đối chiếu là bộ BPMN 2.0 do OMG công bố. Việc đối chiếu từng điều khoản trong văn bản tiêu chuẩn 2.0.2 chưa được làm.
- Sơ đồ tổng quan có ba điểm đường nét đứt (trao đổi với khách hàng và với hãng) cắt qua đường luồng chính. Không đường nào đi xuyên qua một phần tử.
- Các kiểm tra trên xác nhận tệp đúng ký pháp và logic luồng. Chúng không xác nhận nội dung nghiệp vụ đúng với thực tế tại CellphoneS; phần đó phụ thuộc vào khảo sát.

## 7. Cách dựng lại sơ đồ

Sáu tệp `.bpmn` được sinh từ các tệp mô tả trong `tools/diagrams/`. Sau khi sửa mô tả, chạy trong thư mục `tools`:

```
node build.mjs
node check.mjs
node render.mjs
```

Cũng có thể sửa trực tiếp tệp `.bpmn` bằng Camunda Modeler. Khi đó không chạy lại `build.mjs`, vì lệnh này ghi đè tệp `.bpmn`.
