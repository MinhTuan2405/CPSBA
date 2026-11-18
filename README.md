# CPSBA

Mô hình BPMN As-Is của quy trình tiếp nhận và xử lý yêu cầu bảo hành, sửa chữa thiết bị qua cửa hàng CellphoneS.

Đây là mô hình sơ bộ, dựng từ tài liệu công khai và hiểu biết của nhóm nghiên cứu. Đây không phải quy trình nội bộ chính thức của CellphoneS.

## Nội dung

| Thư mục hoặc tệp | Nội dung |
|---|---|
| `bpmn/` | Sáu tệp BPMN 2.0, mở bằng Camunda Modeler hoặc bpmn.io |
| `png/`, `svg/` | Ảnh của sáu sơ đồ |
| `description/` | Mô tả nghiệp vụ của từng sơ đồ As-Is |
| `nghiep-vu.md` | Bản mô tả nghiệp vụ As-Is đầy đủ |
| `CellphoneS_AsIs_danh-muc.md` | Danh mục bước theo mức độ chắc chắn, bảng đối chiếu nguồn, danh sách cần khảo sát, kết quả kiểm tra |
| `promptASIS.md` | Đề bài và quy tắc vẽ sơ đồ |
| `tools/` | Bộ lệnh dựng, kiểm tra và xuất ảnh sơ đồ |

## Sáu sơ đồ

| Sơ đồ | Mô tả nghiệp vụ | Tệp BPMN |
|---|---|---|
| Tổng quan | [CPS_asis_Level0](description/CPS_asis_Level0.md) | [Level0](bpmn/CellphoneS_AsIs_Level0.bpmn) |
| 1. Tiếp nhận yêu cầu và kiểm tra bảo hành tại quầy | [CPS_asis_P1](description/CPS_asis_P1.md) | [P1](bpmn/CellphoneS_AsIs_P1.bpmn) |
| 2. Nhận thiết bị và lập phiếu tiếp nhận | [CPS_asis_P2](description/CPS_asis_P2.md) | [P2](bpmn/CellphoneS_AsIs_P2.bpmn) |
| 3. Chuyển thiết bị đến nơi xử lý | [CPS_asis_P3](description/CPS_asis_P3.md) | [P3](bpmn/CellphoneS_AsIs_P3.bpmn) |
| 4. Kiểm tra kỹ thuật và sửa chữa | [CPS_asis_P4](description/CPS_asis_P4.md) | [P4](bpmn/CellphoneS_AsIs_P4.bpmn) |
| 5. Trả thiết bị và hoàn tất yêu cầu | [CPS_asis_P5](description/CPS_asis_P5.md) | [P5](bpmn/CellphoneS_AsIs_P5.bpmn) |

![Sơ đồ tổng quan](png/CellphoneS_AsIs_Level0.png)

## Dựng lại sơ đồ

Cần Node.js và trình duyệt Chrome hoặc Edge.

```
cd tools
npm install
node build.mjs
node check.mjs
node render.mjs
```
