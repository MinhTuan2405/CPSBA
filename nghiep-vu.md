# MÔ TẢ QUY TRÌNH TIẾP NHẬN VÀ XỬ LÝ YÊU CẦU BẢO HÀNH - SỬA CHỮA TẠI CELLPHONES

Bản As-Is đã rà soát, cập nhật ngày 18/11/2026. Các trang web công khai được đối chiếu lại trong cùng ngày. Bản mô tả trước khi rà soát được lưu ở tệp `nghiep-vu.ban-goc.md`.

## Cách đọc tài liệu

Mỗi thông tin trong tài liệu thuộc một trong ba loại, được ghi trong ngoặc đơn ở cuối câu:

- **Có nguồn:** một trang web công khai có ghi nội dung này. Thông tin chỉ đúng trong phạm vi trang đó, không tự động đúng cho mọi đơn vị.
- **Nhóm nghiên cứu:** thông tin hoặc lựa chọn do nhóm nghiên cứu đưa ra từ hiểu biết thực tế. Chưa có trang công khai nào xác nhận, nên vẫn cần khảo sát.
- **Cần khảo sát:** chưa có căn cứ. Nội dung được đưa vào mô hình như một giả thuyết và phải được kiểm chứng bằng phỏng vấn nhân viên hoặc hồ sơ xử lý thật.

Tên đầy đủ và đường dẫn của từng trang web nằm ở mục 6.

## 1. Tổng quan

### 1.1. Phạm vi

Mô hình mô tả việc xử lý một yêu cầu bảo hành hoặc sửa chữa thiết bị (điện thoại, máy tính bảng, laptop và thiết bị tương tự) do khách hàng mang đến cửa hàng CellphoneS, từ lúc khách nêu yêu cầu đến lúc khách nhận lại thiết bị.

Các trường hợp sau nằm ngoài phạm vi:

- Khách tự mang thiết bị đến Điện Thoại Vui, CareS hoặc trung tâm bảo hành của hãng.
- Khách gửi thiết bị qua công ty chuyển phát.
- Phụ kiện như tai nghe, sạc, cáp. Nhóm này đi theo chính sách đổi mới tại cửa hàng chứ không sửa chữa (Có nguồn: Chính sách bảo hành CellphoneS).
- Quy trình đổi trả. Mô hình chỉ thể hiện điểm nối sang quy trình này.

### 1.2. Các bên tham gia

Mô hình có ba bên.

**Khách hàng.**

**Hệ thống CellphoneS**, gồm hai bộ phận:

- *Cửa hàng CellphoneS:* tiếp nhận yêu cầu, kiểm tra thông tin bảo hành, nhận thiết bị, xử lý nhanh các lỗi đơn giản và trả thiết bị. Trang quy định công khai chỉ nhắc đến "nhân viên kỹ thuật" (Có nguồn: Quy định tiếp nhận của CellphoneS). Việc cửa hàng có tách riêng nhân viên tiếp nhận và nhân viên kỹ thuật hay không cần khảo sát.
- *Bộ phận sửa chữa:* Điện Thoại Vui, và CareS đối với thiết bị Apple. Ba căn cứ cho việc xếp hai đơn vị này vào cùng hệ thống:
  - Chính sách bảo hành ghi nơi bảo hành là "CellphoneS/ Điện Thoại Vui" (Có nguồn: Chính sách bảo hành CellphoneS).
  - Website CellphoneS liệt kê Điện Thoại Vui và CareS là website thành viên (Có nguồn: Chính sách bảo hành CellphoneS).
  - CareS tự giới thiệu là trung tâm bảo hành ủy quyền Apple "thuộc hệ thống bán lẻ ủy quyền Apple CellphoneS" (Có nguồn: Hướng dẫn của CareS).

  Điện Thoại Vui có pháp nhân riêng là Công ty Cổ phần Dịch vụ Sửa chữa Điện Thoại Vui (Có nguồn: Trang chủ Điện Thoại Vui). Mô hình vẫn xem đây là một bộ phận của cùng hệ thống. Mức độ dùng chung nhân sự, địa điểm và phần mềm giữa cửa hàng với bộ phận sửa chữa cần khảo sát.

**Trung tâm bảo hành của hãng.** Đây là bên ngoài duy nhất. Bộ nguồn công khai không mô tả quy trình bên trong của các trung tâm này, nên mô hình chỉ thể hiện việc gửi thiết bị đi và nhận kết quả về.

Riêng với thiết bị Apple, trung tâm bảo hành ủy quyền là CareS, vốn thuộc hệ thống CellphoneS. Vì vậy bảo hành theo chính sách của Apple có thể được xử lý ngay trong hệ thống (Có nguồn về quan hệ giữa CareS và CellphoneS: Hướng dẫn của CareS). Cách phân tuyến thực tế cho thiết bị Apple cần khảo sát.

