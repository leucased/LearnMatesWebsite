const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Tutor = sequelize.define('Tutor', {
  tutorId: {
    type: DataTypes.UUID,
    primaryKey: true,
    field: 'tutor_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  teachingExperience: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'teaching_experience',
    validate: {
      len: {
        args: [0, 2000],
        msg: 'Kinh nghiệm giảng dạy không được vượt quá 2000 ký tự'
      }
    }
  },
  mainSubject: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'main_subject',
    validate: {
      notEmpty: {
        msg: 'Môn/kỹ năng chính không được để trống'
      }
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: {
        args: [['pending', 'approved', 'rejected']],
        msg: 'Trạng thái phải là pending, approved hoặc rejected'
      }
    }
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'approved_at'
  },
  interviewNote: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'interview_note',
    validate: {
      len: {
        args: [0, 1000],
        msg: 'Ghi chú phỏng vấn không được vượt quá 1000 ký tự'
      }
    }
  }
}, {
  tableName: 'tutors',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeUpdate: async (tutor) => {
      // Tự động cập nhật approved_at khi status chuyển thành approved
      if (tutor.changed('status') && tutor.status === 'approved' && !tutor.approvedAt) {
        tutor.approvedAt = new Date();
      }
      // Xóa approved_at nếu status không phải approved
      if (tutor.changed('status') && tutor.status !== 'approved') {
        tutor.approvedAt = null;
      }
    }
  }
});

// Định nghĩa associations (sẽ được gọi trong index.js hoặc file associations)
Tutor.associate = (models) => {
  // Mối quan hệ với User
  Tutor.belongsTo(models.User, {
    foreignKey: 'tutorId',
    as: 'user',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
};

module.exports = Tutor;