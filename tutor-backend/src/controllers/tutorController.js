const { Op } = require('sequelize');
const Tutor = require('../models/Tutor');
const User = require('../models/User');

// @desc    Tìm kiếm gia sư
// @route   GET /api/tutors/search
// @access  Public
const searchTutors = async (req, res) => {
  try {
    const {
      subject,
      level,
      minRate,
      maxRate,
      availability,
      rating,
      page = 1,
      limit = 10
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = { isApproved: true, isAvailable: true };

    // Filter by subject
    if (subject) {
      whereClause.subjects = {
        [Op.contains]: [{ name: subject }]
      };
    }

    // Filter by hourly rate
    if (minRate || maxRate) {
      whereClause.hourlyRate = {};
      if (minRate) whereClause.hourlyRate[Op.gte] = parseFloat(minRate);
      if (maxRate) whereClause.hourlyRate[Op.lte] = parseFloat(maxRate);
    }

    // Filter by rating
    if (rating) {
      whereClause.ratingAverage = {
        [Op.gte]: parseFloat(rating)
      };
    }

    const tutors = await Tutor.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'avatar', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: offset,
      order: [['ratingAverage', 'DESC']]
    });

    const totalPages = Math.ceil(tutors.count / limit);

    res.json({
      status: 'success',
      data: {
        tutors: tutors.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: tutors.count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Search tutors error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

// @desc    Lấy danh sách gia sư
// @route   GET /api/tutors
// @access  Public
const getTutors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const tutors = await Tutor.findAndCountAll({
      where: { isApproved: true, isAvailable: true },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'avatar', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: offset,
      order: [['ratingAverage', 'DESC']]
    });

    const totalPages = Math.ceil(tutors.count / limit);

    res.json({
      status: 'success',
      data: {
        tutors: tutors.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: tutors.count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get tutors error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

// @desc    Lấy thông tin chi tiết gia sư
// @route   GET /api/tutors/:id
// @access  Public
const getTutorById = async (req, res) => {
  try {
    const { id } = req.params;

    const tutor = await Tutor.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'avatar', 'email', 'phone']
        }
      ]
    });

    if (!tutor) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy gia sư'
      });
    }

    res.json({
      status: 'success',
      data: { tutor }
    });
  } catch (error) {
    console.error('Get tutor by id error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

// @desc    Tạo hồ sơ gia sư
// @route   POST /api/tutors
// @access  Private (Tutor)
const createTutorProfile = async (req, res) => {
  try {
    const {
      bio,
      subjects,
      education,
      experienceTotalYears,
      experienceDescription,
      hourlyRate,
      availability,
      teachingMethods,
      languages,
      specializations
    } = req.body;

    // Check if user already has a tutor profile
    const existingTutor = await Tutor.findOne({
      where: { userId: req.user.id }
    });

    if (existingTutor) {
      return res.status(400).json({
        status: 'error',
        message: 'Bạn đã có hồ sơ gia sư'
      });
    }

    const tutor = await Tutor.create({
      userId: req.user.id,
      bio,
      subjects,
      education,
      experienceTotalYears,
      experienceDescription,
      hourlyRate,
      availability,
      teachingMethods,
      languages,
      specializations
    });

    res.status(201).json({
      status: 'success',
      message: 'Tạo hồ sơ gia sư thành công',
      data: { tutor }
    });
  } catch (error) {
    console.error('Create tutor profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

// @desc    Cập nhật hồ sơ gia sư
// @route   PUT /api/tutors/:id
// @access  Private (Tutor)
const updateTutorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const tutor = await Tutor.findByPk(id);

    if (!tutor) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy hồ sơ gia sư'
      });
    }

    // Check if user owns this tutor profile
    if (tutor.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Không có quyền cập nhật hồ sơ này'
      });
    }

    await tutor.update(updateData);

    res.json({
      status: 'success',
      message: 'Cập nhật hồ sơ thành công',
      data: { tutor }
    });
  } catch (error) {
    console.error('Update tutor profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

// @desc    Admin phê duyệt gia sư
// @route   PUT /api/tutors/:id/approve
// @access  Private (Admin)
const approveTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved, reason } = req.body;

    const tutor = await Tutor.findByPk(id);

    if (!tutor) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy hồ sơ gia sư'
      });
    }

    await tutor.update({ isApproved });

    res.json({
      status: 'success',
      message: isApproved ? 'Phê duyệt gia sư thành công' : 'Từ chối gia sư thành công',
      data: { tutor }
    });
  } catch (error) {
    console.error('Approve tutor error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server'
    });
  }
};

module.exports = {
  searchTutors,
  getTutors,
  getTutorById,
  createTutorProfile,
  updateTutorProfile,
  approveTutor
}; 