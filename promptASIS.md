# PROMPT TẠO SƠ ĐỒ BPMN 2.0 - CELLPHONES AS-IS

Bản cập nhật ngày 18/11/2026, khớp với `nghiep-vu.md` đã được duyệt. Bản trước khi cập nhật được lưu ở `promptASIS.ban-goc.md`.

## VAI TRÒ

Bạn là Business Process Analyst và BPMN Modeler có kinh nghiệm phân tích quy trình bán lẻ, bảo hành và sửa chữa thiết bị điện tử.

Nhiệm vụ của bạn là mô hình hóa quy trình "Tiếp nhận và xử lý yêu cầu bảo hành - sửa chữa thiết bị thông qua CellphoneS" bằng BPMN 2.0.2, tuân thủ tiêu chuẩn của Object Management Group (OMG).

Yêu cầu tạo 6 sơ đồ:

- Sơ đồ tổng quan: toàn bộ quy trình.
- Sơ đồ chi tiết 1: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy.
- Sơ đồ chi tiết 2: Nhận thiết bị và lập phiếu tiếp nhận.
- Sơ đồ chi tiết 3: Chuyển thiết bị đến nơi xử lý.
- Sơ đồ chi tiết 4: Kiểm tra kỹ thuật và sửa chữa.
- Sơ đồ chi tiết 5: Trả thiết bị và hoàn tất yêu cầu.

Đây là mô hình As-Is sơ bộ dựa trên tài liệu công khai và hiểu biết của nhóm nghiên cứu. Không được khẳng định đây là quy trình nội bộ chính thức của CellphoneS.

## I. NGUỒN DỮ LIỆU BẮT BUỘC

Nội dung nghiệp vụ lấy từ `nghiep-vu.md`. Các trang công khai làm căn cứ:

- Chính sách bảo hành CellphoneS: https://cellphones.com.vn/quy-che-hoat-dong-ung-dung-cellphones/chinh-sach-bao-hanh
- Quy định tiếp nhận của CellphoneS: https://cellphones.com.vn/quy-dinh-ve-tiep-nhan-bao-hanh
- Trang kiểm tra thời hạn bảo hành CellphoneS: https://cellphones.com.vn/kiem-tra-thoi-han-bao-hanh
- Trang tra cứu Điện Thoại Vui: https://dienthoaivui.com.vn/tracuu
- Trang chủ Điện Thoại Vui: https://dienthoaivui.com.vn/
- Hướng dẫn của CareS: https://cares.vn/huong-dan-bao-hanh-va-sua-chua-thiet-bi-apple-tai-cares/
- Tiêu chuẩn BPMN 2.0.2: https://www.omg.org/spec/BPMN/2.0.2/PDF

Mỗi hoạt động đưa vào mô hình phải thuộc một trong ba loại:

- Có nguồn: có căn cứ trong một trang công khai, chỉ áp dụng đúng phạm vi trang đó.
- Nhóm nghiên cứu: do nhóm nghiên cứu đưa ra từ hiểu biết thực tế, chưa có trang công khai xác nhận.
- Cần khảo sát: chưa có căn cứ, cần khảo sát nội bộ.

Dùng BPMN Text Annotation để ghi rõ loại của các bước quan trọng và dữ liệu còn thiếu. Không trình bày nội dung "Nhóm nghiên cứu" hoặc "Cần khảo sát" như một thực tế chắc chắn.

Không tự sáng tạo tên phần mềm nội bộ, số lượng cấp phê duyệt, thời hạn SLA, thời gian chờ, tỷ lệ lỗi, phương thức liên thông hệ thống hoặc tổ chức nhân sự chưa được xác minh.

## II. QUY TẮC BPMN 2.0.2 BẮT BUỘC

### 1. Pool và Lane

Sử dụng BPMN Collaboration với ba Participant:

- Pool 1: Khách hàng.
- Pool 2: Hệ thống CellphoneS, gồm hai Lane:
  - Cửa hàng CellphoneS.
  - Bộ phận sửa chữa (Điện Thoại Vui; CareS với thiết bị Apple).
- Pool 3: Trung tâm bảo hành của hãng.

Điện Thoại Vui và CareS thuộc hệ thống CellphoneS nên nằm trong Pool 2. Bên ngoài duy nhất là trung tâm bảo hành của hãng.

Pool Khách hàng và Pool Trung tâm bảo hành của hãng được vẽ dạng pool đóng, chỉ thể hiện các trao đổi với hệ thống CellphoneS bằng Message Flow. Không mô tả quy trình bên trong của hãng vì không có nguồn.

Mỗi sơ đồ chi tiết chỉ cần thể hiện các Pool và Lane có tham gia.

