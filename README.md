# 🚀 Bộ 20 Đề Thi Thử Practical Exam (PE) — Môn FER202 (ReactJS)

Chào mừng bạn đến với kho lưu trữ **20 bộ đề thi thử Practical Exam (PE) môn FER202** bám sát **99% cấu trúc đề thi chính thức** của Đại học FPT. 

Kho lưu trữ này được thiết kế nhằm giúp học viên luyện tập phản xạ đọc hiểu Database Schema, giải quyết các bẫy kỹ thuật phổ biến, và tự đánh giá năng lực lập trình ReactJS thông qua hệ thống chấm điểm tự động.

---

## 📂 Cấu Trúc Kho Lưu Trữ

Bộ đề thi thử được tổ chức trong thư mục `mock_exams/`, chia làm 20 đề thi độc lập tương ứng với 20 chủ đề nghiệp vụ thực tế:

```
mock_exams/
├── mock_exam_01_hotel/
│   ├── DeThi.md            # Đề bài chi tiết bằng Tiếng Việt
│   ├── template/           # Mã nguồn đề bài (chưa làm, có các comment // TODO-NN)
│   └── solution/           # Đáp án mẫu hoàn chỉnh (Pass 100% test cases)
├── mock_exam_02_pet/
│   ├── DeThi.md
│   ├── template/
│   └── solution/
...
└── mock_exam_20_freelance/
```

---

## 🛠️ Công Nghệ Sử Dụng Trong Bộ Đề
Mỗi đề thi được thiết lập sẵn môi trường chuẩn hóa bao gồm:
*   **Core:** React 18 + Vite (khởi chạy cực nhanh).
*   **Styling:** React-Bootstrap 2.x (UI hiện đại, responsive).
*   **Routing:** React Router v6.
*   **State Management:** React Context API + hook `useReducer`.
*   **Mock API:** `axios` + `json-server` (chạy trên port 3001).
*   **Testing:** Jest & React Testing Library (chấm điểm tự động).

---

## 📖 Hướng Dẫn Các Bước Thực Hành Cho Học Viên

Để luyện tập đạt hiệu quả cao nhất, học viên nên thực hiện theo quy trình sau:

### Bước 1: Chọn đề thi và Đọc yêu cầu
1. Mở thư mục đề thi muốn luyện tập (ví dụ: `mock_exams/mock_exam_01_hotel`).
2. Đọc kỹ mô tả nghiệp vụ và các yêu cầu TODO từ 1 đến 10 trong tệp `DeThi.md`.

### Bước 2: Khởi động dự án thực hành
1. Mở terminal tại thư mục `template/` của đề đó.
2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi động đồng thời cả frontend dev server và mockup backend:
   ```bash
   npm start
   ```
   *(Lệnh này sẽ chạy song song Vite tại `http://localhost:5173` và json-server tại `http://localhost:3001`).*

### Bước 3: Chạy hệ thống chấm điểm tự động (Tự đánh giá)
1. Trong khi dự án đang chạy, mở một terminal mới tại thư mục `template/` và chạy lệnh:
   ```bash
   npm test
   ```
2. Ban đầu, các test case tương ứng với các câu TODO chưa làm sẽ báo **FAIL (Đỏ)**.
3. Học viên tìm các từ khóa `// TODO-NN` trong mã nguồn thư mục `template/src/` để viết code hoàn thiện chức năng. Sau khi hoàn thành đúng, bài kiểm tra tương ứng sẽ chuyển sang **PASS (Xanh)**.

### Bước 4: Đối chiếu đáp án
Nếu gặp khó khăn hoặc muốn tham khảo giải thuật tối ưu chuẩn điểm tuyệt đối, học viên mở thư mục `solution/` của đề đó để so sánh mã nguồn. Thư mục `solution/` đã được viết hoàn thiện và đảm bảo **PASS 100%** toàn bộ các bài test.

---

## 📊 Ma Trận Đề Thi Thử (20 Chủ Đề Nghiệp Vụ)

Học viên có thể lựa chọn đề thi để luyện tập tập trung vào các biến thể kỹ thuật mong muốn:

| Đề số | Nghiệp Vụ (Domain) | Biến thể Login | Dữ liệu Navbar | Sắp Xếp / Tìm kiếm | Form Add | Chi tiết (Detail) | Delete & Modal | Tính năng nâng cao (TODO-09/10) |
|---|---|---|---|---|---|---|---|---|
| **Đề 01** | Hotel Manager | Phân quyền List | FullName + Badge | Sắp xếp giá | Dropdown động | VND format | Phân quyền xóa | Category constraint (Chặn xóa) |
| **Đề 02** | Pet Clinic | Chặn cứng Admin | Email + Badge | Thanh tìm kiếm động | Validation Form | Định dạng ngày tháng | Row xóa thường | Category Promise.all (Fetch song song) |
| **Đề 03** | Book Store | Phân quyền List | Username + Badge | Sắp xếp năm | Dropdown động | VND format | Phân quyền xóa | NotFound 404 Page |
| **Đề 04** | Product Shop | Chặn cứng Admin | FullName + Badge | Sắp xếp đánh giá | Dropdown động | VND format | Row xóa thường | Category constraint (Chặn xóa) |
| **Đề 05** | Student Tracker | Phân quyền List | Email + Badge | Thanh tìm kiếm động | Validation Form | Điểm số (GPA) | Phân quyền xóa | Category Promise.all (Fetch song song) |
| **Đề 06** | Movie Playlist | Chặn cứng Admin | Username + Badge | Sắp xếp IMDb | Dropdown động | Định dạng thời gian | Row xóa thường | NotFound 404 Page |
| **Đề 07** | Employee Directory | Phân quyền List | FullName + Badge | Sắp xếp lương | Dropdown động | VND + Date format | Phân quyền xóa | Category constraint (Chặn xóa) |
| **Đề 08** | Event Planner | Chặn cứng Admin | Email + Badge | Thanh tìm kiếm động | Validation Form | Định dạng ngày tháng | Row xóa thường | Category Promise.all (Fetch song song) |
| **Đề 09** | Recipe Cookbook | Phân quyền List | Username + Badge | Sắp xếp thời gian | Dropdown động | Độ khó (Level) | Phân quyền xóa | Category constraint (Chặn xóa) |
| **Đề 10** | IT Job Board | Chặn cứng Admin | FullName + Badge | Sắp xếp lương | Dropdown động | Khoảng lương (VND) | Row xóa thường | NotFound 404 Page |
| **Đề 11** | Flight Reservation | Phân quyền List | Email + Badge | Sắp xếp giá vé | Validation Form | Định dạng ngày tháng | Phân quyền xóa | Category constraint (Chặn xóa) |
| **Đề 12** | Music Playlist | Chặn cứng Admin | Username + Badge | Sắp xếp lượt nghe | Dropdown động | Lượt nghe (k) | Row xóa thường | Category Promise.all (Fetch song song) |
| **Đề 13** | Task Tracker | Phân quyền List | FullName + Badge | Thanh tìm kiếm động | Dropdown động | Mức độ ưu tiên | Phân quyền xóa | Category constraint (Chặn xóa) |
| **Đề 14** | Car Showroom | Chặn cứng Admin | Email + Badge | Sắp xếp giá | Validation Form | VND format | Row xóa thường | NotFound 404 Page |
| **Đề 15** | Supermarket | Phân quyền List | Username + Badge | Sắp xếp số lượng | Dropdown động | Định dạng ngày tháng | Phân quyền xóa | Category Promise.all (Fetch song song) |
| **Đề 16** | Doctor Booking | Chặn cứng Admin | FullName + Badge | Thanh tìm kiếm động | Validation Form | Định dạng ngày tháng | Row xóa thường | Category constraint (Chặn xóa) |
| **Đề 17** | Real Estate | Phân quyền List | Email + Badge | Sắp xếp giá đất | Dropdown động | VND format | Phân quyền xóa | Category Promise.all (Fetch song song) |
| **Đề 18** | Gym Scheduler | Chặn cứng Admin | Username + Badge | Sắp xếp sức chứa | Validation Form | Định dạng thời gian | Row xóa thường | NotFound 404 Page |
| **Đề 19** | Online Course | Phân quyền List | FullName + Badge | Sắp xếp số tiết | Dropdown động | Số thứ tự bài học | Phân quyền xóa | Category constraint (Chặn xóa) |
| **Đề 20** | Freelance Platform | Chặn cứng Admin | Email + Badge | Thanh tìm kiếm động | Validation Form | Khoảng giá (VND) | Row xóa thường | Category Promise.all (Fetch song song) |

---

## 💡 Lời Khuyên Khi Luyện Đề
1.  **Đọc kỹ đề bài:** Đề thi chính thức chấm bằng công cụ tự động, các từ khóa trong Test Case (ví dụ: `placeholder`, `aria-label`, `role="alert"`) phải khớp hoàn toàn với đề bài yêu cầu.
2.  **Quản lý thời gian:** Mỗi đề thi nên được hoàn thành trong vòng **90 phút**. Hãy cố gắng làm tuần tự từ TODO-01 đến TODO-10 mà không xem đáp án trước.
3.  **Ép kiểu dữ liệu khi so sánh:** Các API từ `json-server` có thể trả về ID dạng số hoặc chuỗi. Hãy luôn ép kiểu `String(id)` trước khi so sánh (`===`) để tránh lỗi logic lúc chạy API.

*Chúc các bạn học viên ôn tập tốt và đạt kết quả cao trong kỳ thi PE sắp tới!*