### 1.3. Luồng tổng quát

Khách hàng mang thiết bị gặp lỗi đến cửa hàng CellphoneS. Khi khách còn giữ máy, nhân viên kiểm tra thông tin bảo hành ngay tại quầy, xác định hướng xử lý sơ bộ và tư vấn để khách quyết định (Nhóm nghiên cứu).

Tùy kết quả tại quầy, yêu cầu đi theo một trong ba hướng sau:

- Khách giao máy để được xử lý.
- Yêu cầu được chuyển sang quy trình đổi trả.
- Khách không tiếp tục và mang máy về.

Khi khách giao máy, cửa hàng luôn lập phiếu tiếp nhận, kể cả với lỗi sửa nhanh (Nhóm nghiên cứu). Sau đó thiết bị được xử lý ở một trong ba nơi:

- Tại cửa hàng, đối với lỗi đơn giản xử lý được nhanh.
- Tại bộ phận sửa chữa trong hệ thống.
- Tại trung tâm bảo hành của hãng.

Khi xử lý xong, cửa hàng trả thiết bị cho khách theo phiếu tiếp nhận.

Hướng xử lý xác định tại quầy chỉ là phân loại sơ bộ. Thiết bị còn hạn bảo hành chưa chắc được sửa miễn phí, vì kết luận cuối cùng phụ thuộc vào kết quả kiểm tra kỹ thuật và chính sách của đơn vị xử lý.

### 1.4. Năm quy trình con

1. Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy.
2. Nhận thiết bị và lập phiếu tiếp nhận.
3. Chuyển thiết bị đến nơi xử lý.
4. Kiểm tra kỹ thuật và sửa chữa.
5. Trả thiết bị và hoàn tất yêu cầu.

Ngoài ra có một nhánh ngắn là xử lý nhanh tại cửa hàng. Nhánh này thay cho quy trình con 3 và 4, và vẫn đi qua quy trình con 2 (lập phiếu tiếp nhận) và quy trình con 5 (trả thiết bị).

Năm quy trình con là cách chia để phục vụ nghiên cứu. Đây không phải tên gọi hay cấu trúc quy trình nội bộ đã được CellphoneS xác nhận.

### 1.5. Các kết thúc của quy trình

- Đã trả thiết bị sau khi sửa chữa, bảo hành hoặc thay thế, gồm cả trường hợp xử lý nhanh tại cửa hàng.
- Đã trả thiết bị chưa sửa.
- Khách không giao máy, tự mang máy về.
- Yêu cầu được chuyển sang quy trình đổi trả.
- Khách không đến nhận trong 60 ngày, thiết bị bị tháo gỡ linh kiện để tái chế.
- Chưa thể hoàn tất bàn giao, yêu cầu chuyển sang xử lý ngoại lệ.

Mô hình không đồng nhất "đã bàn giao" với "đã sửa chữa thành công".

## 2. Mô tả các quy trình con

### 2.1. Quy trình con 1: Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy

**Mục đích:** Tiếp nhận nhu cầu của khách, xác định chính sách áp dụng và hướng xử lý sơ bộ để khách quyết định có giao máy hay không.

**Bắt đầu:** Khách hàng phát hiện thiết bị gặp lỗi và đến cửa hàng CellphoneS.

**Các bước:**

1. Trước khi đến cửa hàng, khách có thể gọi tổng đài để hỏi. CellphoneS công bố số 1800.2097, phím 1 cho mua hàng và bảo hành, phím 2 cho hỗ trợ kỹ thuật (Có nguồn: Trang kiểm tra thời hạn bảo hành CellphoneS). Cuộc gọi này chỉ là tư vấn; việc cuộc gọi có tạo hồ sơ trên hệ thống hay không cần khảo sát.
2. Khách mang thiết bị đến cửa hàng và nêu yêu cầu.
3. Nhân viên cửa hàng tiếp nhận yêu cầu và hỏi hiện tượng lỗi. Cách ghi nhận thông tin ở bước này cần khảo sát.
4. Nhân viên kiểm tra thông tin bảo hành của thiết bị ngay tại quầy, khi khách còn giữ máy (Nhóm nghiên cứu). Website CellphoneS có trang tra cứu thời hạn bảo hành bằng số IMEI hoặc Seri cho sản phẩm bán ra tại CellphoneS (Có nguồn: Trang kiểm tra thời hạn bảo hành CellphoneS). Nhân viên dùng trang này hay một công cụ nội bộ khác cần khảo sát.
5. Nhân viên xác định nhóm sản phẩm và quyền lợi tương ứng theo chính sách (Có nguồn: Chính sách bảo hành CellphoneS):

   | Nhóm sản phẩm | Thời gian bảo hành | Quyền lợi | Nơi bảo hành |
   |---|---|---|---|
   | Máy mới | 12 tháng, hoặc dài hơn theo quy định của hãng | Quyền lợi bảo hành của hãng | Trung tâm bảo hành chính hãng |
   | Máy đã kích hoạt bảo hành chính hãng | 12 tháng, gồm thời gian còn lại tại hãng cộng với bảo hành tại CellphoneS | Theo hãng trong thời gian hãng còn bảo hành; sửa chữa, thay thế linh kiện trong thời gian còn lại | Trung tâm bảo hành chính hãng và CellphoneS/ Điện Thoại Vui |
   | Máy cũ | 6 tháng | Sửa chữa, thay thế linh kiện | CellphoneS/ Điện Thoại Vui |

   Chính sách còn có quyền lợi đổi mới miễn phí trong 30 ngày khi thiết bị bị lỗi phần cứng từ phía nhà sản xuất (Có nguồn: Chính sách bảo hành CellphoneS).