Trang công khai chỉ nhắc "nhân viên kỹ thuật". Không tách Lane riêng cho nhân viên tiếp nhận, chăm sóc khách hàng hay nhân sự điều phối khi chưa được xác minh.

### 2. Ký hiệu và luồng kết nối

Sử dụng đúng BPMN 2.0.2:

- Start Event: vòng tròn viền mảnh.
- End Event: vòng tròn viền đậm.
- Intermediate Event: vòng tròn viền kép.
- Task: hình chữ nhật bo góc.
- Collapsed Sub-Process: hình chữ nhật bo góc có ký hiệu dấu cộng.
- Exclusive Gateway: hình thoi ký hiệu X, dùng cho các quyết định loại trừ nhau.
- Parallel Gateway: hình thoi ký hiệu +, chỉ sử dụng khi thật sự có xử lý đồng thời.
- Event-Based Gateway: dùng khi quy trình chờ một trong nhiều sự kiện.
- Message Event: dùng cho sự kiện gửi hoặc nhận thông tin giữa các bên.
- Timer Event: chỉ sử dụng khi có điều kiện thời gian được xác định rõ.
- Data Object: thể hiện chứng từ hoặc dữ liệu được sử dụng, ví dụ phiếu tiếp nhận, kết quả kiểm tra và báo giá.
- Text Annotation: thể hiện nguồn chứng cứ và điểm cần khảo sát.

Sequence Flow là đường liền có mũi tên, chỉ dùng để nối các phần tử trong cùng pool. Được đi qua nhiều lane của cùng một pool nhưng tuyệt đối không đi qua ranh giới hai pool.

Message Flow là đường nét đứt có đầu mũi tên rỗng, chỉ sử dụng giữa các participant khác nhau. Không nối Message Flow giữa hai lane thuộc cùng một pool.

Association là đường dùng để liên kết Data Object hoặc Text Annotation với thành phần BPMN. Không dùng Association thay Sequence Flow.

Không nối Sequence Flow trực tiếp vào nội dung bên trong một collapsed subprocess. Phải tuân thủ ranh giới subprocess.

Không sử dụng sơ đồ flowchart hoặc Mermaid giả dạng BPMN.

Dùng Task thường, không gắn loại User Task hay Service Task, vì chưa biết bước nào có phần mềm hỗ trợ.

### 3. Quy tắc logic

Mỗi process phải có điểm bắt đầu và kết thúc phù hợp.

Mọi nhánh rẽ của Exclusive Gateway phải có điều kiện rõ ràng, đầy đủ và không chồng lấn về mặt logic.

Không dùng Parallel Gateway để mô tả những phương án thay thế nhau.

Không kết nối các nhánh tạo ra luồng điều khiển sai hoặc token bị mắc kẹt.

Phải phân biệt:

- Hoạt động xử lý đang diễn ra.
- Sự kiện nhận thông tin.
- Trạng thái chờ phản hồi.
- Điều kiện quyết định.
- Kết quả kết thúc.

Khi quy trình chờ khách hàng phản hồi, thể hiện bằng sự kiện nhận thông điệp. Không dùng Task "Chờ khách xác nhận" khi không có người thực hiện công việc.

Timer Event duy nhất được phép dùng là hạn 60 ngày của phiếu tiếp nhận, vì đây là điều kiện thời gian duy nhất có nguồn. Không tự thêm Timer với thời hạn khác.

## III. SƠ ĐỒ TỔNG QUAN

Bắt đầu khi khách hàng nêu yêu cầu bảo hành hoặc sửa chữa tại cửa hàng CellphoneS.

Trong Lane Cửa hàng CellphoneS, thể hiện lần lượt:

1. Quy trình con 1: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy.
2. Exclusive Gateway "Kết quả tại quầy?" với ba nhánh:
   - Khách đồng ý giao máy.
   - Đủ điều kiện đổi mới: kết thúc, chuyển sang quy trình đổi trả.
   - Khách không tiếp tục: kết thúc, khách mang máy về.
3. Quy trình con 2: Nhận thiết bị và lập phiếu tiếp nhận.
4. Exclusive Gateway "Đã nhận thiết bị?". Nếu chưa, kết thúc ở trạng thái khách chưa giao máy.
5. Exclusive Gateway "Xử lý ở đâu?" với hai nhánh:
   - Xử lý nhanh tại cửa hàng.
   - Bộ phận sửa chữa trong hệ thống hoặc trung tâm bảo hành của hãng.
