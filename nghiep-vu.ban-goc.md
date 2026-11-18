# MÔ TẢ QUY TRÌNH TIẾP NHẬN VÀ XỬ LÝ YÊU CẦU BẢO HÀNH - SỬA CHỮA TẠI CELLPHONES

## 1. Tổng quan quy trình nghiệp vụ

Quy trình tiếp nhận và xử lý yêu cầu bảo hành - sửa chữa tại CellphoneS liên quan đến việc tiếp nhận thiết bị gặp sự cố, xác định chính sách áp dụng, chuyển thiết bị đến đơn vị có trách nhiệm xử lý, tiếp nhận kết quả và trả lại thiết bị cho khách hàng. Theo chính sách được CellphoneS công bố, khách hàng có thể mang sản phẩm chính hãng đến trung tâm bảo hành của hãng hoặc thông qua cửa hàng CellphoneS để gửi bảo hành. Đối với một số nhóm sản phẩm, việc bảo hành và sửa chữa có thể liên quan đến CellphoneS hoặc Điện Thoại Vui. [C, S1]

Quy trình có sự tham gia của khách hàng, nhân viên tiếp nhận tại CellphoneS và đơn vị thực hiện bảo hành hoặc sửa chữa. Các bộ phận chịu trách nhiệm điều phối, theo dõi tiến độ và liên hệ khách hàng trong từng trường hợp cụ thể cần được xác minh thêm. Phạm vi nghiên cứu tập trung vào những yêu cầu được tiếp nhận thông qua CellphoneS, bao gồm cả quá trình phối hợp với đơn vị xử lý sau khi cửa hàng đã nhận thiết bị. Trường hợp khách hàng trực tiếp mang máy đến Điện Thoại Vui hoặc trung tâm bảo hành hãng được xem là luồng dịch vụ riêng.

Quy trình bắt đầu khi khách hàng liên hệ hoặc đến CellphoneS yêu cầu hỗ trợ cho thiết bị gặp lỗi. Sau khi khách giao thiết bị và hoàn thành thủ tục tiếp nhận, yêu cầu được xem xét theo chính sách bảo hành tương ứng. Loại sản phẩm, thời hạn bảo hành và tình trạng thiết bị là những yếu tố ảnh hưởng đến hướng xử lý. Việc thiết bị còn hạn bảo hành chưa đủ để khẳng định lỗi sẽ được sửa miễn phí, bởi điều kiện bảo hành còn phụ thuộc vào chính sách của hãng và kết quả kiểm tra thực tế. [C, S1]

Khi đã xác định được hướng xử lý, thiết bị được đưa đến đơn vị bảo hành hoặc sửa chữa phù hợp. Đơn vị kỹ thuật tiến hành kiểm tra tình trạng thiết bị, xác định lỗi và đưa ra phương án xử lý. Với các dịch vụ sửa chữa có phí tại Điện Thoại Vui và CareS được công bố công khai, khách hàng được thông báo về phương án, chi phí trước khi quyết định thực hiện. Sau khi hoàn thành sửa chữa, thiết bị được kiểm tra lại trước khi bàn giao. [C, S5, S6]

Đối với yêu cầu được gửi thông qua CellphoneS, trình tự chuyển thiết bị giữa cửa hàng và đơn vị kỹ thuật, phương thức tiếp nhận kết quả và trách nhiệm cập nhật trạng thái là những nội dung chưa được công bố đầy đủ. [K] Đây là phần cần làm rõ để phân tích thời gian chờ và hiệu quả phối hợp giữa các bộ phận.

Quy trình kết thúc khi thiết bị được trả lại cho khách hàng và việc bàn giao hoàn tất. Kết quả có thể là sửa chữa thành công, bảo hành hoặc thay thế theo chính sách áp dụng, hoặc trả lại thiết bị khi không thực hiện sửa chữa. Việc phân loại kết quả và cách đóng hồ sơ nội bộ cần được kiểm chứng thêm. [K]

Để phục vụ mô hình hóa BPMN, quy trình tổng thể được phân rã thành năm quy trình con:

P1. Tiếp nhận yêu cầu và thiết bị.

P2. Kiểm tra điều kiện bảo hành và xác định hướng xử lý.

P3. Điều phối và chuyển thiết bị đến đơn vị xử lý.