6. Nhân viên xác định hướng xử lý sơ bộ. Có bốn hướng:
   - **Xử lý nhanh tại cửa hàng:** dành cho lỗi đơn giản, ví dụ thay miếng dán màn hình hoặc lỗi phần mềm xử lý được nhanh (Nhóm nghiên cứu). Danh mục lỗi cửa hàng được xử lý tại chỗ cần khảo sát.
   - **Sửa chữa hoặc bảo hành trong hệ thống:** thiết bị được chuyển cho bộ phận sửa chữa. Hướng này gồm cả sửa chữa có phí khi thiết bị đã hết bảo hành.
   - **Gửi bảo hành tại hãng:** dành cho thiết bị còn được hãng bảo hành. Khách có thể tự đến trung tâm bảo hành chính hãng, hoặc đến cửa hàng CellphoneS "để được tiếp nhận gửi máy bảo hành chính hãng" (Có nguồn: Chính sách bảo hành CellphoneS).
   - **Đổi mới:** thiết bị trong 30 ngày và có lỗi phần cứng từ nhà sản xuất được chuyển sang quy trình đổi trả. Ai kết luận lỗi thuộc nhà sản xuất tại cửa hàng cần khảo sát.

   Quy tắc phân tuyến chi tiết giữa các hướng chưa được công bố và cần khảo sát.

7. Nhân viên tư vấn hướng xử lý cho khách. Nội dung tư vấn chỉ là phân loại sơ bộ; kết luận sửa miễn phí hay có phí chỉ có sau khi kiểm tra kỹ thuật.
8. Khách hàng quyết định có tiếp tục hay không.

**Kết quả:**

- Khách đồng ý giao máy để xử lý nhanh tại cửa hàng, sửa chữa trong hệ thống hoặc gửi hãng: chuyển sang quy trình con 2.
- Thiết bị đủ điều kiện đổi mới: chuyển sang quy trình đổi trả.
- Khách không tiếp tục: khách mang máy về, gồm cả trường hợp khách chọn tự đến trung tâm bảo hành của hãng. Vì khách chưa giao máy nên không phát sinh thủ tục trả máy.

**Cần khảo sát thêm:**

- Thứ tự thực tế giữa việc kiểm tra bảo hành và việc nhận máy.
- Cách xử lý khi tra cứu không thấy thông tin sản phẩm. Trang tra cứu chỉ hướng dẫn khách liên hệ cửa hàng hoặc tổng đài 1900.6480 (Có nguồn: Trang kiểm tra thời hạn bảo hành CellphoneS).
- Thời gian khách chờ được phục vụ và thời gian kiểm tra bảo hành.

### 2.2. Quy trình con 2: Nhận thiết bị và lập phiếu tiếp nhận

**Mục đích:** Nhận giữ thiết bị và tạo chứng từ để khách nhận lại máy.

**Bắt đầu:** Khách đồng ý giao máy sau khi được tư vấn ở quy trình con 1.

**Các bước:**

