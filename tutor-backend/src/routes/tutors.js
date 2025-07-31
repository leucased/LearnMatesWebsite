const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { protect, tutor, admin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  searchTutors,
  getTutors,
  getTutorById,
  createTutorProfile,
  updateTutorProfile,
  approveTutor
} = require('../controllers/tutorController');

// Validation rules
const createTutorValidation = [
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Giới thiệu không được quá 500 ký tự'),
  body('subjects')
    .isArray()
    .withMessage('Môn học phải là mảng'),
  body('hourlyRate')
    .isFloat({ min: 0 })
    .withMessage('Mức phí giờ dạy phải là số dương'),
  body('education')
    .isArray()
    .withMessage('Thông tin học vấn phải là mảng'),
  body('experienceTotalYears')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Số năm kinh nghiệm phải là số nguyên dương')
];

const updateTutorValidation = [
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Giới thiệu không được quá 500 ký tự'),
  body('hourlyRate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Mức phí giờ dạy phải là số dương')
];

// Public routes
router.get('/search', searchTutors);
router.get('/', getTutors);
router.get('/:id', getTutorById);

// Protected routes
router.post('/', protect, tutor, createTutorValidation, validate, createTutorProfile);
router.put('/:id', protect, updateTutorValidation, validate, updateTutorProfile);

// Admin routes
router.put('/:id/approve', protect, admin, approveTutor);

module.exports = router; 