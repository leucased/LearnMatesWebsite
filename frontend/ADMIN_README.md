# Giao diện Admin LearnMates

## Tổng quan
Giao diện admin đã được tạo thành công với đầy đủ các tính năng theo yêu cầu:

### 1. Header (Thanh trên cùng)
- **Logo LearnMates**: Click sẽ về Bảng điều khiển
- **Thanh tìm kiếm nhanh**: Tìm kiếm trong hệ thống
- **Biểu tượng chuông thông báo** 🔔: Hiển thị số thông báo mới
- **Biểu tượng Avatar Admin** 👤: Menu dropdown với các tùy chọn:
  - Hồ sơ
  - Đổi mật khẩu
  - Đăng xuất

### 2. Menu Hamburger Slide Bar (Bên trái)
Menu mặc định mở ra sau khi đăng nhập, có thể đóng/mở bằng cách click vào biểu tượng 3 gạch.

#### Các đề mục chính:
- **📊 Bảng điều khiển**: Trang chính của admin
- **👥 Người dùng** (Menu Dropdown):
  - Quản lý học viên
  - Quản lý gia sư
  - Phân quyền
- **📚 Khóa học** (Menu Dropdown):
  - Quản lý khóa học
  - Quản lý yêu cầu
- **💰 Giao dịch** (Menu Dropdown):
  - Quản lý thanh toán
  - Hoàn tiền
  - Doanh thu
- **📝 Nội dung & Hỗ trợ** (Menu Dropdown):
  - Quản lý bài viết
  - Hỗ trợ người dùng
  - Quản lý đánh giá gia sư
- **⚙️ Cài đặt hệ thống**

## Cách sử dụng

### 1. Đăng nhập Admin
- Truy cập: `/login/admin`
- Nhập thông tin đăng nhập admin
- Sau khi đăng nhập thành công, sẽ được chuyển hướng đến `/admin/dashboard`

### 2. Điều hướng
- **Logo**: Click để về Bảng điều khiển
- **Menu hamburger**: Click để đóng/mở menu bên trái
- **Các menu con**: Click để mở rộng/thu gọn các danh mục

### 3. Các trang đã tạo
- `/admin/dashboard` - Bảng điều khiển chính
- `/admin/students` - Quản lý học viên

## Tính năng đã implement

### ✅ Đã hoàn thành:
1. **AdminHeader**: Header với logo, tìm kiếm, thông báo, avatar dropdown
2. **AdminMenu**: Menu slide bar bên trái với đầy đủ các chức năng
3. **AdminLayout**: Layout tổng thể cho admin với responsive margin
4. **AdminDashboard**: Bảng điều khiển với thống kê và hoạt động
5. **AdminStudents**: Trang quản lý học viên mẫu
6. **Responsive Design**: Giao diện responsive trên các thiết bị
7. **Authentication**: Hỗ trợ đăng nhập admin
8. **Routing**: Các route cho admin đã được cấu hình
9. **Menu Context**: Quản lý trạng thái menu để điều chỉnh layout động

### 🔄 Cần phát triển thêm:
1. Các trang quản lý chi tiết (gia sư, khóa học, thanh toán, etc.)
2. Chức năng CRUD đầy đủ
3. Tích hợp API backend
4. Quản lý phân quyền chi tiết
5. Báo cáo và thống kê nâng cao

## Cấu trúc file

```
frontend/src/
├── components/
│   ├── AdminHeader.tsx      # Header admin
│   ├── AdminMenu.tsx        # Menu slide bar
│   └── AdminLayout.tsx      # Layout tổng thể
├── pages/admin/
│   ├── AdminDashboard.tsx   # Bảng điều khiển
│   └── AdminStudents.tsx    # Quản lý học viên
└── routes/
    └── AppRoutes.tsx        # Cấu hình route
```

## Hướng dẫn phát triển

### Thêm trang admin mới:
1. Tạo file trong `frontend/src/pages/admin/`
2. Sử dụng `AdminLayout` component
3. Thêm route trong `AppRoutes.tsx`
4. Thêm menu item trong `AdminMenu.tsx`

### Tùy chỉnh giao diện:
- Sử dụng Tailwind CSS classes
- Tuân thủ design system hiện tại
- Đảm bảo responsive design

## Lưu ý
- Giao diện đã được thiết kế theo yêu cầu với tiếng Việt
- Menu hamburger mặc định mở ra sau khi đăng nhập
- Tất cả các component đều responsive
- Đã tích hợp với hệ thống authentication hiện tại