P4. Kiểm tra kỹ thuật và thực hiện sửa chữa.

P5. Trả thiết bị và hoàn tất yêu cầu.

Năm quy trình con là cách phân rã phục vụ nghiên cứu, không phải tên gọi hoặc cấu trúc quy trình nội bộ đã được CellphoneS xác nhận.

## 2. Mô tả các quy trình con

### P1. Tiếp nhận yêu cầu và thiết bị

**Mục đích:** Tiếp nhận nhu cầu của khách hàng và thiết lập căn cứ bàn giao thiết bị để tiếp tục xử lý.

Quy trình bắt đầu khi khách hàng phát hiện thiết bị gặp sự cố và liên hệ CellphoneS để được hỗ trợ. Khách hàng có thể liên hệ kênh chăm sóc khách hàng để hỏi về bảo hành hoặc trực tiếp đến cửa hàng. CellphoneS công bố kênh hỗ trợ mua hàng, bảo hành và hỗ trợ kỹ thuật trên website. Hoạt động liên hệ từ xa chưa đủ căn cứ để xem là một phiếu sửa chữa đã được tạo trên hệ thống. [C, S3]

Đối với trường hợp khách mang thiết bị đến cửa hàng, nhân viên tiếp nhận yêu cầu và hướng dẫn các điều kiện cần thiết trước khi bàn giao. Theo quy định bảo hành, sửa chữa và cài đặt phần mềm của CellphoneS, khách hàng cần đăng xuất tài khoản cá nhân và tự sao lưu dữ liệu trước khi giao thiết bị cho nhân viên kỹ thuật. [C, S2]

Việc ghi nhận thông tin khách hàng, dòng máy, số IMEI hoặc Serial, tình trạng bên ngoài, phụ kiện đi kèm và hiện tượng lỗi là những hoạt động cần khảo sát trong quy trình tiếp nhận thực tế tại CellphoneS. [K] Những thông tin này được ghi nhận trong quy trình công khai của CareS đối với thiết bị Apple, nhưng chưa có căn cứ cho rằng toàn bộ cửa hàng CellphoneS đều sử dụng cùng một biểu mẫu. [C, S6]

Một tình huống cần xử lý là khách hàng chưa chuẩn bị thiết bị theo yêu cầu, chẳng hạn chưa sao lưu dữ liệu hoặc chưa đăng xuất tài khoản. Khi đó, cần xác minh nhân viên hướng dẫn khách hoàn tất tại cửa hàng, yêu cầu quay lại sau hay áp dụng cách xử lý khác. [K] Đây có thể là điểm phát sinh thời gian chờ trước khi thiết bị chính thức được nhận giữ.

Sau khi thiết bị được nhận, phiếu tiếp nhận đóng vai trò là chứng từ để khách hàng nhận lại máy. CellphoneS có quy định yêu cầu khách mang theo phiếu này khi lấy thiết bị. [C, S2] Chưa xác minh được phiếu được lập bằng phần mềm nào, gồm những trường thông tin gì và có được liên kết với hệ thống theo dõi tiến độ hay không. [K]

**Đầu ra của P1:** Thiết bị đã được tiếp nhận cùng phiếu tiếp nhận, hoặc khách hàng được hướng dẫn bổ sung điều kiện cần thiết trước khi giao máy.

**Điểm cần nghiên cứu:** Thời gian chờ được phục vụ, thời gian hoàn tất phiếu, số lần phải bổ sung thông tin và thời điểm được ghi nhận là đã nhận máy.

### P2. Kiểm tra điều kiện bảo hành và xác định hướng xử lý

**Mục đích:** Xác định chính sách có thể áp dụng và hướng xử lý ban đầu đối với yêu cầu đã tiếp nhận.

Đầu vào của quy trình là thông tin thiết bị và hồ sơ tiếp nhận từ P1. Theo chính sách bảo hành của CellphoneS, quyền lợi xử lý khác nhau tùy nhóm sản phẩm. Máy mới được áp dụng quyền lợi bảo hành theo chính sách của hãng. Với máy đã kích hoạt bảo hành chính hãng, phần thời hạn bảo hành còn lại tại hãng và phần bảo hành tại CellphoneS có thể dẫn đến những hình thức xử lý khác nhau. Máy cũ có chính sách bảo hành sửa chữa, thay thế linh kiện theo điều kiện công bố. [C, S1]

