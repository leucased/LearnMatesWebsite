# LearnMates Backend API

Backend API cho ứng dụng LearnMates - nền tảng kết nối học viên và giảng viên.

## 🚀 Tính năng

- **Authentication**: Đăng ký, đăng nhập, quản lý profile
- **User Management**: Quản lý người dùng (học viên, giảng viên, admin)
- **Tutor Management**: Quản lý thông tin giảng viên
- **Course Management**: Quản lý khóa học
- **Booking System**: Hệ thống đặt lịch học
- **Security**: JWT authentication, rate limiting, input validation

## 📋 Yêu cầu hệ thống

- Node.js (v14 trở lên)
- PostgreSQL (v12 trở lên)
- npm hoặc yarn

## 🛠️ Cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd tutor-backend
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình môi trường**
```bash
# Tạo file .env từ .env.example
cp .env.example .env

# Chỉnh sửa các biến môi trường trong file .env
```

4. **Khởi động PostgreSQL**
```bash
# Đảm bảo PostgreSQL đang chạy
# Trên Windows: PostgreSQL service
# Trên macOS: brew services start postgresql
# Trên Linux: sudo systemctl start postgresql
```

5. **Tạo database**
```sql
CREATE DATABASE learnmates;
```

6. **Chạy ứng dụng**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔧 Cấu hình môi trường

Tạo file `.env` với các biến sau:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=learnmates
DB_USER=postgres
DB_PASSWORD=Ptdt0307@

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=24h

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `PUT /api/auth/profile` - Cập nhật profile
- `PUT /api/auth/change-password` - Đổi mật khẩu

### Users
- `GET /api/users` - Lấy danh sách users (Admin only)

### Tutors
- `GET /api/tutors` - Lấy danh sách giảng viên
- `POST /api/tutors` - Tạo profile giảng viên
- `GET /api/tutors/:id` - Lấy thông tin giảng viên
- `PUT /api/tutors/:id` - Cập nhật thông tin giảng viên

### Courses
- `GET /api/courses` - Lấy danh sách khóa học
- `POST /api/courses` - Tạo khóa học mới
- `GET /api/courses/:id` - Lấy thông tin khóa học
- `PUT /api/courses/:id` - Cập nhật khóa học

### Bookings
- `GET /api/bookings` - Lấy danh sách đặt lịch
- `POST /api/bookings` - Tạo đặt lịch mới
- `GET /api/bookings/:id` - Lấy thông tin đặt lịch
- `PUT /api/bookings/:id` - Cập nhật đặt lịch

## 🏗️ Cấu trúc thư mục

```
src/
├── config/
│   └── database.js          # Cấu hình database
├── controllers/
│   ├── authController.js     # Xử lý authentication
│   ├── userController.js     # Xử lý users
│   ├── tutorController.js    # Xử lý tutors
│   ├── courseController.js   # Xử lý courses
│   └── bookingController.js  # Xử lý bookings
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── validate.js          # Input validation
├── models/
│   ├── User.js              # User model
│   ├── Tutor.js             # Tutor model
│   ├── Course.js            # Course model
│   └── Booking.js           # Booking model
├── routes/
│   ├── auth.js              # Auth routes
│   ├── users.js             # User routes
│   ├── tutors.js            # Tutor routes
│   ├── courses.js           # Course routes
│   └── bookings.js          # Booking routes
├── utils/
│   └── helpers.js           # Utility functions
└── server.js                # Main server file
```

## 🔒 Bảo mật

- JWT Authentication
- Password hashing với bcrypt
- Rate limiting
- Input validation
- CORS configuration
- Helmet security headers

## 🧪 Testing

```bash
# Chạy tests
npm test

# Chạy tests với coverage
npm run test:coverage
```

## 📝 Scripts

```bash
# Development
npm run dev

# Production
npm start

# Testing
npm test

# Linting
npm run lint
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 📞 Liên hệ

- Email: support@learnmates.com
- Website: https://learnmates.com
- GitHub: https://github.com/learnmates 