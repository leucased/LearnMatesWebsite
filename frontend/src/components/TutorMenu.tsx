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

const TutorMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // Thêm state xác nhận đăng xuất
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'quan-ly-lop-hoc',
      title: 'Quản lý lớp học',
      icon: '🏫',
      children: [
        { id: 'lich-day', title: 'Lịch dạy', path: '/tutor/schedule', icon: '📅' },
        { id: 'khoa-hoc-da-dang', title: 'Khóa học đã đăng', path: '/tutor/courses', icon: '📚' },
        { id: 'hoc-vien-cua-toi', title: 'Học viên của tôi', path: '/tutor/students', icon: '🧑‍🎓' },
        { id: 'dang-khoa-hoc-moi', title: 'Đăng khóa học mới', path: '/tutor/courses/new', icon: '➕' },
      ],
    },
    {
      id: 'tuong-tac',
      title: 'Tương tác',
      icon: '💬',
      children: [
        { id: 'tin-nhan', title: 'Tin nhắn', path: '/tutor/messages', icon: '💌' },
        { id: 'danh-gia-tu-hoc-vien', title: 'Đánh giá từ học viên', path: '/tutor/reviews', icon: '⭐' },
        { id: 'yeu-cau-dang-ky', title: 'Yêu cầu đăng ký từ học viên', path: '/tutor/requests', icon: '📥' },
      ],
    },
    {
      id: 'thu-nhap',
      title: 'Thu nhập',
      icon: '💰',
      children: [
        { id: 'quan-ly-thu-nhap', title: 'Quản lý thu nhập', path: '/tutor/income', icon: '📈' },
        { id: 'yeu-cau-rut-tien', title: 'Yêu cầu rút tiền', path: '/tutor/withdraw', icon: '💸' },
        { id: 'lich-su-thanh-toan', title: 'Lịch sử thanh toán', path: '/tutor/payments', icon: '🧾' },
      ],
    },
    {
      id: 'tai-khoan',
      title: 'Tài khoản',
      icon: '👤',
      children: [
        { id: 'thong-tin-ca-nhan', title: 'Thông tin cá nhân', path: '/tutor/profile', icon: '📝' },
        { id: 'thay-doi-mat-khau', title: 'Thay đổi mật khẩu', path: '/tutor/change-password', icon: '🔒' },
        { id: 'ho-so-nang-luc', title: 'Hồ sơ năng lực (CV, chứng chỉ, giới thiệu bản thân)', path: '/tutor/cv', icon: '📄' },
      ],
    },
    {
      id: 'he-thong',
      title: 'Hệ thống',
      icon: '⚙️',
      children: [
        { id: 'thong-bao', title: 'Thông báo', path: '/tutor/notifications', icon: '🔔' },
        { id: 'tro-giup-ho-tro', title: 'Trợ giúp & Hỗ trợ', path: '/tutor/help', icon: '❓' }
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
      setShowLogoutConfirm(true);
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
              <span className="text-blue-600 text-xl">👨‍🏫</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {user?.name || user?.email}
              </h3>
              <p className="text-blue-100 text-sm">Gia sư</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
        <div className="p-4 border-t">
          <button
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <span className="text-lg">🚪</span> Đăng xuất
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleMenuToggle}
        />
      )}
      {/* Xác nhận đăng xuất */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Xác nhận đăng xuất</h3>
            <p className="mb-6">Bạn có chắc chắn muốn đăng xuất không?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => { setShowLogoutConfirm(false); logout(); navigate('/'); }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorMenu;