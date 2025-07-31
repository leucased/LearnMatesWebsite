const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Tutor = require('./Tutor');
const Course = require('./Course');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  tutorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tutors',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  sessionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: false,
    validate: {
      min: {
        args: [30],
        msg: 'Thời lượng tối thiểu là 30 phút'
      }
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Tổng tiền không được âm'
      }
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no-show'),
    defaultValue: 'pending'
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'),
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'bank_transfer', 'online_payment'),
    defaultValue: 'online_payment'
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  meetingPlatform: {
    type: DataTypes.ENUM('zoom', 'google_meet', 'skype', 'other'),
    defaultValue: 'zoom'
  },
  notesStudent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notesTutor: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notesAdmin: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancellationDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cancelledBy: {
    type: DataTypes.ENUM('student', 'tutor', 'admin'),
    allowNull: true
  },
  ratingScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [1],
        msg: 'Điểm đánh giá tối thiểu là 1'
      },
      max: {
        args: [5],
        msg: 'Điểm đánh giá tối đa là 5'
      }
    }
  },
  ratingComment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ratingCreatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  materials: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  attendanceStudent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  attendanceTutor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sessionNotesContent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sessionNotesAttachments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  tableName: 'bookings',
  indexes: [
    {
      fields: ['studentId', 'sessionDate']
    },
    {
      fields: ['tutorId', 'sessionDate']
    },
    {
      fields: ['status', 'sessionDate']
    }
  ]
});

// Define associations
Booking.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
Booking.belongsTo(Tutor, { foreignKey: 'tutorId', as: 'tutor' });
Booking.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

User.hasMany(Booking, { foreignKey: 'studentId', as: 'bookings' });
Tutor.hasMany(Booking, { foreignKey: 'tutorId', as: 'bookings' });
Course.hasMany(Booking, { foreignKey: 'courseId', as: 'bookings' });

module.exports = Booking; 