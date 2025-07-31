const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email không hợp lệ'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6],
        msg: 'Mật khẩu phải có ít nhất 6 ký tự'
      }
    }
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 50],
        msg: 'Họ tên phải từ 2-50 ký tự'
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9]{10,11}$/,
        msg: 'Số điện thoại không hợp lệ'
      }
    }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('student', 'tutor', 'admin'),
    defaultValue: 'student'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    defaultValue: 'other'
  },
  addressStreet: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addressCity: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addressState: {
    type: DataTypes.STRING,
    allowNull: true
  },
  addressZipCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  preferencesSubjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  preferencesLearningStyle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  preferencesAvailability: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpire: {
    type: DataTypes.DATE,
    allowNull: true
  },
  emailVerificationToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emailVerificationExpire: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance method to compare password
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to get JSON representation
User.prototype.toJSON = function() {
  const user = this.get();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  delete user.emailVerificationToken;
  delete user.emailVerificationExpire;
  return user;
};

module.exports = User; 