Trong mô hình nghiên cứu, bước đầu tiên là đối chiếu thông tin sản phẩm với chính sách liên quan. Website CellphoneS cho phép tra cứu thời hạn bảo hành bằng IMEI hoặc Serial. Đây là căn cứ để mô hình hóa hoạt động kiểm tra thông tin bảo hành, nhưng chưa chứng minh nhân viên bắt buộc phải sử dụng trang tra cứu công khai trong nghiệp vụ nội bộ. [C, S3; K]

Sau khi xác định nhóm sản phẩm và quyền lợi tương ứng, yêu cầu được phân loại sơ bộ để lựa chọn hướng xử lý. Trường hợp thuộc trách nhiệm của hãng sẽ được hướng dẫn hoặc chuyển theo tuyến bảo hành chính hãng. Những trường hợp được CellphoneS hoặc Điện Thoại Vui hỗ trợ sẽ đi theo chính sách và phạm vi dịch vụ phù hợp. Việc có nhiều đơn vị xử lý được xác nhận trong bảng chính sách bảo hành, còn quy tắc phân tuyến chi tiết giữa các đơn vị chưa được công khai. [C, S1; K]

Cần phân biệt việc xác định hướng xử lý ban đầu với quyết định chấp nhận bảo hành cuối cùng. Một thiết bị vẫn còn thời hạn bảo hành có thể cần được kiểm tra kỹ thuật để xác định nguyên nhân hư hỏng, tình trạng tác động ngoại lực và các điều kiện loại trừ. Vì vậy, trong mô hình As-Is sơ bộ, kết quả P2 chỉ nên được xem là phân loại ban đầu. Kết luận về sửa chữa miễn phí hay có phí sẽ được xác định theo kết quả kiểm tra và chính sách của đơn vị có thẩm quyền. [C, S1, S6]

Nếu yêu cầu không thuộc chính sách bảo hành miễn phí, chưa thể kết luận khách hàng phải nhận lại máy ngay. Tùy loại dịch vụ, khách có thể được tư vấn sửa chữa có phí hoặc một phương án xử lý khác. Trường hợp khách không tiếp tục dịch vụ cũng cần được mô hình hóa thành một nhánh kết thúc có trả lại thiết bị. [K]

Ngoài ra, CellphoneS công bố chính sách đổi mới hoặc đổi trả đối với một số trường hợp đủ điều kiện. Đây là một hướng xử lý khác với sửa chữa. Nếu phát sinh tình huống này, mô hình nên kết nối đến quy trình đổi trả riêng thay vì tự động chuyển thiết bị sang P4. [C, S1]

**Đầu ra của P2:** Yêu cầu đã được xác định hướng xử lý sơ bộ, chẳng hạn gửi bảo hành hãng, chuyển đến đơn vị sửa chữa phù hợp, chuyển sang quy trình đổi trả hoặc không tiếp tục xử lý.

**Điểm cần nghiên cứu:** Thời gian xác minh bảo hành, việc đối chiếu thông tin giữa các hệ thống và số trường hợp phải phân loại lại sau khi có kết quả kiểm tra kỹ thuật.

### P3. Điều phối và chuyển thiết bị đến đơn vị xử lý

**Mục đích:** Chuyển yêu cầu và thiết bị từ điểm tiếp nhận đến nơi chịu trách nhiệm kiểm tra hoặc sửa chữa.

Quy trình bắt đầu sau khi yêu cầu đã có hướng xử lý sơ bộ. Theo chính sách công khai, một số sản phẩm được xử lý tại trung tâm bảo hành chính hãng, trong khi một số trường hợp có thể được hỗ trợ bởi CellphoneS hoặc Điện Thoại Vui. Do đó, khâu điều phối cần xác định đơn vị phù hợp với loại sản phẩm, chính sách bảo hành và phạm vi dịch vụ. [C, S1]

Đối với yêu cầu gửi qua cửa hàng CellphoneS, về mặt nghiệp vụ phải có sự chuyển giao trách nhiệm xử lý giữa điểm tiếp nhận và đơn vị tiếp theo. [K] Tuy nhiên, tài liệu công khai chưa cho biết thiết bị được tập kết hay gửi trực tiếp, ai có quyền chỉ định nơi xử lý, bộ phận nào quản lý vận chuyển và việc bàn giao được xác nhận bằng hình thức nào.

