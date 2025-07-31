const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/auth');

// Placeholder for user routes
router.get('/', protect, admin, (req, res) => {
  res.json({
    status: 'success',
    message: 'User routes - Coming soon'
  });
});

module.exports = router; 