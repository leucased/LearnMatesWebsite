import React from 'react';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 h-full">
          <div className="grid md:grid-cols-2 gap-0 items-stretch h-full">
            {/* Content on the left */}
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                LearnMates – Kết nối học viên với gia sư tiếng Anh chất lượng
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Học tiếng Anh hiệu quả hơn – Linh hoạt, cá nhân hóa và dễ dàng truy cập
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                  Tìm gia sư ngay
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
                  Trở thành gia sư
                </button>
              </div>
            </div>
            
            {/* Student image on the right */}
            <div className="flex justify-center md:justify-end items-center h-full">
              <div className="relative">
                <img 
                  src={process.env.PUBLIC_URL + "/HomePage/student.png"} 
                  alt="Student studying English" 
                  className="max-w-md max-h-[500px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Giới thiệu về LearnMates
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              LearnMates là nền tảng trực tuyến giúp học viên ở mọi lứa tuổi kết nối với những gia sư tiếng Anh uy tín, giàu kinh nghiệm. Chúng tôi mang đến môi trường học tập hiệu quả, cá nhân hóa theo mục tiêu và trình độ của từng học viên – từ người mới bắt đầu đến luyện thi IELTS, TOEIC, giao tiếp, tiếng Anh doanh nghiệp, v.v.
            </p>
          </div>
        </div>
      </section>

      {/* Vì sao chọn LearnMates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vì sao chọn LearnMates?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tìm gia sư phù hợp chỉ trong vài phút</h3>
              <p className="text-gray-600">Bộ lọc thông minh theo nhu cầu học, cấp độ, thời gian rảnh và ngân sách.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Gia sư chất lượng</h3>
              <p className="text-gray-600">Hồ sơ gia sư được kiểm duyệt kỹ, có đánh giá từ học viên trước.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Lịch học linh hoạt</h3>
              <p className="text-gray-600">Đặt lịch học phù hợp với thời gian biểu cá nhân.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Giao tiếp trực tuyến & hỗ trợ real-time</h3>
              <p className="text-gray-600">Tương tác trực tiếp qua video call, chat và hệ thống bài tập.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">An toàn và minh bạch</h3>
              <p className="text-gray-600">Thanh toán an toàn, chính sách hoàn tiền rõ ràng.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dành cho học viên & gia sư */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Dành cho học viên */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Dành cho học viên</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span className="text-gray-700">Dễ dàng tạo tài khoản và đặt lịch học thử miễn phí.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span className="text-gray-700">Lựa chọn gia sư theo mục tiêu cá nhân: luyện nói, phát âm, thi chứng chỉ, tiếng Anh cho người đi làm, trẻ em, du học, v.v.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span className="text-gray-700">Theo dõi tiến độ học, lịch sử buổi học và nhận phản hồi sau mỗi buổi.</span>
                </li>
              </ul>
            </div>

            {/* Dành cho gia sư */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Dành cho gia sư</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-gray-700">Tạo hồ sơ nhanh, cập nhật bằng cấp và kinh nghiệm.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-gray-700">Tiếp cận hàng trăm học viên tìm kiếm người dạy mỗi ngày.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-gray-700">Quản lý lịch dạy, nhận thanh toán dễ dàng, minh bạch.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Các khóa học phổ biến */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Các khóa học phổ biến
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl mb-3">🔹</div>
              <h3 className="text-lg font-semibold mb-2">Tiếng Anh giao tiếp cơ bản – nâng cao</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl mb-3">🔹</div>
              <h3 className="text-lg font-semibold mb-2">Luyện thi IELTS, TOEIC</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl mb-3">🔹</div>
              <h3 className="text-lg font-semibold mb-2">Tiếng Anh cho trẻ em</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl mb-3">🔹</div>
              <h3 className="text-lg font-semibold mb-2">Tiếng Anh phỏng vấn – công việc</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl mb-3">🔹</div>
              <h3 className="text-lg font-semibold mb-2">Tiếng Anh học thuật & du học</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Trải nghiệm học thử */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Trải nghiệm học thử miễn phí
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Bạn có thể đặt buổi học thử đầu tiên hoàn toàn miễn phí để trải nghiệm chất lượng giảng dạy và phong cách của gia sư.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 text-lg">
            Đăng ký học thử ngay
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bắt đầu hành trình học tiếng Anh hiệu quả ngay hôm nay!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Hàng ngàn học viên đã tiến bộ cùng LearnMates – bạn thì sao?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Đăng ký tài khoản miễn phí
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
              💬 Tư vấn 1:1
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
              📚 Học mọi lúc, mọi nơi
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
              👉 Tìm gia sư ngay
            </button>
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600">
              👉 Trở thành gia sư
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LearnMates</h3>
              <p className="text-gray-300">
                Nền tảng kết nối gia sư và học viên hàng đầu Việt Nam
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0">Tìm gia sư</button></li>
                <li><button className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0">Khóa học</button></li>
                <li><button className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0">Tư vấn</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0">Trung tâm trợ giúp</button></li>
                <li><button className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0">Liên hệ</button></li>
                <li><button className="hover:text-white bg-transparent border-none cursor-pointer text-left p-0">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Theo dõi</h4>
              <div className="flex space-x-4">
                <button 
                  className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer p-0"
                  aria-label="Facebook"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  className="text-gray-300 hover:text-white bg-transparent border-none cursor-pointer p-0"
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 LearnMates. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;