Để nghiên cứu đầy đủ, cần kiểm tra liệu quá trình chuyển giao có gồm các hoạt động: xác nhận hồ sơ đủ thông tin, xác định đơn vị nhận, bàn giao thiết bị, xác nhận đơn vị xử lý đã nhận và ghi nhận thời điểm bắt đầu xử lý. Đây là các hoạt động cần khảo sát, chưa được xác nhận là những bước bắt buộc trong quy trình CellphoneS. [K]

Quy trình cũng cần tính đến trường hợp đơn vị tiếp nhận kỹ thuật yêu cầu bổ sung thông tin, chuyển sang một đơn vị xử lý khác hoặc không thể tiếp nhận theo tuyến ban đầu. Cách giải quyết các tình huống này phải được xác minh thông qua nhân viên phụ trách hoặc hồ sơ xử lý thực tế. [K]

Đặc biệt, phải phân biệt thời điểm cửa hàng bàn giao thiết bị với thời điểm đơn vị kỹ thuật thực sự nhận được thiết bị. Khoảng thời gian giữa hai mốc này là một đối tượng đo lường quan trọng. Nếu không có dữ liệu xác nhận hai mốc thời gian, không thể kết luận thời gian chờ nằm ở khâu vận chuyển, khâu tiếp nhận kỹ thuật hay một nguyên nhân khác.

**Đầu ra của P3:** Thiết bị và thông tin yêu cầu được chuyển đến đơn vị xử lý theo hướng đã xác định. Mốc xác nhận đã tiếp nhận của đơn vị xử lý cần khảo sát. [K]

**Điểm cần nghiên cứu:** Thời gian chờ bàn giao, thời gian chuyển thiết bị, số lần chuyển tuyến và khả năng theo dõi trách nhiệm của từng bên trong quá trình chuyển giao.

### P4. Kiểm tra kỹ thuật và thực hiện sửa chữa

**Mục đích:** Xác định tình trạng hư hỏng, thống nhất phương án xử lý và thực hiện nghiệp vụ kỹ thuật.

Phần này có căn cứ công khai tương đối rõ đối với dịch vụ sửa chữa tại Điện Thoại Vui và trung tâm bảo hành Apple CareS. Tuy nhiên, quy trình kỹ thuật có thể khác nhau theo loại thiết bị, dịch vụ và đơn vị thực hiện. Không sử dụng toàn bộ nội dung sau đây để khẳng định quy trình của mọi trung tâm bảo hành hãng.

Khi đơn vị kỹ thuật nhận thiết bị, kỹ thuật viên thực hiện kiểm tra để đánh giá tình trạng và xác định nguyên nhân lỗi. Đối với dịch vụ sửa chữa được Điện Thoại Vui công bố, quá trình này có thể gồm kiểm tra các chức năng liên quan, chẩn đoán bộ phận hư hỏng và đề xuất phương án sửa hoặc thay thế linh kiện. Đối với CareS, tài liệu công khai mô tả thêm hoạt động kiểm tra ngoại quan và chẩn đoán bằng phần mềm chuyên dụng dành cho thiết bị Apple. [C, S5, S6]

Kết quả kiểm tra là cơ sở xác định phương án xử lý thực tế. Thiết bị có thể đủ điều kiện bảo hành theo chính sách áp dụng hoặc cần sửa chữa có phí. Với các dịch vụ có phí được công bố, kỹ thuật viên hoặc nhân viên tư vấn thông báo phương án và chi phí cho khách hàng trước khi tiến hành sửa chữa. Chỉ khi khách hàng đồng ý, công việc sửa chữa có phí mới được thực hiện. [C, S5, S6]

Nếu khách hàng không đồng ý phương án hoặc mức chi phí được đề xuất, yêu cầu cần chuyển sang hướng xử lý không tiếp tục sửa chữa và trả lại thiết bị. [K] Cần xác minh hình thức xác nhận ý kiến khách hàng, bộ phận liên hệ và việc lưu lại lịch sử phê duyệt.