1. Nhân viên hướng dẫn khách các việc cần làm trước khi giao máy. Quy định công khai yêu cầu khách thoát các tài khoản cá nhân và tự sao lưu toàn bộ dữ liệu trước khi bàn giao cho nhân viên kỹ thuật. CellphoneS không chịu trách nhiệm về dữ liệu của khách trong mọi trường hợp (Có nguồn: Quy định tiếp nhận của CellphoneS).
2. Nếu khách chưa chuẩn bị xong, chẳng hạn chưa sao lưu hoặc chưa thoát tài khoản, cách xử lý cần khảo sát. Mô hình thể hiện hai khả năng: khách hoàn tất ngay tại quầy rồi tiếp tục, hoặc khách ra về và yêu cầu kết thúc ở trạng thái chưa giao máy. Đây có thể là điểm phát sinh thời gian chờ.
3. Nhân viên nhận thiết bị và ghi nhận thông tin tiếp nhận. Các trường thông tin được ghi (thông tin khách hàng, dòng máy, số IMEI hoặc Serial, tình trạng bên ngoài, phụ kiện đi kèm, hiện tượng lỗi) cần khảo sát. Để tham khảo, CareS công bố việc ghi họ tên, số điện thoại, email và mô tả ban đầu về lỗi (Có nguồn: Hướng dẫn của CareS, chỉ áp dụng cho CareS).
4. Nhân viên lập phiếu tiếp nhận và giao cho khách. Phiếu được lập cho mọi thiết bị cửa hàng nhận, kể cả lỗi sửa nhanh (Nhóm nghiên cứu). Ba quy định về phiếu (Có nguồn: Quy định tiếp nhận của CellphoneS):
   - Khách phải mang theo phiếu tiếp nhận khi lấy máy.
   - CellphoneS không trả máy nếu không có phiếu tiếp nhận.
   - Phiếu có giá trị lấy máy trong 60 ngày.

   Phần mềm lập phiếu, các trường trên phiếu và việc phiếu có liên kết với hệ thống theo dõi tiến độ hay không cần khảo sát.
5. Nếu chính sách áp dụng, cửa hàng cho khách mượn một điện thoại để dùng tạm. Chính sách ghi khách được hỗ trợ miễn phí một điện thoại khác trong thời gian đợi bảo hành, sửa chữa (Có nguồn: Chính sách bảo hành CellphoneS). Điều kiện được mượn, thời điểm giao máy mượn và cách ghi nhận cần khảo sát.

**Kết quả:** Thiết bị đã được cửa hàng nhận giữ và khách có phiếu tiếp nhận; hoặc khách chưa giao máy và yêu cầu kết thúc. Sau khi có phiếu, lỗi xử lý nhanh đi theo nhánh ở mục 2.6, các trường hợp còn lại chuyển sang quy trình con 3.

**Cần khảo sát thêm:** Thời gian lập phiếu, số lần phải bổ sung thông tin và thời điểm hệ thống ghi nhận là đã nhận máy.

### 2.3. Quy trình con 3: Chuyển thiết bị đến nơi xử lý

**Mục đích:** Chuyển thiết bị và thông tin yêu cầu từ cửa hàng đến nơi chịu trách nhiệm kiểm tra, sửa chữa.

**Bắt đầu:** Thiết bị đã được nhận giữ và hướng xử lý là sửa chữa trong hệ thống hoặc gửi hãng. Quy trình con này cũng bắt đầu khi cửa hàng không xử lý nhanh được và khách đồng ý chuyển sang sửa chữa trong hệ thống.

**Hai tuyến:**

- **Chuyển trong hệ thống:** từ cửa hàng sang bộ phận sửa chữa (Điện Thoại Vui, hoặc CareS với thiết bị Apple). Chưa rõ bộ phận sửa chữa làm việc ngay tại cửa hàng hay ở một địa điểm khác, nên việc có phải vận chuyển thiết bị hay không cần khảo sát.
- **Gửi hãng:** từ cửa hàng đến trung tâm bảo hành của hãng. Chính sách có nêu việc cửa hàng tiếp nhận để gửi máy bảo hành chính hãng (Có nguồn: Chính sách bảo hành CellphoneS). Cách gửi và người phụ trách cần khảo sát.

**Các bước** (toàn bộ cần khảo sát):

1. Xác nhận hồ sơ đã đủ thông tin để chuyển.
2. Xác định nơi nhận cụ thể.
3. Bàn giao thiết bị và thông tin yêu cầu.
4. Nơi xử lý xác nhận đã nhận thiết bị.
5. Ghi nhận thời điểm nơi xử lý bắt đầu tiếp nhận.

Mô hình tách hai mốc riêng: thời điểm cửa hàng giao thiết bị đi và thời điểm nơi xử lý thực sự nhận được thiết bị. Khoảng cách giữa hai mốc là đối tượng đo lường quan trọng. Hai mốc này có được ghi nhận trên hệ thống hay không cần khảo sát.

**Tình huống ngoại lệ** (cần khảo sát):

