import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { useAuth } from '../../../contexts/AuthContext';

interface StudentUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  avatar: string;
  role: 'student';
  created_at: string;
}

const StudentProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<StudentUser | null>(null);

  // Fetch user data from API
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        // Kiểm tra authentication từ context
        if (!isAuthenticated || !user) {
          setLoading(false);
          return;
        }

        // Mock data nếu API chưa sẵn sàng
        const mockStudentData: StudentUser = {
          id: user.id || 'STU001',
          full_name: user.name || 'Nguyễn Văn A',
          email: user.email || 'student@example.com',
          phone: '0123456789',
          date_of_birth: '2000-01-01',
          gender: 'Nam',
          avatar: '/default-avatar.png',
          role: 'student',
          created_at: new Date().toISOString()
        };

        // Uncomment khi API sẵn sàng
        /*
        const response = await fetch(`/api/users/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Không thể tải thông tin profile');
        }

        const userData = await response.json();
        setStudent(userData);
        */

        // Sử dụng mock data tạm thời
        setTimeout(() => {
          setStudent(mockStudentData);
          setLoading(false);
        }, 1000);

      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, [user, isAuthenticated]);

  const handleSave = async () => {
    if (!student || !isAuthenticated) return;

    try {
      setLoading(true);
      
      // Mock save - thay thế bằng API call thực tế
      console.log('Saving student data:', student);
      
      // Uncomment khi API sẵn sàng
      /*
      const response = await fetch(`/api/users/${student.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: student.full_name,
          email: student.email,
          phone: student.phone,
          date_of_birth: student.date_of_birth,
          gender: student.gender,
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật thông tin');
      }

      const updatedData = await response.json();
      setStudent(updatedData);
      */

      // Mock delay for save operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsEditing(false);
      alert('Cập nhật thông tin thành công!');
    } catch (err) {
      console.error('Error saving profile:', err);
      alert(err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof StudentUser, value: string) => {
    if (!student) return;
    setStudent(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://via.placeholder.com/150/4F46E5/FFFFFF?text=U";
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger the useEffect by updating a dependency
    window.location.reload();
  };

  // Redirect nếu chưa đăng nhập
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">
              Bạn cần đăng nhập để xem trang này
            </div>
            <a 
              href="/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">
              {error || 'Không thể tải thông tin profile'}
            </div>
            <button 
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={student.avatar || "/default-avatar.png"}
                alt="Student Avatar"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                onError={handleImageError}
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{student.full_name}</h1>
              <p className="text-blue-100">Học viên</p>
              <p className="text-blue-100">
                Tham gia từ: {new Date(student.created_at).toLocaleDateString('vi-VN')}
              </p>
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
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="space-x-3">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 disabled:opacity-50 transition-colors"
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
                      value={student.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{student.full_name}</p>
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
                      value={student.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{student.email}</p>
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
                      value={student.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      pattern="[0-9]{10,11}"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{student.phone}</p>
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
                      value={student.date_of_birth}
                      onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {student.date_of_birth ? 
                        new Date(student.date_of_birth).toLocaleDateString('vi-VN') : 
                        'Chưa cập nhật'
                      }
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
                      value={student.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 py-2">{student.gender || 'Chưa cập nhật'}</p>
                  )}
                </div>

                {/* ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID học viên
                  </label>
                  <p className="text-gray-500 py-2 font-mono bg-gray-50 px-3 rounded">{student.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Stats */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-gray-600">Buổi học đã hoàn thành</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-gray-600">Gia sư đã học</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <p className="text-gray-600">Đánh giá trung bình</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 text-left transition-colors group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
                <div className="font-semibold">Tìm gia sư mới</div>
              </button>
              <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 text-left transition-colors group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📅</div>
                <div className="font-semibold">Đặt lịch học</div>
              </button>
              <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 text-left transition-colors group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                <div className="font-semibold">Xem tiến độ</div>
              </button>
              <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 text-left transition-colors group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💬</div>
                <div className="font-semibold">Tin nhắn</div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;