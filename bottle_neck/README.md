# Điểm nghẽn trong quy trình As-Is và đề xuất cách giải quyết

Quy trình: Tiếp nhận và xử lý yêu cầu bảo hành, sửa chữa thiết bị qua cửa hàng CellphoneS.

Thư mục này đọc lại sáu sơ đồ As-Is (thư mục `bpmn/`, mô tả ở `description/` và `nghiep-vu.md`) để chỉ ra những chỗ quy trình có thể bị nghẽn, và đề xuất cách giải quyết cho từng chỗ. Lập ngày 18/11/2026.

## Điều cần biết trước khi đọc

Mô hình As-Is được dựng từ tài liệu công khai và hiểu biết của nhóm nghiên cứu. Nhóm chưa có số liệu khảo sát: chưa phỏng vấn nhân viên, chưa có phiếu tiếp nhận thật, chưa có thời gian xử lý thật. Bản mô tả nghiệp vụ cũng ghi rõ là chưa kết luận khâu nào là điểm nghẽn.

Vì vậy:

- Mọi điểm nghẽn trong thư mục này là **điểm nghẽn tiềm ẩn**, tức là giả thuyết được suy ra từ cấu trúc của sơ đồ. Tài liệu không khẳng định CellphoneS đang gặp các vấn đề này.
- Tài liệu không đưa ra con số về thời gian chờ, tỷ lệ lỗi hay số lượng hồ sơ. Con số duy nhất có nguồn là hạn 60 ngày của phiếu tiếp nhận.
- Mỗi điểm nghẽn đều kèm cách kiểm chứng. Chỉ sau khi đo và khảo sát mới biết điểm nào là điểm nghẽn thật.
- Mỗi đề xuất là một hướng giải quyết cho mô hình To-Be, và chỉ nên áp dụng khi điểm nghẽn tương ứng đã được xác nhận.

## Các tệp trong thư mục

| Tệp | Sơ đồ As-Is tương ứng | Các điểm nghẽn được phân tích |
|---|---|---|
| [CPS_bottleneck_Level0](CPS_bottleneck_Level0.md) | Sơ đồ tổng quan | Thiết bị qua nhiều lần giao nhận; chờ trung tâm bảo hành của hãng; theo dõi trạng thái; nhân viên cửa hàng đảm nhận hầu hết các bước; xử lý nhanh không thành |
| [CPS_bottleneck_P1](CPS_bottleneck_P1.md) | Sơ đồ chi tiết 1: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy | Phân loại sơ bộ dẫn đến làm lại; khách xếp hàng tại quầy; tra cứu không ra thông tin; xét đổi mới |
| [CPS_bottleneck_P2](CPS_bottleneck_P2.md) | Sơ đồ chi tiết 2: Nhận thiết bị và lập phiếu tiếp nhận | Chờ khách thoát tài khoản và sao lưu; thông tin tiếp nhận thiếu; phiếu tiếp nhận là căn cứ duy nhất để lấy máy |
| [CPS_bottleneck_P3](CPS_bottleneck_P3.md) | Sơ đồ chi tiết 3: Chuyển thiết bị đến nơi xử lý | Thiết bị nằm chờ trước khi chuyển; khoảng trống giữa giao và nhận; thiết bị bị trả lại hoặc đi vòng; gửi hãng |
| [CPS_bottleneck_P4](CPS_bottleneck_P4.md) | Sơ đồ chi tiết 4: Kiểm tra kỹ thuật và sửa chữa | Chờ khách đồng ý phương án và chi phí; chờ linh kiện; chờ đến lượt chẩn đoán; sửa lại; sửa xong nhưng chưa về cửa hàng |
| [CPS_bottleneck_P5](CPS_bottleneck_P5.md) | Sơ đồ chi tiết 5: Trả thiết bị và hoàn tất yêu cầu | Khách chưa được báo; khách chậm đến nhận; mất phiếu tiếp nhận; khách không nhận máy vì còn lỗi |

## Thế nào là điểm nghẽn trong tài liệu này

Điểm nghẽn là chỗ mà yêu cầu hoặc thiết bị phải dừng lại, dồn lại hoặc đi lại đường cũ, làm cho thời gian từ lúc khách giao máy đến lúc khách nhận lại máy bị kéo dài. Trên sơ đồ có bốn dấu hiệu để nhận ra:

1. **Quy trình dừng lại chờ một bên khác.** Trên sơ đồ là các hình tròn viền kép: chờ khách quyết định, chờ khách chuẩn bị máy, chờ khách đồng ý báo giá, chờ linh kiện, chờ hãng, chờ khách đến nhận.
2. **Thiết bị được chuyển từ nơi này sang nơi khác.** Mỗi lần giao nhận là một lần thiết bị có thể nằm chờ mà không ai xử lý.
3. **Đường quay lại.** Việc đã làm phải làm lại, ví dụ xác định lại nơi xử lý, hoặc sửa lại sau khi kiểm tra chưa đạt.
4. **Lối cụt.** Yêu cầu kết thúc ở trạng thái "chuyển xử lý ngoại lệ" hoặc "khách chưa giao máy" mà chưa có bước tiếp theo.

Một công việc mất nhiều thời gian để làm, ví dụ sửa một lỗi khó, chưa chắc là điểm nghẽn. Tài liệu này quan tâm trước hết đến thời gian thiết bị nằm chờ, vì đó là phần có thể cắt giảm mà không ảnh hưởng đến chất lượng sửa chữa.

## Nhìn nhanh: thiết bị chờ ở đâu

Bảng sau đi theo đường của một thiết bị phải chuyển đi sửa, và liệt kê những chỗ thiết bị hoặc yêu cầu dừng lại chờ.

| Chặng | Chờ điều gì | Phụ thuộc vào ai | Mô hình có giới hạn thời gian không |
|---|---|---|---|
| Tại quầy | Đến lượt được phục vụ | Nhân viên cửa hàng | Không |
| Tại quầy | Khách quyết định có giao máy không | Khách hàng | Không |
| Khi nhận máy | Khách thoát tài khoản và sao lưu dữ liệu | Khách hàng | Không |
| Trước khi chuyển đi | Cửa hàng chuẩn bị hồ sơ và giao thiết bị đi | Cửa hàng | Không |
| Trên đường đi | Nơi xử lý nhận thiết bị | Cửa hàng và nơi xử lý | Không |
| Tại hãng | Hãng trả kết quả và thiết bị | Trung tâm bảo hành của hãng | Không |
| Tại bộ phận sửa chữa | Đến lượt được kiểm tra, chẩn đoán | Kỹ thuật viên | Không |
| Tại bộ phận sửa chữa | Khách đồng ý phương án và chi phí | Khách hàng | Không |
| Tại bộ phận sửa chữa | Linh kiện về | Nguồn cung linh kiện | Không |
| Trên đường về | Thiết bị được chuyển về và cửa hàng nhận lại | Bộ phận sửa chữa và cửa hàng | Không |
| Tại cửa hàng | Cửa hàng báo khách đến nhận | Cửa hàng | Không |
| Tại cửa hàng | Khách đến nhận máy | Khách hàng | Có, 60 ngày |

Trong các chỗ chờ trên, chỉ chỗ cuối cùng có giới hạn thời gian, và giới hạn đó là 60 ngày. Các chỗ còn lại, mô hình chưa có căn cứ để nói thiết bị được phép chờ bao lâu và ai phải làm gì khi chờ quá lâu.

## Cách đọc mỗi điểm nghẽn

Mỗi điểm nghẽn trong sáu tệp được trình bày theo cùng một thứ tự:

- **Vị trí trên sơ đồ:** tên các ô, điểm quyết định hoặc sự kiện chờ liên quan, viết đúng như trên sơ đồ.
- **Vì sao có thể gây nghẽn:** lập luận từ cấu trúc sơ đồ.
- **Hậu quả:** ai bị ảnh hưởng và ảnh hưởng thế nào.
- **Căn cứ:** phần nào của lập luận có nguồn, phần nào còn là giả thuyết.
- **Cách kiểm chứng:** cần đo khoảng thời gian nào, cần hỏi điều gì khi khảo sát.
- **Đề xuất cách giải quyết.**
- **Lưu ý khi áp dụng:** điều kiện, cái giá phải trả hoặc rủi ro của đề xuất.

Phần căn cứ dùng lại ba loại thông tin của mô hình As-Is, và thêm một loại thứ tư:

- **Có nguồn:** một trang web công khai có ghi nội dung này.
- **Nhóm nghiên cứu:** do nhóm nghiên cứu đưa ra từ hiểu biết thực tế, chưa có trang công khai xác nhận.
- **Cần khảo sát:** chưa có căn cứ.
- **Suy luận từ sơ đồ:** nhận định của bản phân tích này, rút ra từ cách các bước nối với nhau trên sơ đồ. Loại này luôn cần được kiểm chứng.

Mỗi điểm nghẽn có một **mức ưu tiên kiểm chứng**. Đây là xếp hạng định tính của bản phân tích, không phải kết quả đo:

- **Cao:** thiết bị hoặc yêu cầu phải dừng lại chờ một bên khác, khoảng chờ không có giới hạn trong mô hình, và phần lớn yêu cầu đi qua nhánh đó đều gặp.
- **Trung bình:** chỉ một phần yêu cầu gặp, hoặc khoảng chờ thường ngắn nhưng khi xảy ra thì hậu quả nặng, ví dụ phải làm lại hoặc khách phải đến thêm một lần.
- **Thấp:** ít ảnh hưởng đến tổng thời gian, nhưng nên theo dõi.

## Bảng tổng hợp

### Ưu tiên kiểm chứng cao

| Điểm nghẽn tiềm ẩn | Nằm ở | Đề xuất chính |
|---|---|---|
| Thiết bị phải qua nhiều lần giao nhận vì cửa hàng là trạm trung chuyển | [Sơ đồ tổng quan](CPS_bottleneck_Level0.md) | Mở rộng danh mục lỗi cửa hàng tự xử lý; cho khách lựa chọn mang máy thẳng đến nơi sửa khi thuận tiện |
| Chờ trung tâm bảo hành của hãng mà không có giới hạn thời gian và không có thông tin | [Sơ đồ tổng quan](CPS_bottleneck_Level0.md) | Nói rõ hai cách gửi bảo hành cho khách ngay tại quầy; lưu mã theo dõi của hãng; có một người phụ trách rà soát các máy đang ở hãng |
| Phân loại tại quầy chỉ là sơ bộ, nhưng tuyến xử lý được chọn theo phân loại đó | [Tại quầy](CPS_bottleneck_P1.md) | Bảng quy tắc phân tuyến; kiểm tra ngoại quan tại quầy; nói trước với khách về khả năng phát sinh chi phí |
| Chờ khách thoát tài khoản và sao lưu dữ liệu | [Nhận thiết bị](CPS_bottleneck_P2.md) | Báo khách chuẩn bị từ trước khi đến; hướng dẫn sớm hơn; có chỗ tự sao lưu tách khỏi quầy |
| Thiết bị nằm chờ tại cửa hàng trước khi được chuyển đi | [Chuyển thiết bị](CPS_bottleneck_P3.md) | Lịch chuyển cố định có giờ chốt; mỗi ca có người phụ trách giao nhận |
| Khoảng trống giữa lúc cửa hàng giao và lúc nơi xử lý nhận | [Chuyển thiết bị](CPS_bottleneck_P3.md) | Xác nhận ở cả hai đầu; rà soát hằng ngày các máy đã giao nhưng chưa có xác nhận nhận |
| Gửi hãng: chờ bên ngoài phản hồi việc tiếp nhận | [Chuyển thiết bị](CPS_bottleneck_P3.md) | Danh sách kiểm hồ sơ theo từng hãng; lưu mã tiếp nhận của hãng |
| Chờ khách phản hồi phương án và chi phí | [Kiểm tra kỹ thuật và sửa chữa](CPS_bottleneck_P4.md) | Thỏa thuận trước mức chi phí ngay tại quầy; báo giá qua kênh khách trả lời được ngay; có hạn phản hồi và có nhắc |
| Chờ linh kiện | [Kiểm tra kỹ thuật và sửa chữa](CPS_bottleneck_P4.md) | Kiểm tra linh kiện ngay khi chẩn đoán; đưa thời gian chờ linh kiện vào báo giá |
| Sửa xong nhưng kết quả và thiết bị chưa về đến cửa hàng | [Kiểm tra kỹ thuật và sửa chữa](CPS_bottleneck_P4.md) | Báo kết quả đi trước thiết bị; chuyển về theo lịch cố định |
| Thiết bị đã sẵn sàng nhưng khách chưa được báo | [Trả thiết bị](CPS_bottleneck_P5.md) | Báo ngay khi thiết bị sẵn sàng, có ghi nhận là đã báo thành công, có nhắc lại |