- Nơi xử lý yêu cầu bổ sung thông tin: cửa hàng bổ sung rồi tiếp tục.
- Nơi xử lý không tiếp nhận theo tuyến ban đầu: cửa hàng xác định lại nơi xử lý.
- Không còn nơi xử lý phù hợp: thiết bị được trả lại cho khách ở trạng thái chưa xử lý, theo quy trình con 5.

Mô hình không giả định sự tồn tại của bộ phận kho vận, cấp phê duyệt của quản lý, biên bản giao nhận hay phần mềm quản lý vận chuyển.

**Kết quả:** Nơi xử lý đã nhận thiết bị và thông tin yêu cầu; hoặc thiết bị phải trả lại vì không có nơi xử lý phù hợp.

**Cần khảo sát thêm:** Thời gian thiết bị nằm chờ tại cửa hàng trước khi được chuyển, thời gian chuyển, số lần chuyển tuyến và khả năng theo dõi trách nhiệm của từng bên.

### 2.4. Quy trình con 4: Kiểm tra kỹ thuật và sửa chữa

**Mục đích:** Xác định tình trạng hư hỏng, thống nhất phương án xử lý và thực hiện sửa chữa.

**Bắt đầu:** Nơi xử lý nhận được thiết bị.

#### Trường hợp sửa chữa trong hệ thống (Điện Thoại Vui, CareS)

Phần này dựa trên quy trình hai đơn vị công bố cho khách đến trực tiếp. Quy trình có thể khác nhau theo loại thiết bị và dịch vụ.

1. Bộ phận sửa chữa nhận thiết bị.
2. Kỹ thuật viên kiểm tra thiết bị. Điện Thoại Vui công bố bước "kiểm tra thiết bị" (Có nguồn: Trang chủ Điện Thoại Vui). CareS công bố việc kiểm tra ngoại quan rồi chạy chẩn đoán bằng phần mềm chuyên dụng (Có nguồn: Hướng dẫn của CareS).
3. Kỹ thuật viên xác định phương án xử lý: bảo hành theo chính sách đang áp dụng, hoặc sửa chữa có phí. Đây là lúc phân loại sơ bộ tại quầy được xác nhận hoặc thay đổi.
4. Khi phương án có phát sinh chi phí, bộ phận sửa chữa báo phương án và chi phí để khách quyết định. Điện Thoại Vui công bố "báo giá minh bạch và sửa chữa sau khi bạn đồng ý" (Có nguồn: Trang chủ Điện Thoại Vui). CareS công bố việc thông tin chi phí, điều kiện bảo hành, thời gian sửa chữa cho khách và chỉ sửa sau khi khách đồng ý (Có nguồn: Hướng dẫn của CareS). Với thiết bị nhận qua cửa hàng CellphoneS, mô hình thể hiện bộ phận sửa chữa liên hệ trực tiếp với khách; người liên hệ, kênh liên hệ và cách lưu lại xác nhận của khách cần khảo sát.
5. Khách phản hồi:
   - Khách đồng ý: kỹ thuật viên sửa chữa hoặc thay thế linh kiện.
   - Khách từ chối: dừng sửa chữa, thiết bị được trả lại ở trạng thái chưa sửa. Không có nguồn nào nói về hậu quả khi khách từ chối, ví dụ phí kiểm tra.
6. Khi phương án thuộc diện bảo hành và không phát sinh chi phí, bộ phận sửa chữa tiến hành theo chính sách mà không cần khách xác nhận lại.
7. Hai tình huống có thể kéo dài thời gian (cần khảo sát, hiện không có nguồn):
   - Phải chờ linh kiện.
   - Lỗi phức tạp phải chuyển thiết bị lên trung tâm sửa chữa của Apple.
8. Kỹ thuật viên kiểm tra lại thiết bị sau sửa chữa. Điện Thoại Vui công bố bước "kiểm tra hoàn thiện" (Có nguồn: Trang chủ Điện Thoại Vui). CareS công bố việc kiểm tra lại các chức năng liên quan đến lỗi ban đầu và các tính năng cơ bản trước khi bàn giao (Có nguồn: Hướng dẫn của CareS).
9. Kết quả kiểm tra:
   - Đạt: ghi nhận kết quả và báo cho cửa hàng.
   - Chưa đạt: hướng xử lý tiếp theo (sửa lại, đổi phương án hoặc dừng) cần khảo sát. Mô hình thể hiện một lần xử lý lại và một lối thoát "không thể xử lý", dẫn đến trả thiết bị chưa sửa.
10. Bộ phận sửa chữa chuyển kết quả và thiết bị về cửa hàng. Cách chuyển, cách báo và thời điểm cập nhật trạng thái cần khảo sát.

CareS có công bố thời gian tham khảo: một số lỗi trên iPhone được xử lý trong 1 đến 2 giờ, dịch vụ MacBook có thể mất 7 đến 14 ngày (Có nguồn: Hướng dẫn của CareS). Các con số này chỉ đúng cho CareS và không được dùng làm số liệu chung.

#### Trường hợp gửi bảo hành tại hãng

Bộ nguồn công khai không mô tả quy trình bên trong của trung tâm bảo hành hãng. Mô hình chỉ thể hiện ba việc: cửa hàng gửi thiết bị, cửa hàng chờ, cửa hàng nhận kết quả.

Kết quả từ hãng có thể là đã bảo hành (sửa chữa hoặc thay thế), hoặc từ chối bảo hành. Khi hãng từ chối, việc cửa hàng tư vấn sửa có phí trong hệ thống hay trả máy cho khách cần khảo sát.

**Kết quả:** Kết quả kiểm tra hoặc sửa chữa, tình trạng thiết bị sau xử lý và thông tin cần cho việc trả máy.

**Cần khảo sát thêm:** Thời gian chờ chẩn đoán, thời gian chờ khách đồng ý, thời gian chờ linh kiện, thời gian sửa chữa thực tế, tỷ lệ phải xử lý lại và độ trễ khi chuyển kết quả về cửa hàng.

### 2.5. Quy trình con 5: Trả thiết bị và hoàn tất yêu cầu

**Mục đích:** Trả thiết bị cho khách, giải quyết các nghĩa vụ liên quan và kết thúc yêu cầu.

**Bắt đầu:** Có kết quả từ nơi xử lý hoặc từ nhánh xử lý nhanh tại cửa hàng, hoặc thiết bị phải trả lại vì không xử lý được.

**Các bước:**

1. Cửa hàng nhận kết quả xử lý và nhận lại thiết bị. Cách nhận lại thiết bị cần khảo sát.
2. Cửa hàng đối chiếu kết quả và xác định thiết bị đã sẵn sàng trả. Bước này cần khảo sát.
3. Cửa hàng báo khách đến nhận máy. Nếu khách đang chờ tại cửa hàng, như ở nhánh xử lý nhanh, cửa hàng bỏ qua bước này và bước 4 để trả máy ngay. Người báo, kênh báo và thời điểm được xem là đã báo thành công cần khảo sát. Không có nguồn công khai nào mô tả việc này.
4. Cửa hàng chờ khách đến nhận:
   - Khách đến trong thời hạn 60 ngày của phiếu: tiếp tục bước 5.
   - Quá 60 ngày khách không đến: CellphoneS tháo gỡ linh kiện máy để tái chế (Có nguồn: Quy định tiếp nhận của CellphoneS). Mốc bắt đầu tính 60 ngày cần khảo sát.
5. Nhân viên kiểm tra phiếu tiếp nhận của khách:
   - Có phiếu: tiếp tục bước 6.
   - Không có phiếu: cửa hàng không trả máy (Có nguồn: Quy định tiếp nhận của CellphoneS). Cách xử lý khi khách mất phiếu chưa được công bố. Mô hình không giả định có thể thay phiếu bằng căn cước, mã OTP hay số điện thoại, và kết thúc ở trạng thái chuyển xử lý ngoại lệ.
6. Nhân viên bàn giao thiết bị, khách kiểm tra tình trạng máy. Điện Thoại Vui công bố việc cung cấp thông tin bảo hành khi bàn giao (Có nguồn: Trang chủ Điện Thoại Vui). CareS khuyên khách nên kiểm tra máy ngay tại trung tâm (Có nguồn: Hướng dẫn của CareS). Việc nhân viên cửa hàng CellphoneS kiểm tra máy cùng khách cần khảo sát.
7. Khách quyết định nhận máy:
   - Khách nhận: tiếp tục bước 8.
   - Khách không nhận vì máy còn lỗi: việc bàn giao chưa hoàn tất, yêu cầu chuyển sang xử lý ngoại lệ. Cách xử lý cần khảo sát.
8. Nếu có phí sửa chữa, khách thanh toán. Nơi thu và cách thu cần khảo sát.
9. Nếu khách đã mượn máy dùng tạm, khách trả lại máy mượn. Chính sách ghi khách trả lại máy đã mượn sau khi nhận lại máy của mình (Có nguồn: Chính sách bảo hành CellphoneS). Cách ghi nhận việc trả máy mượn cần khảo sát.
10. Cửa hàng hoàn tất yêu cầu. Thao tác đóng hồ sơ, lưu hồ sơ điện tử và ghi nhận thời gian xử lý cần khảo sát.

**Kết quả:**

- Đã trả thiết bị sau khi sửa chữa, bảo hành hoặc thay thế.
- Đã trả thiết bị chưa sửa.
- Thiết bị bị tháo gỡ linh kiện để tái chế vì quá 60 ngày.
- Chưa thể hoàn tất bàn giao, chuyển xử lý ngoại lệ.

