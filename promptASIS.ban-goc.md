# PROMPT TẠO SƠ ĐỒ BPMN 2.0 - CELLPHONES AS-IS

## VAI TRÒ

Bạn là Business Process Analyst và BPMN Modeler có kinh nghiệm phân tích quy trình bán lẻ, bảo hành và sửa chữa thiết bị điện tử.

Nhiệm vụ của bạn là mô hình hóa quy trình "Tiếp nhận và xử lý yêu cầu bảo hành - sửa chữa thiết bị thông qua CellphoneS" bằng BPMN 2.0.2, tuân thủ tiêu chuẩn của Object Management Group (OMG).

Yêu cầu tạo 6 sơ đồ:

- BPMN Level 0: Quy trình tổng quan.
- BPMN Level 1 - P1: Tiếp nhận yêu cầu và thiết bị.
- BPMN Level 1 - P2: Kiểm tra điều kiện bảo hành và xác định hướng xử lý.
- BPMN Level 1 - P3: Điều phối và chuyển thiết bị đến đơn vị xử lý.
- BPMN Level 1 - P4: Kiểm tra kỹ thuật và thực hiện sửa chữa.
- BPMN Level 1 - P5: Trả thiết bị và hoàn tất yêu cầu.

Đây là mô hình As-Is sơ bộ dựa trên tài liệu công khai. Không được khẳng định đây là quy trình nội bộ chính thức của CellphoneS.

## I. NGUỒN DỮ LIỆU BẮT BUỘC

Sử dụng các nguồn:

[S1] Chính sách bảo hành CellphoneS:
https://cellphones.com.vn/quy-che-hoat-dong-ung-dung-cellphones/chinh-sach-bao-hanh

[S2] Quy định bảo hành, sửa chữa và cài đặt phần mềm:
https://cellphones.com.vn/quy-dinh-ve-tiep-nhan-bao-hanh

[S3] Trang kiểm tra thời hạn bảo hành:
https://cellphones.com.vn/kiem-tra-thoi-han-bao-hanh

[S4] Trang tra cứu bảo hành - sửa chữa Điện Thoại Vui:
https://dienthoaivui.com.vn/tracuu

[S5] Quy trình phục vụ Điện Thoại Vui:
https://dienthoaivui.com.vn/

[S6] Quy trình bảo hành - sửa chữa tại CareS:
https://cares.vn/huong-dan-bao-hanh-va-sua-chua-thiet-bi-apple-tai-cares/

[S7] Tiêu chuẩn BPMN 2.0.2:
https://www.omg.org/spec/BPMN/2.0.2/PDF

Mỗi hoạt động đưa vào mô hình phải được phân loại:

- C: Có căn cứ trong tài liệu công khai, chỉ áp dụng đúng phạm vi nguồn đó.
- K: Chưa được xác minh, cần khảo sát nội bộ.

Dùng BPMN Text Annotation để ghi rõ các bước K và giải thích dữ liệu còn thiếu. Không trình bày bước K như một thực tế chắc chắn.

Không tự sáng tạo tên phần mềm nội bộ, số lượng cấp phê duyệt, thời hạn SLA, thời gian chờ, tỷ lệ lỗi, phương thức liên thông hệ thống hoặc tổ chức nhân sự chưa được xác minh.

## II. QUY TẮC BPMN 2.0.2 BẮT BUỘC

### 1. Pool và Lane

Tại sơ đồ tổng quan, ưu tiên sử dụng BPMN Collaboration với ba Participant:

Pool 1: Khách hàng.

Pool 2: CellphoneS.

Pool 3: Đơn vị bảo hành hoặc sửa chữa được phân tuyến.

Bên trong Pool CellphoneS, dùng Lane để thể hiện vai trò thực sự có căn cứ. Có thể sử dụng Lane "Nhân viên tiếp nhận tại CellphoneS". Nếu tách riêng Lane "CSKH" hoặc "Nhân sự điều phối", phải ghi K đối với trách nhiệm cụ thể chưa được xác minh.

Đơn vị xử lý bên ngoài phải thuộc pool riêng. Có thể ghi chú các tuyến xử lý gồm trung tâm bảo hành chính hãng, Điện Thoại Vui hoặc CareS tùy chính sách và sản phẩm.

Không đặt hoạt động sửa chữa của Điện Thoại Vui hoặc trung tâm bảo hành hãng vào Lane của CellphoneS.

Nếu có trường hợp được xác minh là CellphoneS trực tiếp sửa chữa, mô hình hóa nhánh xử lý nội bộ riêng, không ép nhánh này vào pool của đơn vị bên ngoài.

### 2. Ký hiệu và luồng kết nối

Sử dụng đúng BPMN 2.0.2:

- Start Event: Vòng tròn viền mảnh.
- End Event: Vòng tròn viền đậm.
- Intermediate Event: Vòng tròn viền kép.
- Task: Hình chữ nhật bo góc.
- Collapsed Sub-Process: Hình chữ nhật bo góc có ký hiệu dấu cộng.
- Exclusive Gateway: Hình thoi ký hiệu X, dùng cho các quyết định loại trừ nhau.
- Parallel Gateway: Hình thoi ký hiệu +, chỉ sử dụng khi thật sự có xử lý đồng thời.
- Message Event: Dùng cho sự kiện gửi hoặc nhận thông tin giữa các bên.
- Timer Event: Chỉ sử dụng khi có điều kiện thời gian được xác định rõ.
- Data Object: Thể hiện chứng từ hoặc dữ liệu được sử dụng, ví dụ phiếu tiếp nhận, kết quả kiểm tra và báo giá.
- Text Annotation: Thể hiện nguồn chứng cứ và điểm cần xác minh.

Sequence Flow là đường liền có mũi tên, chỉ dùng để nối các phần tử trong cùng pool. Được đi qua nhiều lane của cùng một pool nhưng tuyệt đối không đi qua ranh giới hai pool.

Message Flow là đường nét đứt có đầu mũi tên rỗng, chỉ sử dụng giữa các participant khác nhau. Không nối Message Flow giữa hai lane thuộc cùng một pool.

Association là đường dùng để liên kết Data Object hoặc Text Annotation với thành phần BPMN. Không dùng Association thay Sequence Flow.

Không nối Sequence Flow trực tiếp vào nội dung bên trong một collapsed subprocess. Phải tuân thủ ranh giới subprocess.

Không sử dụng sơ đồ flowchart hoặc Mermaid giả dạng BPMN.

### 3. Quy tắc logic

Mỗi process phải có điểm bắt đầu và kết thúc phù hợp.

Mọi nhánh rẽ của Exclusive Gateway phải có điều kiện rõ ràng, đầy đủ và không chồng lấn về mặt logic. Sử dụng default flow nếu cần.

Không dùng Parallel Gateway để mô tả những phương án thay thế nhau.

Không kết nối các nhánh tạo ra luồng điều khiển sai hoặc token bị mắc kẹt.

Phải phân biệt:
- Hoạt động xử lý đang diễn ra.
- Sự kiện nhận thông tin.
- Trạng thái chờ phản hồi.
- Điều kiện quyết định.
- Kết quả kết thúc.

Ví dụ, nếu hệ thống đang chờ khách hàng đồng ý báo giá, hãy thể hiện bằng sự kiện nhận thông điệp hoặc cơ chế chờ phù hợp. Không mặc định sử dụng User Task "Chờ khách xác nhận" nếu không có người thực hiện công việc.

Không tự thêm Timer Boundary Event với thời hạn 24 giờ, 48 giờ hoặc bất kỳ thời gian nào nếu không có căn cứ.

## III. MÔ HÌNH TỔNG QUAN LEVEL 0

Bắt đầu khi khách hàng gửi yêu cầu bảo hành hoặc sửa chữa thông qua CellphoneS.

Trong Pool CellphoneS, thể hiện:

P1. Tiếp nhận yêu cầu và thiết bị.

P2. Kiểm tra điều kiện bảo hành và xác định hướng xử lý.

Exclusive Gateway: Hướng xử lý sơ bộ là gì?

Các nhánh cần xét:
- Chuyển sang xử lý bảo hành hoặc sửa chữa.
- Chuyển sang quy trình đổi trả nếu đủ điều kiện.
- Không tiếp tục yêu cầu, thực hiện trả thiết bị hoặc hướng dẫn phù hợp.

Nếu tiếp tục sửa chữa:

P3. Điều phối và chuyển thiết bị đến đơn vị xử lý.

Đơn vị xử lý nhận yêu cầu và thiết bị thông qua tương tác liên pool. Trong pool của đơn vị xử lý, thể hiện:

P4. Kiểm tra kỹ thuật và thực hiện sửa chữa.

P4 gửi kết quả xử lý trở lại CellphoneS thông qua Message Flow.

CellphoneS tiếp nhận kết quả và thực hiện:

P5. Trả thiết bị và hoàn tất yêu cầu.

Kết thúc sau khi khách hàng đã nhận thiết bị và yêu cầu được giải quyết.

Lưu ý:
- Không dùng Sequence Flow nối trực tiếp P3 trong Pool CellphoneS đến P4 của pool khác.
- Không dùng Sequence Flow nối trực tiếp P4 của đơn vị xử lý đến P5 trong Pool CellphoneS.
- Sử dụng sự kiện gửi/nhận thông điệp và Message Flow thích hợp.
- Nếu P4 được thực hiện bởi CellphoneS trong một trường hợp đã xác minh, phải tạo nhánh xử lý nội bộ phù hợp.

## IV. MÔ HÌNH CHI TIẾT P1

Tên: Tiếp nhận yêu cầu và thiết bị.

Các nội dung nghiệp vụ:

1. Khách hàng phát sinh nhu cầu bảo hành hoặc sửa chữa.
2. Khách hàng liên hệ kênh hỗ trợ hoặc đến cửa hàng CellphoneS.
3. Nhân viên tiếp nhận nhu cầu và hướng dẫn khách hàng về việc bàn giao thiết bị.
4. Khách hàng sao lưu dữ liệu và đăng xuất tài khoản trước khi giao máy.
5. Nhân viên tiếp nhận thiết bị và thực hiện thủ tục tiếp nhận.
6. Ghi nhận phiếu tiếp nhận, dùng làm chứng từ nhận lại thiết bị.

Các điểm quyết định cần xem xét:

- Khách đã chuẩn bị thiết bị theo yêu cầu chưa?
- Khách đã giao thiết bị để tiếp nhận chưa?
- Yêu cầu có đủ thông tin để tiếp tục xử lý không? [K]

Không tự xác nhận cấu trúc biểu mẫu, việc quét IMEI, chụp ngoại quan, ký xác nhận điện tử hay thời điểm phần mềm tạo mã phiếu nếu không có bằng chứng.

Kết quả cần thể hiện:
- Đã tiếp nhận thiết bị và có phiếu tiếp nhận.
- Chưa thể tiếp nhận, cần bổ sung điều kiện.
- Khách không tiếp tục giao thiết bị.

Thể hiện các mốc cần đo thời gian bằng Annotation, không gán số phút.

## V. MÔ HÌNH CHI TIẾT P2

Tên: Kiểm tra điều kiện bảo hành và xác định hướng xử lý.

Bắt đầu khi có thông tin thiết bị và phiếu tiếp nhận.

Các hoạt động:
1. Xác định loại sản phẩm và chính sách bảo hành có liên quan.
2. Đối chiếu thời hạn và thông tin bảo hành.
3. Phân biệt máy mới, máy đã kích hoạt bảo hành chính hãng hoặc máy cũ khi phù hợp.
4. Xác định tuyến xử lý sơ bộ theo quyền lợi và đơn vị được công bố.
5. Hướng dẫn khách hàng về phương án xử lý tiếp theo.

Các nhánh:
- Bảo hành chính hãng.
- Bảo hành hoặc sửa chữa qua CellphoneS/Điện Thoại Vui theo chính sách.
- Chuyển sang quy trình đổi trả.
- Không tiếp tục xử lý.

Không xây dựng gateway "Đủ điều kiện sửa chữa miễn phí?" như một quyết định cuối cùng tại cửa hàng nếu thiết bị chưa được kiểm tra kỹ thuật.

Phải thể hiện ranh giới giữa phân loại sơ bộ tại P2 và kết luận kỹ thuật tại P4.

Nếu quy trình cần xác minh thêm một bước kiểm tra nội bộ thì sử dụng Annotation K.

Đầu ra: Hướng xử lý ban đầu được xác định.

## VI. MÔ HÌNH CHI TIẾT P3

Tên: Điều phối và chuyển thiết bị đến đơn vị xử lý.

Bắt đầu khi P2 đã xác định hướng xử lý.

Các hoạt động phân tích:
1. Xác định đơn vị có trách nhiệm xử lý theo chính sách.
2. Chuẩn bị thông tin yêu cầu để chuyển giao. [K]
3. Thực hiện giao thiết bị và thông tin cho đơn vị xử lý. [K]
4. Nhận xác nhận từ đơn vị xử lý rằng yêu cầu hoặc thiết bị đã được tiếp nhận. [K]
5. Kết thúc giai đoạn bàn giao, chuyển sang P4.

Mô hình hóa đơn vị xử lý như participant riêng nếu đây là một tổ chức hoặc đơn vị độc lập.

Phải thể hiện hai mốc riêng:
- CellphoneS đã giao thiết bị.
- Đơn vị xử lý đã nhận thiết bị.

Hai mốc này chưa được xác minh là có ghi nhận trên hệ thống CellphoneS. Vì vậy, dùng Annotation K để thể hiện chúng là dữ liệu cần khảo sát.

Các tình huống ngoại lệ cần đánh dấu K:
- Đơn vị xử lý yêu cầu bổ sung thông tin.
- Đơn vị xử lý không tiếp nhận theo tuyến ban đầu.
- Thiết bị cần chuyển sang đơn vị xử lý khác.

Không tự thêm bộ phận kho vận, cấp duyệt của quản lý, biên bản giao nhận hoặc phần mềm quản lý vận chuyển nếu chưa được xác nhận.

Đầu ra: Đơn vị xử lý đã nhận được yêu cầu và thiết bị, hoặc yêu cầu phát sinh tình huống điều phối cần giải quyết.

## VII. MÔ HÌNH CHI TIẾT P4

Tên: Kiểm tra kỹ thuật và thực hiện sửa chữa.

Bắt đầu khi đơn vị kỹ thuật tiếp nhận thiết bị.

Mô hình P4 dựa vào nghiệp vụ được Điện Thoại Vui hoặc CareS công bố. Phải ghi rõ phạm vi áp dụng.

Luồng nghiệp vụ chính:

1. Tiếp nhận thiết bị.
2. Kiểm tra tình trạng thiết bị.
3. Chẩn đoán nguyên nhân lỗi.
4. Xác định phương án bảo hành hoặc sửa chữa.
5. Xác định việc xử lý có phát sinh chi phí hay không.

Gateway: Có cần khách hàng đồng ý phương án hoặc chi phí trước khi thực hiện không?

Nếu có:
- Thông báo phương án, chi phí và thông tin liên quan.
- Chờ phản hồi khách hàng.
- Nếu đồng ý, tiếp tục.
- Nếu từ chối, dừng sửa chữa và chuyển sang kết quả trả thiết bị chưa sửa.

Nếu không cần phê duyệt mới:
- Tiếp tục theo chính sách bảo hành áp dụng.

Tiếp theo:
6. Xác định khả năng thực hiện sửa chữa.
7. Kiểm tra điều kiện linh kiện khi có nhu cầu thay thế.
8. Tiến hành sửa chữa hoặc thay thế.
9. Kiểm tra chức năng sau sửa chữa.

Gateway: Kết quả kiểm tra sau sửa chữa có đạt không?

Nếu đạt:
- Ghi nhận kết quả.
- Thông báo kết quả cho bên chịu trách nhiệm bàn giao.

Nếu không đạt:
- Đánh dấu nhánh xử lý lại hoặc thay đổi phương án là K nếu chưa xác minh.
- Không tự tạo vòng sửa chữa vô hạn.
- Phải có hướng kết thúc phù hợp nếu không thể tiếp tục.

Các nhánh cần xem xét:
- Chờ linh kiện (có căn cứ đối với một số dịch vụ CareS).
- Sửa chữa có phí cần khách xác nhận.
- Khách không đồng ý sửa chữa.
- Không thể thực hiện phương án đã đề xuất [K].
- Kiểm tra sau sửa không đạt [K về cách xử lý tiếp theo].

Không dùng thời gian chờ linh kiện của CareS như số liệu chung cho CellphoneS.

Không mô hình hóa thao tác kỹ thuật chi tiết trên mainboard, thay IC hay sửa phần mềm nếu không thuộc phạm vi dịch vụ đang phân tích.

Đầu ra: Kết quả xử lý kỹ thuật và thông tin cần gửi đến đơn vị bàn giao.

## VIII. MÔ HÌNH CHI TIẾT P5

Tên: Trả thiết bị và hoàn tất yêu cầu.

