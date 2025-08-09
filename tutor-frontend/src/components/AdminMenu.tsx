import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdminMenu } from '../contexts/AdminMenuContext';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
}

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useAdminMenu();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'bang-dieu-khien',
      title: 'Bảng điều khiển',
      icon: '📊',
      path: '/admin/dashboard'
    },
    {
      id: 'nguoi-dung',
      title: 'Người dùng',
      icon: '👥',
      children: [
        { id: 'quan-ly-hoc-vien', title: 'Quản lý học viên', path: '/admin/students', icon: '👨‍🎓' },
        { id: 'quan-ly-gia-su', title: 'Quản lý gia sư', path: '/admin/tutors', icon: '👨‍🏫' },
        { id: 'phan-quyen', title: 'Phân quyền', path: '/admin/permissions', icon: '🔐' },
      ],
    },
    {
      id: 'khoa-hoc',
      title: 'Khóa học',
      icon: '📚',
      children: [
        { id: 'quan-ly-khoa-hoc', title: 'Quản lý khóa học', path: '/admin/courses', icon: '📖' },
        { id: 'quan-ly-yeu-cau', title: 'Quản lý yêu cầu', path: '/admin/requests', icon: '📋' },
      ],
    },
    {
      id: 'giao-dich',
      title: 'Giao dịch',
      icon: '💰',
      children: [
        { id: 'quan-ly-thanh-toan', title: 'Quản lý thanh toán', path: '/admin/payments', icon: '💳' },
        { id: 'hoan-tien', title: 'Hoàn tiền', path: '/admin/refunds', icon: '↩️' },
        { id: 'doanh-thu', title: 'Doanh thu', path: '/admin/revenue', icon: '📈' },
      ],
    },
    {
      id: 'noi-dung-ho-tro',
      title: 'Nội dung & Hỗ trợ',
      icon: '📝',
      children: [
        { id: 'quan-ly-bai-viet', title: 'Quản lý bài viết', path: '/admin/articles', icon: '📄' },
        { id: 'ho-tro-nguoi-dung', title: 'Hỗ trợ người dùng', path: '/admin/support', icon: '🆘' },
        { id: 'quan-ly-danh-gia', title: 'Quản lý đánh giá gia sư', path: '/admin/reviews', icon: '⭐' },
      ],
    },
    {
      id: 'cai-dat-he-thong',
      title: 'Cài đặt hệ thống',
      icon: '⚙️',
      path: '/admin/settings'
    }
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
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
        className="fixed top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <span className="text-xl">≡</span>
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '320px' }}
      >
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">👑</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {user?.name || user?.email}
              </h3>
              <p className="text-blue-100 text-sm">Quản trị viên</p>
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

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleMenuToggle}
        />
      )}
      
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

export default AdminMenu;
