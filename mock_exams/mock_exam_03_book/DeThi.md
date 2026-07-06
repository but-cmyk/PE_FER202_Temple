# BÀI THI TEST PRACTICE — FER202
## Book Store Inventory

> **Thời gian:** 90 phút  
> **Tổng điểm:** 10 điểm  
> **Công cụ:** VS Code, trình duyệt, tài liệu được phép mở trên máy 

---

## Giới thiệu bài thi 

Bạn nhận được một project **Book Store App** đã được dựng sẵn cấu trúc. Project sử dụng:
- React 18 + Vite
- React-Bootstrap 2.x
- axios + json-server (port 3001)
- React Router v6
- Context API + useReducer

**Khởi động project:**
```bash
npm install
npm start        # chạy đồng thời json-server + Vite dev server
```

Tài khoản test: `admin / admin123` (role: Admin) và `user1 / user123` (role: User)

---

## Bảng điểm tổng quan

| TODO | Chức năng | File | Điểm |
|------|-----------|------|------|
| TODO-01 | Alert khi đăng nhập sai / Phân quyền giao diện theo role | `Login.jsx` + `BookList.jsx` | 1,0 |
| TODO-02 | Hiển thị thông tin người dùng trên Navbar | `AppNavbar.jsx` | 1,0 |
| TODO-03 | Nút Logout hoặc Dropdown sắp xếp | `AppNavbar.jsx` + `BookList.jsx` | 1,0 |
| TODO-04 | Dropdown Form thêm mới | `AddBook.jsx` | 1,0 |
| TODO-05 | Trang chi tiết thực thể (Detail Page) | `BookDetail.jsx` | 1,0 |
| TODO-06 | Xóa thực thể kèm ModalConfirm | `BookRow.jsx` | 1,0 |
| TODO-07 | Định dạng cột dữ liệu trên dòng | `BookRow.jsx` | 0,5 |
| TODO-08 | Footer hiển thị động | `AppFooter.jsx` | 0,5 |
| TODO-09 | Trang 404 hoặc Fetch song song | `NotFound.jsx` hoặc `GenreDetail.jsx` | 1,0 |
| TODO-10A | Thêm danh mục | `ManageGenres.jsx` | 1,0 |
| TODO-10B | Chặn xóa danh mục đang sử dụng | `ManageGenres.jsx` | 1,0 |
| **Tổng** | | | **10,0** |

---

## Chi tiết từng TODO

### TODO-01 — Đăng nhập & Phân quyền
- **Login.jsx**: Trong khối catch, dispatch lỗi để hiện Alert.
- **BookList.jsx**: Lấy user từ AuthContext. Nếu role != 'Admin' thì ẩn nút "+ Add" và truyền canManage={false} xuống Row để ẩn nút Delete.

### TODO-02 — Navbar hiển thị thông tin
- Hiển thị email hoặc fullName (bold, white) kèm Badge hiển thị role của user khi đã đăng nhập.

### TODO-03 — Dropdown sắp xếp
- Thêm dropdown sắp xếp (Sort by) Name / Pages / Price (tăng/giảm). Cập nhật phân trang và set page = 1.

### TODO-04 — Dropdown động Form thêm mới
- Gọi fetchGenres() trong useEffect để đổ dữ liệu vào Dropdown chọn loại. Option đầu tiên là placeholder có value="".

### TODO-05 — Chi tiết thực thể
- Gọi API fetchBookById, hiển thị Spinner khi loading, hiển thị Alert khi lỗi, hiển thị chi tiết thực thể và có nút Back.

### TODO-06 — Xóa thực thể với ModalConfirm
- Nhấn Delete mở ModalConfirm xác nhận, xác nhận thì gọi DELETE API và đóng modal.

### TODO-07 — Định dạng cột Row
- Hiển thị tiền tệ VND đúng định dạng ở cột Price.

### TODO-08 — Footer hiển thị động
- Thẻ footer lấy động các thông tin logo, copyright, version, course từ about.js.

### TODO-09 — Trang 404 hoặc Fetch song song
- Tùy biến trang NotFound hiển thị "404", "Page Not Found", nút Back to Home; hoặc trang chi tiết danh mục fetch song song bằng Promise.all.

### TODO-10A & 10B — Quản lý danh mục
- Thêm mới danh mục có validation length >= 3 và uniqueness.
- Xóa danh mục phải gọi API kiểm tra xem có thực thể con nào đang liên kết không, nếu có thì báo lỗi chặn xóa.