### Ưu tiên kiểm chứng trung bình

| Điểm nghẽn tiềm ẩn | Nằm ở | Đề xuất chính |
|---|---|---|
| Trạng thái của yêu cầu chưa rõ ai cập nhật, khách có thể phải tự hỏi | [Sơ đồ tổng quan](CPS_bottleneck_Level0.md) | Một mã hồ sơ đi suốt quy trình; danh mục trạng thái dùng chung; chủ động báo khách ở các mốc chính |
| Nhân viên cửa hàng đảm nhận hầu hết các bước, việc không có khách đứng chờ dễ bị dồn lại | [Sơ đồ tổng quan](CPS_bottleneck_Level0.md) | Giao rõ người và khung giờ cho việc giao nhận máy và báo khách |
| Khách xếp hàng chờ tại quầy | [Tại quầy](CPS_bottleneck_P1.md) | Cho khách khai báo và đặt lịch trước; kết quả tra cứu hiện luôn quyền lợi và nơi bảo hành |
| Tra cứu không ra thông tin bảo hành thì chưa có cách xử lý | [Tại quầy](CPS_bottleneck_P1.md) | Quy định sẵn các cách tra cứu thay thế và người quyết định |
| Xét đổi mới cần kết luận kỹ thuật, nhưng tại quầy chưa rõ ai kết luận | [Tại quầy](CPS_bottleneck_P1.md) | Chỉ định người kết luận; có đường kiểm tra ưu tiên cho trường hợp chưa kết luận được ngay |
| Thông tin tiếp nhận thiếu hoặc phải nhập lại | [Nhận thiết bị](CPS_bottleneck_P2.md) | Mẫu tiếp nhận có trường bắt buộc do cửa hàng và bộ phận sửa chữa cùng thống nhất |
| Phiếu tiếp nhận là căn cứ duy nhất để lấy máy | [Nhận thiết bị](CPS_bottleneck_P2.md) | Gửi mã phiếu cho khách qua tin nhắn hoặc tài khoản ngay khi lập phiếu |
| Nơi xử lý yêu cầu bổ sung thông tin hoặc không tiếp nhận | [Chuyển thiết bị](CPS_bottleneck_P3.md) | Gửi hồ sơ đi trước, nơi xử lý xác nhận rồi mới chuyển thiết bị |
| Thiết bị chờ đến lượt kiểm tra và chẩn đoán | [Kiểm tra kỹ thuật và sửa chữa](CPS_bottleneck_P4.md) | Tách hàng chờ lỗi đơn giản và lỗi phức tạp; quy tắc thứ tự xử lý rõ ràng |
| Sửa lại khi kiểm tra sau sửa chữa chưa đạt | [Kiểm tra kỹ thuật và sửa chữa](CPS_bottleneck_P4.md) | Giới hạn số lần sửa lại; ghi lý do chưa đạt |
| Khách chậm đến nhận, thiết bị tồn tại cửa hàng đến 60 ngày | [Trả thiết bị](CPS_bottleneck_P5.md) | Nhắc theo mốc; ghi rõ ngày hết hạn; rà soát trước khi tháo gỡ linh kiện |
| Khách mất phiếu tiếp nhận thì không có lối đi tiếp | [Trả thiết bị](CPS_bottleneck_P5.md) | Quy trình xác minh thay thế có ghi nhận và có người duyệt |
| Khách không nhận máy vì còn lỗi, chưa có đường quay lại sửa | [Trả thiết bị](CPS_bottleneck_P5.md) | Cửa hàng thử lại lỗi ban đầu trước khi báo khách; có đường sửa lại được ưu tiên |

### Ưu tiên kiểm chứng thấp

Bảng dưới đây chỉ nêu các điểm đáng chú ý nhất. Danh sách đầy đủ nằm ở mục "Điểm cần theo dõi thêm" cuối mỗi tệp.