Bắt đầu khi có kết quả xử lý và thiết bị sẵn sàng bàn giao.

Các hoạt động:
1. Tiếp nhận kết quả xử lý từ đơn vị kỹ thuật.
2. Xác định thiết bị đã sẵn sàng để trả khách. [K]
3. Thông báo khách hàng đến nhận thiết bị. [K đối với trách nhiệm cụ thể của CellphoneS]
4. Khách hàng đến nhận.
5. Kiểm tra phiếu tiếp nhận.
6. Bàn giao thiết bị.
7. Khách hàng kiểm tra và nhận thiết bị.
8. Giải quyết khoản phí hoặc việc hoàn trả thiết bị mượn nếu chính sách áp dụng.
9. Hoàn tất yêu cầu. [K về thao tác đóng hồ sơ]

Các gateway:
- Khách hàng có phiếu tiếp nhận không?
- Có phát sinh thanh toán không?
- Có thiết bị mượn cần hoàn trả không?
- Khách hàng có tiếp nhận thiết bị sau khi kiểm tra không? [K về cách xử lý ngoại lệ]

Nếu không có phiếu tiếp nhận, không tự vẽ bước xác minh bằng CCCD, OTP hay số điện thoại để thay thế. Ghi rõ quy trình xử lý ngoại lệ chưa có dữ liệu công khai.

Nếu khách không đồng ý nhận máy vì còn lỗi, không tự động coi việc bàn giao đã thành công. Ghi nhận tình huống cần giải quyết tiếp theo là K.

Kết quả kết thúc cần phân biệt:
- Đã bàn giao thiết bị sau sửa chữa.
- Đã bàn giao thiết bị chưa sửa hoặc không tiếp tục xử lý.
- Trường hợp chưa thể hoàn tất bàn giao và phải chuyển xử lý ngoại lệ.

## IX. THỂ HIỆN VIỆC THEO DÕI TRẠNG THÁI

Theo dõi trạng thái là một vấn đề xuyên suốt, không tạo thành quy trình con thứ sáu.

Trên các sơ đồ, thể hiện những thời điểm có thể phát sinh thay đổi trạng thái dưới dạng BPMN Data Object, Data Store nếu có căn cứ, hoặc Text Annotation.

Những trạng thái sau chỉ là danh mục đề xuất để khảo sát:
- Đã tiếp nhận thiết bị.
- Đã xác định hướng xử lý.
- Đang chuyển đơn vị xử lý.
- Đơn vị kỹ thuật đã nhận máy.
- Đang kiểm tra.
- Chờ khách hàng xác nhận.
- Chờ linh kiện.
- Đang sửa chữa.
- Đã xử lý xong.
- Sẵn sàng bàn giao.
- Đã bàn giao.

Không khẳng định đây là các trạng thái thực tế trên phần mềm CellphoneS.

Không được tạo một Service Task "Hệ thống tự động cập nhật trạng thái" nếu chưa có chứng cứ về tính năng tự động đó.

Sử dụng Annotation để nêu câu hỏi:
- Ai cập nhật trạng thái?
- Thời điểm cập nhật là khi nào?
- Trạng thái được cập nhật ở hệ thống nào?
- Bên tiếp nhận và đơn vị sửa chữa có nhìn thấy cùng trạng thái không?
- Khách hàng có nhận thông báo hay phải tự tra cứu?

## X. CÁC ĐIỂM CẦN ĐO THỜI GIAN

Đánh dấu các khoảng thời gian sau trên sơ đồ bằng Annotation:

T1. Từ khi khách giao yêu cầu đến khi có phiếu tiếp nhận.

T2. Từ khi tiếp nhận đến khi xác định được hướng xử lý.

T3. Từ lúc CellphoneS bàn giao đến khi đơn vị xử lý nhận máy.

T4. Từ lúc đơn vị xử lý nhận máy đến khi hoàn thành chẩn đoán.

T5. Từ lúc đề xuất phương án đến khi khách phản hồi.

T6. Thời gian chờ linh kiện nếu phát sinh.

T7. Thời gian thực hiện sửa chữa.

T8. Từ khi hoàn tất kỹ thuật đến khi thiết bị sẵn sàng bàn giao.

T9. Từ khi thiết bị sẵn sàng đến khi khách được thông báo.

T10. Từ khi thông báo đến khi khách nhận máy.