Khi phương án được chấp thuận, kỹ thuật viên tiến hành sửa chữa hoặc thay thế linh kiện theo tình trạng thiết bị. Tại CareS, việc có sẵn linh kiện là một yếu tố ảnh hưởng đến thời gian hoàn thành. Nguồn công khai còn đề cập đến trường hợp phải chuyển thiết bị đến trung tâm sửa chữa của Apple khi lỗi phức tạp. Đây là các trường hợp được xác nhận cho phạm vi dịch vụ CareS, chưa phải quy tắc chung của mọi thiết bị được tiếp nhận tại CellphoneS. [C, S6]

Sau khi sửa chữa, đơn vị kỹ thuật kiểm tra lại các chức năng liên quan để đánh giá kết quả. Điện Thoại Vui và CareS đều công bố hoạt động kiểm tra thiết bị trước bàn giao. [C, S5, S6] Nếu kiểm tra chưa đạt, về mặt mô hình nghiệp vụ cần thể hiện hướng xử lý tiếp theo. Việc sửa lại, thay đổi phương án, dừng xử lý hoặc thông báo khách hàng là những nhánh cần được xác minh cụ thể. [K]

Kết quả cuối cùng của P4 cần được chuyển đến bộ phận hoặc đơn vị chịu trách nhiệm trả thiết bị cho khách. Đối với máy được gửi từ CellphoneS đến đơn vị khác, phương thức gửi kết quả, việc thông báo thiết bị đã hoàn tất và thời điểm cập nhật trạng thái chưa được xác minh. [K]

**Đầu ra của P4:** Kết quả kiểm tra hoặc sửa chữa, tình trạng thiết bị sau xử lý và thông tin cần thiết cho việc trả máy.

**Điểm cần nghiên cứu:** Thời gian chờ chẩn đoán, thời gian chờ khách hàng đồng ý, thời gian chờ linh kiện, thời gian sửa chữa thực tế, tỷ lệ phải xử lý lại và độ trễ truyền kết quả về điểm tiếp nhận.

### P5. Trả thiết bị và hoàn tất yêu cầu

**Mục đích:** Hoàn thành việc trả thiết bị cho khách hàng, xử lý các nghĩa vụ liên quan và kết thúc yêu cầu.

Quy trình bắt đầu khi có kết quả từ đơn vị xử lý. Đối với trường hợp máy được gửi qua CellphoneS và được trả lại tại cửa hàng, cần xác minh cách cửa hàng nhận lại thiết bị, đối chiếu kết quả sửa chữa và xác định thiết bị đã sẵn sàng bàn giao. [K] Tài liệu công khai chưa xác nhận đầy đủ trình tự vận chuyển ngược từ trung tâm sửa chữa về từng cửa hàng.

Việc thông báo khách hàng đến nhận máy được ghi nhận trong các mô tả công việc công khai của Điện Thoại Vui. Trường hợp yêu cầu được tiếp nhận tại CellphoneS cần khảo sát thêm ai chịu trách nhiệm thông báo, thông báo bằng kênh nào và thời điểm nào được xem là đã thông báo thành công. [C, K]

Khi khách hàng đến nhận lại thiết bị tại CellphoneS, phiếu tiếp nhận là chứng từ quan trọng. Quy định công khai của doanh nghiệp yêu cầu khách hàng mang phiếu khi lấy máy và nêu việc không trả thiết bị nếu thiếu phiếu. [C, S2] Các bước xử lý ngoại lệ trong trường hợp khách làm mất phiếu chưa được công bố đầy đủ, vì vậy không tự giả định rằng có thể thay thế bằng CCCD, OTP hoặc xác minh số điện thoại. [K]

Khách hàng nhận lại thiết bị và có thể kiểm tra tình trạng hoạt động trước khi hoàn tất việc nhận máy. Việc kiểm tra cùng khách hàng và cung cấp thông tin bảo hành sau sửa chữa có căn cứ trong quy trình công khai của Điện Thoại Vui và CareS. Với yêu cầu được trả tại CellphoneS, trình tự kiểm tra thực tế vẫn cần xác nhận. [C, S5, S6; K]

Nếu có khoản phí sửa chữa, việc thanh toán cần được thực hiện theo chính sách của đơn vị cung cấp dịch vụ. Nếu khách hàng được hỗ trợ mượn thiết bị trong thời gian chờ theo chính sách áp dụng, cần giải quyết việc hoàn trả thiết bị đã mượn. CellphoneS có công bố chính sách hỗ trợ máy dùng tạm trong thời gian chờ bảo hành - sửa chữa. [C, S1] Cần xác minh điều kiện áp dụng cho từng trường hợp và cách ghi nhận việc trả máy mượn. [K]

