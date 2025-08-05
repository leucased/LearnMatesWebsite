const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '24h'
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { email, password, fullName, role = 'student' } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Email đã được sử dụng'
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      fullName,
      role
    });

    if (user) {
      const token = generateToken(user.id);
      
      res.status(201).json({
        status: 'success',
        message: 'Đăng ký thành công',
        data: {
          user,
          token
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check for user
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }



    // Check if role matches (if role is provided)
    if (role && user.role !== role) {
      return res.status(401).json({
        success: false,
        message: `Tài khoản này không có quyền đăng nhập với vai trò ${role === 'student' ? 'Học viên' : 'Gia sư'}`
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.fullName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    res.json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, dateOfBirth, gender, address } = req.body;

    const user = await User.findByPk(req.user.id);

    if (user) {
      user.fullName = fullName || user.fullName;
      user.phone = phone || user.phone;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.gender = gender || user.gender;
      
      // Update address fields
      if (address) {
        user.addressStreet = address.street || user.addressStreet;
        user.addressCity = address.city || user.addressCity;
        user.addressState = address.state || user.addressState;
        user.addressZipCode = address.zipCode || user.addressZipCode;
      }

      const updatedUser = await user.save();

      res.json({
        status: 'success',
        message: 'Cập nhật thông tin thành công',
        data: { user: updatedUser }
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy người dùng'
      });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy người dùng'
      });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Mật khẩu hiện tại không đúng'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      status: 'success',
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
}; 