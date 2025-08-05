import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { LoginCredentials } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import AuthBranding from '../components/AuthBranding';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const credentials: LoginCredentials = {
      email,
      password,
      role,
    };

    try {
      const response = await authService.login(credentials);
      if (response.success && response.token && response.user) {
        login(response.token, response.user);
        navigate('/');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthBranding />
        <div className="bg-white rounded-2xl shadow-xl px-8 py-10 sm:p-10">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
          <p className="text-center text-sm text-gray-600 mb-6">Chào mừng bạn quay trở lại với LearnMates</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Học viên</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="tutor"
                    checked={role === 'tutor'}
                    onChange={() => setRole('tutor')}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Gia sư</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
              />
              <div className="text-right mt-1">
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
                  onClick={() => navigate('/forgot-password')}
                >
                  Quên mật khẩu?
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm">Chưa có tài khoản? </span>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
                onClick={() => navigate('/register')}
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 