import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'student' | 'tutor' | 'admin';
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  role: 'student' | 'tutor';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    role: 'student' | 'tutor' | 'admin';
    name?: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || 'Đăng nhập thất bại'
        };
      }
      return {
        success: false,
        message: 'Lỗi kết nối mạng'
      };
    }
  }

  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, credentials);
      if (response.data.status === 'success' || response.data.success) {
        return { success: true, message: response.data.message || 'Đăng ký thành công' };
      }
      return { success: false, message: response.data.message || 'Đăng ký thất bại' };
    } catch (error: any) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || 'Đăng ký thất bại'
        };
      }
      return {
        success: false,
        message: 'Lỗi kết nối mạng'
      };
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setAuthData(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

const authService = new AuthService();
export default authService; 