| Điểm nghẽn tiềm ẩn | Nằm ở | Đề xuất chính |
|---|---|---|
| Xử lý nhanh tại cửa hàng không thành rồi mới chuyển đi | [Sơ đồ tổng quan](CPS_bottleneck_Level0.md) | Danh mục lỗi được xử lý nhanh; giới hạn thời gian thử |
| Thủ tục đầy đủ áp dụng cả cho lỗi sửa nhanh | [Nhận thiết bị](CPS_bottleneck_P2.md) | Thủ tục rút gọn khi khách chờ tại chỗ |
| Máy dùng tạm: điều kiện và số lượng chưa rõ | [Nhận thiết bị](CPS_bottleneck_P2.md) | Theo dõi số máy đang cho mượn |
| Sau khi đã nhận máy mới biết không có nơi xử lý phù hợp | [Chuyển thiết bị](CPS_bottleneck_P3.md) | Xác định nơi xử lý cụ thể ngay tại quầy |
| Nhiều thủ tục nối tiếp tại quầy lúc trả máy | [Trả thiết bị](CPS_bottleneck_P5.md) | Thanh toán trước; chuẩn bị sẵn hồ sơ khi khách hẹn giờ đến |

## Bốn nguyên nhân chung

Các điểm nghẽn ở sáu sơ đồ quy về bốn nguyên nhân. Giải quyết một nguyên nhân sẽ gỡ được nhiều điểm nghẽn cùng lúc.

1. **Quyết định ở quầy dựa trên thông tin sơ bộ.** Hướng xử lý, nơi xử lý và lời tư vấn cho khách đều được đưa ra khi thiết bị chưa được kiểm tra kỹ thuật. Khi phân loại sơ bộ không đúng, hậu quả xuất hiện ở các khâu sau: cửa hàng xử lý nhanh không được, nơi xử lý không tiếp nhận, phương án đổi từ bảo hành sang sửa có phí, khách từ chối.
2. **Thiết bị đổi tay nhiều lần, nhưng mốc giao, mốc nhận và người chịu trách nhiệm chưa rõ.** Đây là phần mô hình As-Is có ít căn cứ nhất, và bản mô tả nghiệp vụ cũng xác định đây là phần cần bổ sung dữ liệu nhiều nhất.
3. **Quy trình chờ khách ở bốn chỗ mà không có hạn và không có bước nhắc.** Bốn chỗ là: quyết định tại quầy, chuẩn bị máy trước khi giao, đồng ý phương án và chi phí, đến nhận máy. Chỉ chỗ cuối có hạn 60 ngày. Cả bốn chỗ đều phụ thuộc vào việc khách biết trước mình cần làm gì.
4. **Các tình huống ngoài dự kiến chưa có đường đi tiếp.** Tra cứu không ra thông tin, khách chưa chuẩn bị xong máy, hãng từ chối bảo hành, khách mất phiếu, khách không nhận máy vì còn lỗi. Khi không có quy định sẵn, nhân viên phải dừng lại để hỏi, và yêu cầu bị treo.

## Thứ tự đề xuất thực hiện

**Bước 1: đo trước khi sửa.** Ghi nhận các mốc thời gian và thực hiện khảo sát theo danh sách ở `CellphoneS_AsIs_danh-muc.md`. Chưa có số liệu thì chưa biết nên đầu tư vào điểm nghẽn nào.

**Bước 2: các thay đổi chỉ cần quy định và phân công, không cần công cụ mới.**

- Bảng quy tắc phân tuyến và danh mục lỗi cửa hàng được xử lý nhanh.
- Danh sách kiểm hồ sơ trước khi chuyển thiết bị.
- Lịch chuyển thiết bị cố định, và người phụ trách giao nhận trong mỗi ca.
- Quy định cách xử lý cho các tình huống ngoài dự kiến: tra cứu không ra thông tin, hãng từ chối bảo hành, khách mất phiếu, khách không nhận máy.
- Báo trước cho khách việc cần thoát tài khoản và sao lưu dữ liệu.

**Bước 3: các thay đổi về thứ tự các bước.**