**Cần khảo sát thêm:** Thời gian từ khi sửa xong đến khi cửa hàng nhận lại máy, thời gian từ khi máy sẵn sàng đến khi khách được báo, thời gian khách chờ nhận máy và số hồ sơ chưa thể hoàn tất.

### 2.6. Nhánh xử lý nhanh tại cửa hàng

**Mục đích:** Xử lý ngay tại cửa hàng các lỗi đơn giản, không phải chuyển thiết bị đi nơi khác.

**Bắt đầu:** Thiết bị đã được nhận và có phiếu tiếp nhận ở quy trình con 2, với hướng xử lý sơ bộ là xử lý nhanh tại cửa hàng.

Cửa hàng CellphoneS tự xử lý những lỗi có thể làm nhanh, ví dụ thay miếng dán màn hình hoặc lỗi phần mềm đơn giản (Nhóm nghiên cứu). Hai chi tiết công khai phù hợp với nhận định này: chính sách bảo hành có mục dán màn hình và ghi việc dán PPF chỉ thực hiện ở cửa hàng (Có nguồn: Chính sách bảo hành CellphoneS); trang quy định có tiêu đề gồm cả "cài đặt phần mềm" và nhắc đến nhân viên kỹ thuật (Có nguồn: Quy định tiếp nhận của CellphoneS).

**Các bước:**

1. Nhân viên kỹ thuật của cửa hàng xử lý lỗi. Khách chờ tại cửa hàng hay quay lại sau cần khảo sát.
2. Kết quả xử lý:
   - Xử lý được: thiết bị được trả cho khách theo quy trình con 5, gồm kiểm tra phiếu tiếp nhận, bàn giao và thanh toán nếu có phí.
   - Không xử lý được: nhân viên tư vấn chuyển sang sửa chữa trong hệ thống. Nếu khách đồng ý, thiết bị được chuyển cho bộ phận sửa chữa theo quy trình con 3; nếu không, thiết bị được trả lại ở trạng thái chưa sửa theo quy trình con 5.

Nhánh này vẫn lập phiếu tiếp nhận như mọi trường hợp nhận máy khác (Nhóm nghiên cứu).

**Cần khảo sát thêm:** Danh mục lỗi được xử lý tại chỗ, khoản phí nếu có, người thực hiện và thời gian xử lý.

## 3. Theo dõi trạng thái xuyên suốt quy trình

Theo dõi trạng thái không phải là một quy trình con riêng, vì thông tin trạng thái gắn với nhiều thời điểm từ lúc nhận máy đến lúc bàn giao.

Các kênh tra cứu công khai hiện có:

- Trang kiểm tra thời hạn bảo hành của CellphoneS, tra bằng số IMEI hoặc Seri (Có nguồn: Trang kiểm tra thời hạn bảo hành CellphoneS).
- Liên kết "Tình trạng Bảo Hành" trên website CellphoneS dẫn sang trang tra cứu của Điện Thoại Vui (Có nguồn: Trang kiểm tra thời hạn bảo hành CellphoneS).
- Trang tra cứu của Điện Thoại Vui hướng khách sang trang Smember để xem thông tin sửa chữa, bảo hành, và cho biết khách có thể đăng nhập bằng số điện thoại cùng mã đơn hàng trên phiếu tiếp nhận (Có nguồn: Trang tra cứu Điện Thoại Vui).

Các kênh này cho thấy khách hàng có một nơi tra cứu chung. Chúng chưa cho biết các trạng thái nội bộ, người cập nhật, tần suất cập nhật, mức độ đồng bộ giữa cửa hàng với bộ phận sửa chữa, hay cảnh báo khi yêu cầu bị chậm. Mô hình không mặc định rằng doanh nghiệp đang cập nhật thủ công, dùng nhiều phần mềm không liên thông hoặc thiếu thông báo tự động.

Danh mục trạng thái sau chỉ là đề xuất để khảo sát, không phải trạng thái thực tế trên phần mềm của CellphoneS: đã tiếp nhận thiết bị; đang chuyển đến nơi xử lý; nơi xử lý đã nhận máy; đang kiểm tra; chờ khách xác nhận; chờ linh kiện; đang sửa chữa; đã xử lý xong; sẵn sàng bàn giao; đã bàn giao.

Các câu hỏi cần khảo sát:

- Ai cập nhật trạng thái?
- Trạng thái được cập nhật vào thời điểm nào?
- Trạng thái được cập nhật ở hệ thống nào?
- Cửa hàng và bộ phận sửa chữa có nhìn thấy cùng một trạng thái không?
- Khách hàng được thông báo hay phải tự tra cứu?