Trường hợp thiết bị không được sửa chữa, quy trình vẫn cần ghi nhận kết quả xử lý và hoàn tất việc trả lại máy cho khách hàng. Không nên đồng nhất kết quả "đã bàn giao" với "đã sửa chữa thành công".

Sau bàn giao, yêu cầu được xem là kết thúc trong phạm vi nghiên cứu. Việc cập nhật trạng thái hoàn tất, lưu hồ sơ điện tử, ghi nhận thời gian xử lý và lưu lịch sử trao đổi là những nội dung cần khảo sát trên hệ thống đang sử dụng. [K]

**Đầu ra của P5:** Khách hàng đã nhận lại thiết bị, các nghĩa vụ phát sinh được giải quyết và yêu cầu được kết thúc hoặc chuyển sang quy trình xử lý phát sinh khác.

**Điểm cần nghiên cứu:** Thời gian từ khi đơn vị kỹ thuật hoàn thành đến khi cửa hàng nhận được kết quả, thời gian từ khi máy sẵn sàng đến khi khách được thông báo, thời gian chờ nhận máy và số hồ sơ chưa thể hoàn tất.

## 3. Hoạt động theo dõi trạng thái xuyên suốt quy trình

Việc theo dõi trạng thái không nên tách thành một quy trình sửa chữa độc lập vì thông tin trạng thái gắn với nhiều thời điểm trong suốt vòng đời yêu cầu, từ tiếp nhận đến bàn giao.

CellphoneS có công bố trang kiểm tra thời hạn bảo hành và liên kết tra cứu tình trạng bảo hành - sửa chữa. Điện Thoại Vui có trang tra cứu sử dụng số điện thoại và mã đơn trên phiếu tiếp nhận. Điều này cho thấy đã tồn tại các kênh tra cứu thông tin liên quan. [C, S3, S4]

Tuy vậy, chưa có căn cứ xác định toàn bộ trạng thái nội bộ, tần suất cập nhật, mức độ đồng bộ giữa CellphoneS với đơn vị sửa chữa hoặc các cảnh báo khi yêu cầu bị chậm. Không thể mặc định rằng doanh nghiệp đang cập nhật thủ công, dùng nhiều phần mềm không liên thông hoặc thiếu thông báo tự động. [K]

Trong quá trình nghiên cứu, cần thu thập thời điểm tiếp nhận yêu cầu, thời điểm giao thiết bị, thời điểm chuyển cho đơn vị xử lý, thời điểm đơn vị kỹ thuật nhận máy, thời điểm hoàn thành chẩn đoán, thời điểm khách đồng ý phương án, thời điểm sửa chữa xong, thời điểm thiết bị sẵn sàng trả, thời điểm khách được thông báo và thời điểm bàn giao thực tế.

Những mốc này sẽ giúp phân biệt thời gian thực hiện công việc với thời gian thiết bị nằm chờ. Nếu chỉ sử dụng tổng số ngày từ lúc nhận đến lúc trả máy thì chưa thể biết chính xác khâu nào tạo ra chậm trễ.

## 4. Giới hạn của mô hình As-Is

Mô hình trên được xây dựng bằng phương pháp phân tích tài liệu công khai, kết hợp phân rã nghiệp vụ theo các giai đoạn xử lý yêu cầu. Các hoạt động đã có căn cứ công khai được phân biệt với những hoạt động cần kiểm chứng qua khảo sát.

Để hoàn thiện As-Is thực tế của CellphoneS, cần bổ sung dữ liệu từ nhân viên tiếp nhận, nhân viên theo dõi bảo hành, đơn vị sửa chữa và hồ sơ xử lý đã hoàn tất. Dữ liệu này đặc biệt cần thiết ở P3 và phần trao đổi kết quả giữa P4 với P5.

Do chưa có dữ liệu vận hành, bản mô tả chưa kết luận khâu nào là điểm nghẽn thực tế và chưa đưa ra các con số về thời gian chờ. Đây là những nội dung sẽ được xác định ở giai đoạn đo lường, phân tích quy trình và so sánh với mô hình To-Be.