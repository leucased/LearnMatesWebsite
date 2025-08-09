import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StudentMenu from './StudentMenu';
import TutorMenu from './TutorMenu';
import AdminMenu from './AdminMenu';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleNavClick = (section: string) => {
    if (section === 'tutors') {
      navigate('/tutors');
    } else if (section === 'home') {
      navigate('/');
    } else if (section === 'courses') {
      navigate('/courses');
    } else if (section === 'about') {
      navigate('/about');
    } else if (section === 'events') {
      navigate('/events');
    } else if (section === 'contact') {
      navigate('/contact');
    } else if (section === 'login') {
      navigate('/login');
    } else {
      // TODO: Implement other navigation logic
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
              <img 
                src={process.env.PUBLIC_URL + "/LearnMates-logo.png"} 
                alt="LearnMates Logo" 
                className="h-20 w-auto mr-3"
              />
              <h1 className="text-2xl font-bold text-blue-600">LearnMates</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => handleNavClick('home')} className="text-gray-700 hover:text-blue-600 bg-transparent border-none cursor-pointer">Trang chủ</button>
              <button onClick={() => handleNavClick('tutors')} className="text-gray-700 hover:text-blue-600 bg-transparent border-none cursor-pointer">Gia sư</button>
              <button onClick={() => handleNavClick('courses')} className="text-gray-700 hover:text-blue-600 bg-transparent border-none cursor-pointer">Khóa học</button>
              <button onClick={() => handleNavClick('events')} className="text-gray-700 hover:text-blue-600 bg-transparent border-none cursor-pointer">Sự kiện</button>
              <button onClick={() => handleNavClick('about')} className="text-gray-700 hover:text-blue-600 bg-transparent border-none cursor-pointer">Về LearnMates</button>
              <button onClick={() => handleNavClick('contact')} className="text-gray-700 hover:text-blue-600 bg-transparent border-none cursor-pointer">Liên hệ</button>
            </nav>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">
                    Xin chào, {user?.name || user?.email}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {user?.role === 'student' ? 'Học viên' : 'Gia sư'}
                  </span>
                </div>
              ) : (
                <>
                  <button onClick={() => handleNavClick('login')} className="text-gray-700 hover:text-blue-600">Đăng nhập</button>
                  <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {isAuthenticated && user?.role === 'student' && <StudentMenu />}
      {isAuthenticated && user?.role === 'tutor' && <TutorMenu />}
      {isAuthenticated && user?.role === 'admin' && <AdminMenu />}
    </>
  );
};

export default Header; 