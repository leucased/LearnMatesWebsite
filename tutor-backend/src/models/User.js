const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'full_name',
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email không hợp lệ'
      }
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Số điện thoại không được để trống'
      }
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'date_of_birth',
    validate: {
      notEmpty: {
        msg: 'Ngày sinh không được để trống'
      }
    }
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['male', 'female']],
        msg: 'Giới tính phải là nam hoặc nữ'
      }
    }
  },
  role: {
    type: DataTypes.ENUM('student', 'tutor', 'admin'),
    defaultValue: 'student',
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'URL hoặc path đến ảnh đại diện của user'
  },
  teachingExperienceDesc: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'teaching_experience_desc',
    comment: 'Mô tả ngắn về kinh nghiệm giảng dạy (chỉ áp dụng cho tutor)',
    validate: {
      isNullForStudent(value) {
        if (this.role === 'student' && value !== null) {
          throw new Error('Student không được có thông tin kinh nghiệm giảng dạy');
        }
      }
    }
  },
  mainTeachingSubject: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'main_teaching_subject',
    comment: 'Môn/kỹ năng giảng dạy chính (VD: IELTS Speaking, Business English)',
    validate: {
      isNullForStudent(value) {
        if (this.role === 'student' && value !== null) {
          throw new Error('Student không được có thông tin môn giảng dạy');
        }
      }
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  hooks: {
    beforeSave: async (user) => {
      // Hash password nếu có thay đổi
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }

      // Tự động set NULL cho teaching fields nếu role là student
      if (user.role === 'student') {
        user.teachingExperienceDesc = null;
        user.mainTeachingSubject = null;
      }
    },
    beforeValidate: async (user) => {
      // Đảm bảo teaching fields là NULL cho student trước khi validate
      if (user.role === 'student') {
        user.teachingExperienceDesc = null;
        user.mainTeachingSubject = null;
      }
    }
  }
});

// Instance method để so sánh password
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method để kiểm tra xem user có phải là tutor không
User.prototype.isTutor = function() {
  return this.role === 'tutor';
};

// Instance method để kiểm tra xem user có phải là student không
User.prototype.isStudent = function() {
  return this.role === 'student';
};

// Instance method để kiểm tra xem user có phải là admin không
User.prototype.isAdmin = function() {
  return this.role === 'admin';
};

// Ghi đè toJSON để loại bỏ password khỏi response
User.prototype.toJSON = function() {
  const user = this.get();
  delete user.password;
  return user;
};

module.exports = User;