6. Nhánh xử lý nhanh: Task "Xử lý nhanh lỗi tại cửa hàng", sau đó Exclusive Gateway "Cần chuyển sang bộ phận sửa chữa?" với hai nhánh:
   - Có (cửa hàng không xử lý được và khách đồng ý chuyển): sang quy trình con 3.
   - Không (đã xử lý xong, hoặc khách không tiếp tục): sang quy trình con 5.
7. Quy trình con 3: Chuyển thiết bị đến nơi xử lý, sau đó Exclusive Gateway với ba kết quả:
   - Bộ phận sửa chữa đã nhận: sang quy trình con 4, đặt trong Lane Bộ phận sửa chữa.
   - Trung tâm bảo hành của hãng đã nhận: cửa hàng chờ sự kiện nhận kết quả và thiết bị từ hãng.
   - Không có nơi xử lý phù hợp: sang quy trình con 5.
8. Quy trình con 5: Trả thiết bị và hoàn tất yêu cầu, sau đó hai Exclusive Gateway nối tiếp dẫn đến bốn kết thúc:
   - Đã trả thiết bị sau khi xử lý.
   - Đã trả thiết bị chưa sửa.
   - Quá 60 ngày, thiết bị bị tháo gỡ linh kiện để tái chế.
   - Chưa hoàn tất bàn giao, chuyển xử lý ngoại lệ.

Trao đổi với Pool Khách hàng và Pool Trung tâm bảo hành của hãng được thể hiện bằng Message Flow nối vào các quy trình con hoặc sự kiện tương ứng.

## IV. SƠ ĐỒ CHI TIẾT 1

Tên: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy.

Các hoạt động:

1. Khách nêu yêu cầu tại cửa hàng.
2. Nhân viên tiếp nhận yêu cầu và hỏi hiện tượng lỗi.
3. Nhân viên tra cứu thông tin bảo hành của thiết bị khi khách còn giữ máy.
4. Nhân viên xác định nhóm sản phẩm và quyền lợi bảo hành.
5. Nhân viên xác định hướng xử lý sơ bộ.
6. Nhân viên tư vấn hướng xử lý cho khách.
7. Khách quyết định.

Các điểm quyết định:

- Thiết bị có đủ điều kiện đổi mới không?
- Khách có tiếp tục không?

Kết thúc: khách đồng ý giao máy; chuyển sang quy trình đổi trả; khách mang máy về.

Không xây dựng gateway "Đủ điều kiện sửa chữa miễn phí?" tại quầy. Phải ghi rõ hướng xử lý tại quầy chỉ là phân loại sơ bộ, kết luận kỹ thuật thuộc quy trình con 4.

## V. SƠ ĐỒ CHI TIẾT 2

Tên: Nhận thiết bị và lập phiếu tiếp nhận.

Các hoạt động:

1. Nhân viên hướng dẫn khách thoát tài khoản và sao lưu dữ liệu.
2. Nhân viên nhận thiết bị từ khách.
3. Nhân viên ghi nhận thông tin tiếp nhận.
4. Nhân viên lập phiếu tiếp nhận và giao cho khách. Phiếu được lập cho mọi thiết bị, kể cả lỗi sửa nhanh.
5. Cửa hàng giao máy dùng tạm cho khách nếu chính sách áp dụng.

Các điểm quyết định:

- Khách đã chuẩn bị thiết bị chưa?
- Có áp dụng hỗ trợ máy dùng tạm không?

Kết thúc: đã nhận thiết bị và khách có phiếu tiếp nhận; khách chưa giao máy.

Không tự xác nhận cấu trúc biểu mẫu, việc quét IMEI, chụp ngoại quan, ký xác nhận điện tử hay thời điểm phần mềm tạo mã phiếu.

## VI. SƠ ĐỒ CHI TIẾT 3

Tên: Chuyển thiết bị đến nơi xử lý.

Các hoạt động:

1. Xác định nơi xử lý cụ thể.
2. Chuẩn bị hồ sơ và thông tin yêu cầu.
3. Bàn giao thiết bị cho bộ phận sửa chữa trong hệ thống, hoặc gửi thiết bị đến trung tâm bảo hành của hãng.
4. Nơi xử lý phản hồi việc tiếp nhận.

Phải thể hiện hai mốc riêng bằng Annotation: cửa hàng đã giao thiết bị, và nơi xử lý đã nhận thiết bị.

Các tình huống ngoại lệ cần đánh dấu "Cần khảo sát":

- Nơi xử lý yêu cầu bổ sung thông tin.
- Nơi xử lý không tiếp nhận theo tuyến ban đầu, cửa hàng xác định lại nơi xử lý.
- Không còn nơi xử lý phù hợp.

Không tự thêm bộ phận kho vận, cấp duyệt của quản lý, biên bản giao nhận hoặc phần mềm quản lý vận chuyển.

Kết thúc: nơi xử lý đã nhận thiết bị; không có nơi xử lý phù hợp.

## VII. SƠ ĐỒ CHI TIẾT 4

Tên: Kiểm tra kỹ thuật và sửa chữa.

Sơ đồ mô tả trường hợp sửa chữa trong hệ thống, dựa trên quy trình Điện Thoại Vui và CareS công bố cho khách đến trực tiếp. Phải ghi rõ phạm vi áp dụng. Trường hợp gửi hãng được thể hiện ở sơ đồ tổng quan bằng sự kiện chờ kết quả.

Các hoạt động:

1. Kiểm tra tình trạng thiết bị.
2. Chẩn đoán nguyên nhân lỗi.
3. Xác định phương án xử lý.
4. Báo phương án và chi phí cho khách khi có phát sinh chi phí, rồi chờ phản hồi bằng sự kiện nhận thông điệp.
5. Chờ linh kiện nếu phát sinh.
6. Sửa chữa hoặc thay thế linh kiện.
7. Kiểm tra thiết bị sau sửa chữa.
8. Ghi nhận kết quả xử lý.
9. Chuyển kết quả và thiết bị về cửa hàng.

Các điểm quyết định:

- Phương án có phát sinh chi phí không?
- Khách có đồng ý không?
- Có phải chờ linh kiện không?
- Kết quả kiểm tra sau sửa chữa có đạt không?
- Nếu chưa đạt, có thể xử lý lại không?

Không tự tạo vòng sửa chữa vô hạn. Phải có lối kết thúc khi không thể xử lý.

Việc chờ linh kiện và việc chuyển thiết bị lên trung tâm sửa chữa của Apple đều thuộc loại "Cần khảo sát".

Không dùng thời gian xử lý của CareS như số liệu chung cho CellphoneS.

Không mô hình hóa thao tác kỹ thuật chi tiết trên mainboard, thay IC hay sửa phần mềm.

## VIII. SƠ ĐỒ CHI TIẾT 5

Tên: Trả thiết bị và hoàn tất yêu cầu.

Các hoạt động:

1. Nhận kết quả và nhận lại thiết bị.
2. Đối chiếu kết quả, xác định thiết bị sẵn sàng trả.
3. Báo khách đến nhận thiết bị.
4. Chờ khách đến nhận, hoặc hết 60 ngày hiệu lực của phiếu tiếp nhận.
5. Kiểm tra phiếu tiếp nhận.
6. Bàn giao thiết bị để khách kiểm tra.
7. Thu phí sửa chữa nếu có.
8. Thu lại máy dùng tạm nếu có.
9. Hoàn tất yêu cầu.

Các điểm quyết định:

- Khách có phiếu tiếp nhận không?
- Khách có nhận thiết bị sau khi kiểm tra không?
- Có phát sinh phí không?
- Khách có mượn máy dùng tạm không?
- Thiết bị đã được xử lý hay chưa sửa?

Nếu khách không có phiếu tiếp nhận, không tự vẽ bước xác minh bằng căn cước, OTP hay số điện thoại để thay thế.

Nếu khách không nhận máy vì còn lỗi, không coi việc bàn giao đã thành công.

Kết thúc cần phân biệt:

- Đã trả thiết bị sau khi sửa chữa, bảo hành hoặc thay thế.
- Đã trả thiết bị chưa sửa.
- Thiết bị bị tháo gỡ linh kiện để tái chế do quá 60 ngày.
- Chưa hoàn tất bàn giao, chuyển xử lý ngoại lệ.

## IX. THỂ HIỆN VIỆC THEO DÕI TRẠNG THÁI

Theo dõi trạng thái là một vấn đề xuyên suốt, không tạo thành quy trình con thứ sáu.

Những trạng thái sau chỉ là danh mục đề xuất để khảo sát: đã tiếp nhận thiết bị; đang chuyển đến nơi xử lý; nơi xử lý đã nhận máy; đang kiểm tra; chờ khách xác nhận; chờ linh kiện; đang sửa chữa; đã xử lý xong; sẵn sàng bàn giao; đã bàn giao.

Không khẳng định đây là các trạng thái thực tế trên phần mềm CellphoneS.

Không được tạo Service Task "Hệ thống tự động cập nhật trạng thái".

Sử dụng Annotation để nêu câu hỏi khảo sát:

- Ai cập nhật trạng thái?
- Thời điểm cập nhật là khi nào?
- Trạng thái được cập nhật ở hệ thống nào?
- Cửa hàng và bộ phận sửa chữa có nhìn thấy cùng trạng thái không?
- Khách hàng có nhận thông báo hay phải tự tra cứu?

