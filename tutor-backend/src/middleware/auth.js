const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findByPk(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Token không hợp lệ'
        });
      }

      if (!req.user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'Tài khoản đã bị khóa'
        });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        status: 'error',
        message: 'Token không hợp lệ'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Không có token, truy cập bị từ chối'
    });
  }
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Không có quyền truy cập'
    });
  }
};

// Middleware to check if user is tutor
const tutor = (req, res, next) => {
  if (req.user && (req.user.role === 'tutor' || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Chỉ giảng viên mới có quyền truy cập'
    });
  }
};

// Middleware to check if user is student
const student = (req, res, next) => {
  if (req.user && (req.user.role === 'student' || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Chỉ học viên mới có quyền truy cập'
    });
  }
};

module.exports = { protect, admin, tutor, student }; 