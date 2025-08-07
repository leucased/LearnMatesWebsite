import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
}

const StudentMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'hoc-tap',
      title: 'Học tập',
      icon: '📚',
      children: [
        { id: 'dang-ky-khoa-hoc', title: 'Đăng ký khóa học', path: '/student/courses/register', icon: '📝' },
        { id: 'khoa-hoc-cua-toi', title: 'Khóa học của tôi', path: '/student/courses/my-courses', icon: '📖' },
        { id: 'lich-hoc', title: 'Lịch học', path: '/student/schedule', icon: '📅' },
        { id: 'lich-su-hoc-tap', title: 'Lịch sử học tập', path: '/student/learning-history', icon: '📊' }
      ]
    },
    {
      id: 'tuong-tac',
      title: 'Tương tác',
      icon: '💬',
      children: [
        { id: 'tin-nhan', title: 'Tin nhắn', path: '/student/messages', icon: '💌' },
        { id: 'danh-gia-nhan-xet', title: 'Đánh giá & Nhận xét', path: '/student/reviews', icon: '⭐' }
      ]
    },
    {
      id: 'thanh-toan',
      title: 'Thanh toán',
      icon: '💳',
      children: [
        { id: 'hoa-don-thanh-toan', title: 'Hóa đơn & Thanh toán', path: '/student/payments', icon: '🧾' },
        { id: 'ma-giam-gia', title: 'Mã giảm giá', path: '/student/discounts', icon: '🎫' }
      ]
    },
    {
      id: 'tai-khoan',
      title: 'Tài khoản',
      icon: '👤',
      children: [
        { id: 'thong-tin-ca-nhan', title: 'Thông tin cá nhân', path: '/student/profile', icon: '👤' },
        { id: 'thay-doi-mat-khau', title: 'Thay đổi mật khẩu', path: '/student/change-password', icon: '🔒' },
        { id: 'anh-dai-dien', title: 'Ảnh đại diện / Hồ sơ', path: '/student/avatar', icon: '🖼️' }
      ]
    },
    {
      id: 'he-thong',
      title: 'Hệ thống',
      icon: '⚙️',
      children: [
        { id: 'thong-bao', title: 'Thông báo', path: '/student/notifications', icon: '🔔' },
        { id: 'tro-giup-ho-tro', title: 'Trợ giúp & Hỗ trợ', path: '/student/help', icon: '❓' },
        { id: 'dang-xuat', title: 'Đăng xuất', path: '/logout', icon: '🚪' }
      ]
    }
  ];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionToggle = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id === 'dang-xuat') {
      logout();
      navigate('/');
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isSection = item.children && item.children.length > 0;
    const isActive = activeSection === item.id;

    return (
      <div key={item.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <div
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          onClick={() => {
            if (isSection) {
              handleSectionToggle(item.id);
            } else {
              handleMenuItemClick(item);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.title}</span>
          </div>
          {isSection && (
            <span className={`transform transition-transform duration-200 ${
              isActive ? 'rotate-90' : ''
            }`}>
              ▶
            </span>
          )}
        </div>
        
        {isSection && isActive && (
          <div className="mt-2 space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={handleMenuToggle}
        className="fixed top-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <span className="text-xl">≡</span>
      </button>

      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '320px' }}
      >
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">👤</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {user?.name || user?.email}
              </h3>
              <p className="text-blue-100 text-sm">Học viên</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleMenuToggle}
        />
      )}
    </div>
  );
};

export default StudentMenu; 