## 4. Các khoảng thời gian cần đo

Các khoảng dưới đây là đề xuất đo lường, không phải thời gian thực tế đã được thống kê.

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

Các mốc này giúp tách thời gian làm việc khỏi thời gian thiết bị nằm chờ. Nếu chỉ dùng tổng số ngày từ lúc nhận đến lúc trả thì không biết khâu nào gây chậm.

## 5. Giới hạn của mô hình As-Is

Mô hình được xây dựng từ tài liệu công khai và hiểu biết của nhóm nghiên cứu. Đây không phải quy trình nội bộ chính thức của CellphoneS.

Nhóm nghiên cứu chưa có dữ liệu khảo sát như phỏng vấn nhân viên, phiếu tiếp nhận thật hay hồ sơ đã xử lý. Vì vậy:

- Mọi nội dung ghi "Cần khảo sát" hoặc "Nhóm nghiên cứu" là giả thuyết.
- Bản mô tả không kết luận khâu nào là điểm nghẽn và không đưa ra con số về thời gian chờ.
- Phần cần bổ sung dữ liệu nhiều nhất là quy trình con 3 và việc chuyển kết quả giữa quy trình con 4 với quy trình con 5.

Các nội dung này sẽ được xác định ở giai đoạn đo lường, phân tích quy trình và so sánh với mô hình To-Be.

## 6. Nguồn tài liệu

Các trang được đọc ngày 18/11/2026.

| Tên gọi trong tài liệu | Đường dẫn | Dùng làm căn cứ cho |
|---|---|---|
| Chính sách bảo hành CellphoneS | https://cellphones.com.vn/quy-che-hoat-dong-ung-dung-cellphones/chinh-sach-bao-hanh | Nhóm sản phẩm, nơi bảo hành, đổi mới 30 ngày, máy dùng tạm, gửi bảo hành hãng qua cửa hàng |
| Quy định tiếp nhận của CellphoneS | https://cellphones.com.vn/quy-dinh-ve-tiep-nhan-bao-hanh | Thoát tài khoản và sao lưu, phiếu tiếp nhận, hạn 60 ngày |
| Trang kiểm tra thời hạn bảo hành CellphoneS | https://cellphones.com.vn/kiem-tra-thoi-han-bao-hanh | Tra cứu bằng IMEI hoặc Seri, số tổng đài, liên kết tra cứu tình trạng |
| Trang tra cứu Điện Thoại Vui | https://dienthoaivui.com.vn/tracuu | Tra cứu bằng số điện thoại và mã đơn trên phiếu, chuyển sang Smember |
| Trang chủ Điện Thoại Vui | https://dienthoaivui.com.vn/ | Bốn bước phục vụ: đặt lịch, xác nhận lịch, tiếp nhận và sửa chữa, kiểm tra và bàn giao |
| Hướng dẫn của CareS | https://cares.vn/huong-dan-bao-hanh-va-sua-chua-thiet-bi-apple-tai-cares/ | Năm bước xử lý thiết bị Apple, quan hệ với CellphoneS, thời gian tham khảo |
| Tiêu chuẩn BPMN 2.0.2 | https://www.omg.org/spec/BPMN/2.0.2/PDF | Ký pháp mô hình hóa |

## Phụ lục: Thay đổi so với bản gốc

1. Điện Thoại Vui và CareS được xếp vào trong hệ thống CellphoneS. Bên ngoài chỉ còn trung tâm bảo hành của hãng.
2. Việc kiểm tra bảo hành được đưa lên trước việc nhận máy, để khách quyết định ngay tại quầy. Do đó quy trình con 1 và 2 được chia lại nội dung.
3. Bổ sung nhánh xử lý nhanh tại cửa hàng. Nhánh này vẫn lập phiếu tiếp nhận.
4. Bổ sung quy định 60 ngày của phiếu tiếp nhận và kết thúc "tháo gỡ linh kiện để tái chế".
5. Bổ sung bước cho khách mượn máy dùng tạm; bản gốc chỉ có bước thu lại.
6. Năm nội dung bản gốc ghi là có nguồn nhưng không tìm thấy trên trang nào được chuyển thành "Cần khảo sát": ghi số IMEI, phụ kiện và tình trạng bên ngoài khi nhận máy; chờ linh kiện; chuyển máy lên trung tâm của Apple; kiểm tra máy cùng khách khi trả; báo khách đến nhận máy.
7. Số khoảng thời gian cần đo tăng từ 10 lên 11, do thêm khoảng thiết bị nằm chờ tại cửa hàng trước khi được chuyển đi.
