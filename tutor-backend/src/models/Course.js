const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Tutor = require('./Tutor');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 100],
        msg: 'Tên khóa học không được quá 100 ký tự'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [1, 1000],
        msg: 'Mô tả không được quá 1000 ký tự'
      }
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
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Giá không được âm'
      }
    }
  },
  duration: {
    type: DataTypes.INTEGER, // in hours
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'Thời lượng phải ít nhất 1 giờ'
      }
    }
  },
  maxStudents: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: {
        args: [1],
        msg: 'Số học viên tối thiểu là 1'
      }
    }
  },
  currentStudents: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  schedule: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  curriculum: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  materials: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  requirements: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  learningOutcomes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ratingAverage: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: 'Điểm đánh giá không được âm'
      },
      max: {
        args: [5],
        msg: 'Điểm đánh giá không được quá 5'
      }
    }
  },
  ratingTotalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  videoPreview: {
    type: DataTypes.STRING,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('academic', 'language', 'music', 'art', 'sports', 'technology', 'other'),
    defaultValue: 'academic'
  }
}, {
  tableName: 'courses',
  indexes: [
    {
      fields: ['title', 'description', 'subject'],
      using: 'gin'
    },
    {
      fields: ['tags'],
      using: 'gin'
    }
  ]
});

// Define association
Course.belongsTo(Tutor, { foreignKey: 'tutorId', as: 'tutor' });
Tutor.hasMany(Course, { foreignKey: 'tutorId', as: 'courses' });

module.exports = Course; 