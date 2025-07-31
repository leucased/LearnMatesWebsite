const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Tutor = sequelize.define('Tutor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 500],
        msg: 'Giới thiệu không được quá 500 ký tự'
      }
    }
  },
  subjects: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  education: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  experienceTotalYears: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  experienceDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Mức phí không được âm'
      }
    }
  },
  availability: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  teachingMethods: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  languages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  certificates: {
    type: DataTypes.JSONB,
    defaultValue: []
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
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  specializations: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  achievements: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  videoIntroduction: {
    type: DataTypes.STRING,
    allowNull: true
  },
  documents: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
}, {
  tableName: 'tutors',
  indexes: [
    {
      fields: ['subjects'],
      using: 'gin'
    },
    {
      fields: ['bio'],
      using: 'gin'
    }
  ]
});

// Define association
Tutor.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Tutor, { foreignKey: 'userId', as: 'tutor' });

module.exports = Tutor; 