- Xác định nơi xử lý cụ thể ngay tại quầy, trước khi nhận máy.
- Hướng dẫn khách sao lưu ngay từ lúc tiếp nhận yêu cầu, song song với việc tra cứu bảo hành.
- Thỏa thuận trước với khách về mức chi phí chấp nhận, ngay tại quầy.
- Gửi hồ sơ cho nơi xử lý trước khi chuyển thiết bị.
- Kiểm tra linh kiện ngay khi chẩn đoán, trước khi báo giá.
- Cửa hàng thử lại lỗi ban đầu khi nhận máy về, trước khi báo khách.

**Bước 4: các thay đổi cần công cụ.**

- Phiếu tiếp nhận có bản điện tử gắn với số điện thoại của khách.
- Xác nhận giao và nhận thiết bị bằng mã trên phiếu, có lưu thời điểm.
- Thông báo cho khách theo từng mốc trạng thái.
- Báo giá mà khách có thể bấm đồng ý hoặc từ chối.

Mô hình As-Is chưa biết CellphoneS đang dùng phần mềm gì. Có thể một số việc ở bước 4 đã có sẵn. Khi đó đề xuất trở thành việc kiểm tra xem công cụ có đang được dùng đúng lúc và đúng cách hay không.

## Số liệu cần đo để xác nhận

Mười một khoảng thời gian dưới đây đã có sẵn trong mô hình As-Is. Cột bên phải cho biết mỗi khoảng giúp làm rõ điểm nghẽn nào.

| Khoảng thời gian cần đo | Điểm nghẽn được làm rõ |
|---|---|
| Từ khi khách nêu yêu cầu tại quầy đến khi có hướng xử lý sơ bộ | Khách xếp hàng chờ tại quầy; tra cứu không ra thông tin bảo hành |
| Từ khi khách đồng ý giao máy đến khi có phiếu tiếp nhận | Chờ khách thoát tài khoản và sao lưu; thông tin tiếp nhận thiếu hoặc phải nhập lại |
| Từ khi có phiếu tiếp nhận đến khi cửa hàng giao thiết bị đi | Thiết bị nằm chờ tại cửa hàng trước khi được chuyển đi |
| Từ khi cửa hàng giao thiết bị đi đến khi nơi xử lý nhận được | Khoảng trống giữa lúc cửa hàng giao và lúc nơi xử lý nhận |
| Từ khi nơi xử lý nhận thiết bị đến khi chẩn đoán xong | Thiết bị chờ đến lượt kiểm tra và chẩn đoán |
| Từ khi báo phương án đến khi khách phản hồi | Chờ khách phản hồi phương án và chi phí |
| Thời gian chờ linh kiện, nếu phát sinh | Chờ linh kiện |
| Thời gian sửa chữa | Sửa lại khi kiểm tra sau sửa chữa chưa đạt |
| Từ khi sửa xong đến khi thiết bị sẵn sàng trả tại cửa hàng | Sửa xong nhưng kết quả và thiết bị chưa về đến cửa hàng |
| Từ khi thiết bị sẵn sàng đến khi khách được báo | Thiết bị đã sẵn sàng nhưng khách chưa được báo |
| Từ khi khách được báo đến khi khách nhận máy | Khách chậm đến nhận, thiết bị tồn tại cửa hàng |

Khi đối chiếu các điểm nghẽn với mười một khoảng trên, có bốn số liệu chưa được đo. Bản phân tích đề nghị bổ sung:

1. **Thời gian thiết bị ở trung tâm bảo hành của hãng:** từ khi hãng nhận thiết bị đến khi cửa hàng nhận lại kết quả và thiết bị. Hiện chưa có khoảng nào đo riêng nhánh gửi hãng.
2. **Thời gian khách chờ đến lượt tại quầy:** từ khi khách đến cửa hàng đến khi khách được nhân viên tiếp. Khoảng thứ nhất ở bảng trên chỉ bắt đầu từ lúc khách đã nêu yêu cầu.
3. **Số lần làm lại của mỗi yêu cầu:** số lần đổi hướng xử lý sau khi đã nhận máy, số lần nơi xử lý yêu cầu bổ sung thông tin hoặc không tiếp nhận, số lần sửa lại.
4. **Số yêu cầu rơi vào từng loại kết thúc:** đã trả sau khi sửa, đã trả chưa sửa, khách chưa giao máy, quá 60 ngày, chuyển xử lý ngoại lệ.