Đây là các khoảng thời gian đề xuất đo lường, không phải thời gian thực tế đã được thống kê.

Chỉ sử dụng Timer Event khi đã xác định được một điều kiện thời gian cụ thể trong quy trình. Không dùng Timer Event chỉ để biểu diễn mọi khoảng thời gian cần đo.

## XI. QUY TẮC TRÌNH BÀY

- Sử dụng hướng bố cục từ trái sang phải.
- Mỗi pool/lane phải có tên rõ ràng.
- Task đặt tên theo cấu trúc động từ + đối tượng, ví dụ "Kiểm tra thông tin bảo hành".
- Gateway đặt câu hỏi quyết định, ví dụ "Khách đồng ý chi phí?".
- Mọi nhánh từ gateway phải có nhãn điều kiện.
- Hạn chế đường nối giao nhau và đường quay lại quá dài.
- Không vẽ đường nối đi xuyên qua task hoặc gateway.
- Không thêm hoạt động trang trí không có ý nghĩa nghiệp vụ.
- Sơ đồ chi tiết phải có đầy đủ các nhánh có ý nghĩa, không đơn giản hóa thành chuỗi năm ô thẳng hàng.
- Phân biệt kết thúc thành công và kết thúc do không tiếp tục xử lý.
- Dùng Text Annotation để dẫn nguồn cụ thể cho các nghiệp vụ quan trọng.
- Những điểm K phải nổi bật nhưng không làm thay đổi ý nghĩa chuẩn của ký hiệu BPMN.

## XII. YÊU CẦU ĐẦU RA

Xuất đúng 6 sơ đồ BPMN:

1. CellphoneS_AsIs_Level0.
2. CellphoneS_AsIs_P1.
3. CellphoneS_AsIs_P2.
4. CellphoneS_AsIs_P3.
5. CellphoneS_AsIs_P4.
6. CellphoneS_AsIs_P5.

Ưu tiên cung cấp:
- Tệp BPMN 2.0 XML, có BPMN Diagram Interchange đầy đủ để có thể mở và chỉnh sửa bằng Camunda Modeler hoặc bpmn.io.
- Bản SVG hoặc PNG có độ phân giải cao của từng sơ đồ.
- Danh mục các bước C và K.
- Bảng đối chiếu các bước quan trọng với nguồn tài liệu.
- Danh sách thông tin còn thiếu cần khảo sát.

Nếu công cụ không hỗ trợ xuất BPMN XML hoặc kiểm tra mô hình theo chuẩn BPMN 2.0.2, phải nói rõ giới hạn. Không được tuyên bố sơ đồ đã đạt chuẩn hoặc đã được kiểm chứng khi chưa thực hiện bước kiểm tra.

## XIII. KIỂM TRA TRƯỚC KHI HOÀN TẤT

Kiểm tra từng sơ đồ về mặt ký pháp, logic luồng điều khiển và tính nhất quán với các sơ đồ còn lại.

Phải xác nhận:
- Không có Sequence Flow đi qua ranh giới pool.
- Message Flow chỉ nối giữa các participant phù hợp.
- Mỗi gateway có các nhánh rõ điều kiện.
- Mọi luồng kết thúc hoặc được chuyển vào một trạng thái chờ hợp lệ.
- Không có hoạt động bị cô lập.
- Không có luồng quay lại vô hạn không có điều kiện thoát.
- Các subprocess chi tiết có đầu vào và đầu ra tương ứng với quy trình tổng quan.
- Có xử lý trường hợp khách từ chối sửa chữa.
- Có kết quả trả máy chưa sửa.
- Có phân biệt nhận máy, sửa xong, sẵn sàng bàn giao và bàn giao thực tế.
- Không gán nghiệp vụ của CareS cho mọi đơn vị sửa chữa.
- Không tự sáng tạo hệ thống CNTT, nhân sự hoặc thời gian SLA.

Đối chiếu BPMN XML với tiêu chuẩn BPMN 2.0.2 và kiểm tra khả năng mở tệp bằng công cụ hỗ trợ trước khi xác nhận hoàn thành.

Nếu phát hiện một bước nghiệp vụ thiếu chứng cứ, giữ lại dưới dạng giả thuyết được chú thích K hoặc đưa vào danh sách cần khảo sát. Không thay thế bằng một bước tự suy đoán khác.

Hãy tạo các sơ đồ theo đúng yêu cầu trên.