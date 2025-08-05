# Trang Đăng Nhập LearnMates

## Tính năng đã triển khai ✅

### 1. Giao diện người dùng
- **Form đăng nhập** với thiết kế hiện đại và responsive
- **Radio buttons** để chọn vai trò: Học viên / Gia sư
- **Mặc định**: Học viên được chọn
- **Các trường nhập liệu**:
  - Email (với validation)
  - Mật khẩu (ẩn ký tự)
- **Nút đăng nhập** với trạng thái loading

### 2. Chức năng
- **Xác thực vai trò**: Hệ thống tự động hiểu đang đăng nhập với tư cách nào
- **Xử lý lỗi**: Hiển thị thông báo lỗi rõ ràng
- **Trạng thái loading**: Hiển thị spinner khi đang xử lý
- **Lưu trữ token**: Tự động lưu thông tin đăng nhập vào localStorage
- **Chuyển hướng**: Tự động chuyển về trang chủ sau khi đăng nhập thành công

### 3. Quản lý trạng thái
- **AuthContext**: Quản lý trạng thái đăng nhập toàn cục
- **AuthService**: Xử lý API calls và localStorage
- **Header động**: Hiển thị thông tin người dùng hoặc nút đăng nhập

## Cách sử dụng

### Truy cập trang đăng nhập
1. Click vào nút "Đăng nhập" trên header
2. Hoặc truy cập trực tiếp: `/login`

### Quy trình đăng nhập
1. **Chọn vai trò**: Chọn "Học viên" hoặc "Gia sư"
2. **Nhập email**: Điền địa chỉ email hợp lệ
3. **Nhập mật khẩu**: Điền mật khẩu
4. **Click "Đăng nhập"**: Hệ thống sẽ xử lý và chuyển hướng

### Sau khi đăng nhập
- Header sẽ hiển thị tên người dùng và vai trò
- Nút "Đăng xuất" xuất hiện để thoát khỏi hệ thống
- Token được lưu tự động cho các lần truy cập tiếp theo

## Cấu trúc file

```
frontend/src/
├── pages/
│   └── LoginPage.tsx          # Trang đăng nhập chính
├── components/
│   └── Header.tsx             # Header với thông tin đăng nhập
├── services/
│   └── authService.ts         # Service xử lý API đăng nhập
├── contexts/
│   └── AuthContext.tsx        # Context quản lý trạng thái
└── routes/
    └── AppRoutes.tsx          # Routing với route /login
```

## API Endpoint

Trang đăng nhập sẽ gọi API:
```
POST /api/auth/login
```

Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "student" // hoặc "tutor"
}
```

## Lưu ý

- Cần cấu hình `REACT_APP_API_URL` trong environment variables
- Backend cần hỗ trợ endpoint `/api/auth/login`
- Token JWT được lưu trong localStorage
- Responsive design hoạt động tốt trên mobile và desktop 