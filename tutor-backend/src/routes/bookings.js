const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');

// Placeholder for booking routes
router.get('/', protect, (req, res) => {
  res.json({
    status: 'success',
    message: 'Booking routes - Coming soon'
  });
});

module.exports = router; 