## X. CÁC KHOẢNG THỜI GIAN CẦN ĐO

Đánh dấu các khoảng thời gian sau trên sơ đồ bằng Annotation:

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

Đây là các khoảng thời gian đề xuất đo lường, không phải thời gian thực tế đã được thống kê.

Không dùng Timer Event để biểu diễn các khoảng thời gian cần đo.

## XI. QUY TẮC TRÌNH BÀY

- Sử dụng hướng bố cục từ trái sang phải.
- Mỗi pool và lane phải có tên rõ ràng.
- Task đặt tên theo cấu trúc động từ + đối tượng, ví dụ "Tra cứu thông tin bảo hành".
- Gateway đặt câu hỏi quyết định, ví dụ "Khách đồng ý?".
- Mọi nhánh từ gateway phải có nhãn điều kiện.
- Hạn chế đường nối giao nhau và đường quay lại quá dài.
- Không vẽ đường nối đi xuyên qua task hoặc gateway.
- Không thêm hoạt động trang trí không có ý nghĩa nghiệp vụ.
- Sơ đồ chi tiết phải có đầy đủ các nhánh có ý nghĩa, không đơn giản hóa thành chuỗi ô thẳng hàng.
- Phân biệt kết thúc thành công và kết thúc do không tiếp tục xử lý.
- Dùng Text Annotation để dẫn nguồn cụ thể cho các nghiệp vụ quan trọng.
- Những điểm "Cần khảo sát" phải nổi bật bằng màu của Annotation, không làm thay đổi ý nghĩa chuẩn của ký hiệu BPMN.
- Ghi chú trên sơ đồ viết bằng lời thường, không dùng ký hiệu viết tắt.

## XII. YÊU CẦU ĐẦU RA

Xuất đúng 6 sơ đồ BPMN:

1. CellphoneS_AsIs_Level0.
2. CellphoneS_AsIs_P1.
3. CellphoneS_AsIs_P2.
4. CellphoneS_AsIs_P3.
5. CellphoneS_AsIs_P4.
6. CellphoneS_AsIs_P5.

Cung cấp:

- Tệp BPMN 2.0 XML có BPMN Diagram Interchange đầy đủ, mở và chỉnh sửa được bằng Camunda Modeler hoặc bpmn.io.
- Bản SVG và PNG của từng sơ đồ.
- Danh mục các bước theo ba loại: có nguồn, nhóm nghiên cứu, cần khảo sát.
- Bảng đối chiếu các bước quan trọng với nguồn tài liệu.
- Danh sách thông tin còn thiếu cần khảo sát.

Nếu công cụ không hỗ trợ xuất BPMN XML hoặc kiểm tra mô hình theo chuẩn BPMN 2.0.2, phải nói rõ giới hạn. Không được tuyên bố sơ đồ đã đạt chuẩn hoặc đã được kiểm chứng khi chưa thực hiện bước kiểm tra.

## XIII. KIỂM TRA TRƯỚC KHI HOÀN TẤT

Kiểm tra từng sơ đồ về mặt ký pháp, logic luồng điều khiển và tính nhất quán với các sơ đồ còn lại.

Phải xác nhận:

- Không có Sequence Flow đi qua ranh giới pool.
- Message Flow chỉ nối giữa các participant khác nhau.
- Mỗi gateway có các nhánh rõ điều kiện.
- Mọi luồng kết thúc hoặc được chuyển vào một trạng thái chờ hợp lệ.
- Không có hoạt động bị cô lập.
- Không có luồng quay lại vô hạn không có điều kiện thoát.
- Các sơ đồ chi tiết có điểm bắt đầu và kết thúc tương ứng với sơ đồ tổng quan.
- Có xử lý trường hợp khách từ chối sửa chữa.
- Có kết quả trả máy chưa sửa.
- Có phân biệt nhận máy, sửa xong, sẵn sàng bàn giao và bàn giao thực tế.
- Không gán nghiệp vụ của CareS cho mọi đơn vị sửa chữa.
- Không tự sáng tạo hệ thống CNTT, nhân sự hoặc thời gian SLA.

Đối chiếu BPMN XML với lược đồ BPMN 2.0 của OMG và kiểm tra khả năng mở tệp bằng thư viện bpmn.io trước khi xác nhận hoàn thành.

Nếu phát hiện một bước nghiệp vụ thiếu chứng cứ, giữ lại dưới dạng giả thuyết được chú thích "Cần khảo sát" hoặc đưa vào danh sách cần khảo sát. Không thay thế bằng một bước tự suy đoán khác.
