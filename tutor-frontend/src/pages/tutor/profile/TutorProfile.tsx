import React, { useState } from 'react';
import Header from '../../../components/Header';
interface TutorUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  avatar: string;
  role: 'tutor';
  created_at: string;
}

interface TutorDetails {
  tutor_id: string;
  teaching_experience: string;
  main_subject: string;
  status: 'active' | 'inactive' | 'pending';
  approved_at: string | null;
  interview_note: string;
  created_at: string;
  updated_at: string;
}

const TutorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tutor, setTutor] = useState<TutorUser>({
    id: "TUT001",
    full_name: "Trần Thị Bảo",
    email: "tranthibao@email.com",
    phone: "0987654321",
    date_of_birth: "1990-03-20",
    gender: "Nữ",
    avatar: "/avatars/tutor-avatar.jpg",
    role: "tutor",
    created_at: "2023-12-01"
  });

  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    tutor_id: "TUT001",
    teaching_experience: "5 năm",
    main_subject: "Tiếng Anh giao tiếp, IELTS",
    status: "active",
    approved_at: "2023-12-05",
    interview_note: "Gia sư có kinh nghiệm tốt, phương pháp giảng dạy hiệu quả",
    created_at: "2023-12-01",
    updated_at: "2024-01-15"
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved tutor profile:", { tutor, tutorDetails });
  };

  const handleTutorInputChange = (field: keyof TutorUser, value: string) => {
    setTutor(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTutorDetailsChange = (field: keyof TutorDetails, value: string) => {
    setTutorDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang hoạt động';
      case 'pending': return 'Chờ duyệt';
      case 'inactive': return 'Không hoạt động';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={tutor.avatar || "/default-avatar.png"}
                alt="Tutor Avatar"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{tutor.full_name}</h1>
              <p className="text-green-100">Gia sư</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tutorDetails.status)}`}>
                  {getStatusText(tutorDetails.status)}
                </span>
                <p className="text-green-100">Tham gia từ: {new Date(tutor.created_at).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md">
            {/* Action Buttons */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
              <div className="space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="space-x-3">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tutor.full_name}
                      onChange={(e) => handleTutorInputChange('full_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{tutor.full_name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tutor.email}
                      onChange={(e) => handleTutorInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{tutor.email}</p>
                  )}
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tutor.phone}
                      onChange={(e) => handleTutorInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{tutor.phone}</p>
                  )}
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={tutor.date_of_birth}
                      onChange={(e) => handleTutorInputChange('date_of_birth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {tutor.date_of_birth ? new Date(tutor.date_of_birth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                    </p>
                  )}
                </div>

                {/* Giới tính */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới tính
                  </label>
                  {isEditing ? (
                    <select
                      value={tutor.gender}
                      onChange={(e) => handleTutorInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 py-2">{tutor.gender || 'Chưa cập nhật'}</p>
                  )}
                </div>

                {/* ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID gia sư
                  </label>
                  <p className="text-gray-500 py-2 font-mono">{tutor.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tutor Specific Information */}
          <div className="mt-8 bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Thông tin gia sư</h3>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Kinh nghiệm giảng dạy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kinh nghiệm giảng dạy *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tutorDetails.teaching_experience}
                      onChange={(e) => handleTutorDetailsChange('teaching_experience', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="VD: 5 năm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{tutorDetails.teaching_experience}</p>
                  )}
                </div>

                {/* Môn học chính */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chuyên môn chính *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tutorDetails.main_subject}
                      onChange={(e) => handleTutorDetailsChange('main_subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="VD: Tiếng Anh giao tiếp, IELTS"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{tutorDetails.main_subject}</p>
                  )}
                </div>

                {/* Trạng thái */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái hoạt động
                  </label>
                  {isEditing ? (
                    <select
                      value={tutorDetails.status}
                      onChange={(e) => handleTutorDetailsChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="active">Đang hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                      <option value="pending">Chờ duyệt</option>
                    </select>
                  ) : (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tutorDetails.status)}`}>
                      {getStatusText(tutorDetails.status)}
                    </span>
                  )}
                </div>

                {/* Ngày phê duyệt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày phê duyệt
                  </label>
                  <p className="text-gray-900 py-2">
                    {tutorDetails.approved_at ? new Date(tutorDetails.approved_at).toLocaleDateString('vi-VN') : 'Chưa phê duyệt'}
                  </p>
                </div>
              </div>

              {/* Ghi chú phỏng vấn */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú phỏng vấn
                </label>
                {isEditing ? (
                  <textarea
                    value={tutorDetails.interview_note}
                    onChange={(e) => handleTutorDetailsChange('interview_note', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ghi chú về buổi phỏng vấn, đánh giá..."
                  />
                ) : (
                  <p className="text-gray-900 py-2 bg-gray-50 p-4 rounded-md">
                    {tutorDetails.interview_note || 'Chưa có ghi chú'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Teaching Stats */}
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">47</p>
                  <p className="text-gray-600">Học viên đã dạy</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-gray-600">Buổi học đã dạy</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                  <p className="text-gray-600">Đánh giá trung bình</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">95%</p>
                  <p className="text-gray-600">Tỷ lệ hoàn thành</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 text-left">
                <div className="text-2xl mb-2">👥</div>
                <div className="font-semibold">Quản lý học viên</div>
              </button>
              <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 text-left">
                <div className="text-2xl mb-2">📅</div>
                <div className="font-semibold">Lịch dạy</div>
              </button>
              <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 text-left">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-semibold">Doanh thu</div>
              </button>
              <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 text-left">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-semibold">Thống kê</div>
              </button>
            </div>
          </div>

          {/* Certificates & Achievements */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chứng chỉ & Thành tích</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">IELTS 8.0</h4>
                    <p className="text-sm text-gray-600">2023</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">TESOL Certificate</h4>
                    <p className="text-sm text-gray-600">2022</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Gia sư xuất sắc 2024</h4>
                    <p className="text-sm text-gray-600">LearnMates Award</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="text-green-600 hover:text-green-700 font-medium">
                + Thêm chứng chỉ mới
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorProfile;