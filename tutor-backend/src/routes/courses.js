const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');

// Placeholder for course routes
router.get('/', protect, (req, res) => {
  res.json({
    status: 'success',
    message: 'Course routes - Coming soon'
  });
});

module.exports = router; 