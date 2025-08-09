import React from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard: React.FC = () => {
  // Dữ liệu mẫu cho dashboard
  const stats = [
    { title: 'Tổng học viên', value: '1,234', icon: '👨‍🎓', color: 'bg-blue-500' },
    { title: 'Tổng gia sư', value: '89', icon: '👨‍🏫', color: 'bg-green-500' },
    { title: 'Khóa học đang diễn ra', value: '156', icon: '📚', color: 'bg-yellow-500' },
    { title: 'Doanh thu tháng này', value: '₫45,678,000', icon: '💰', color: 'bg-purple-500' },
  ];

  const recentActivities = [
    { id: 1, action: 'Học viên mới đăng ký', user: 'Nguyễn Văn A', time: '2 phút trước', type: 'student' },
    { id: 2, action: 'Gia sư mới được phê duyệt', user: 'Trần Thị B', time: '15 phút trước', type: 'tutor' },
    { id: 3, action: 'Khóa học mới được tạo', user: 'Lê Văn C', time: '1 giờ trước', type: 'course' },
    { id: 4, action: 'Thanh toán hoàn thành', user: 'Phạm Thị D', time: '2 giờ trước', type: 'payment' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'student': return '👨‍🎓';
      case 'tutor': return '👨‍🏫';
      case 'course': return '📚';
      case 'payment': return '💳';
      default: return '📝';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Tiêu đề trang */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bảng điều khiển</h1>
            <p className="text-gray-600 mt-2">Chào mừng bạn trở lại, Admin!</p>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('vi-VN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <span className="text-2xl text-white">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Biểu đồ và hoạt động gần đây */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Biểu đồ đơn giản */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê đăng ký</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Học viên mới</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Gia sư mới</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Khóa học mới</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium">60%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hoạt động gần đây */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">{getActivityIcon(activity.type)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Xem tất cả hoạt động →
            </button>
          </div>
        </div>

        {/* Các hành động nhanh */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">👨‍🎓</div>
              <p className="text-sm font-medium">Thêm học viên</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">👨‍🏫</div>
              <p className="text-sm font-medium">Thêm gia sư</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm font-medium">Tạo khóa học</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm font-medium">Xem báo cáo</p>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
