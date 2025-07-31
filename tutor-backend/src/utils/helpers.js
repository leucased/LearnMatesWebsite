const crypto = require('crypto');

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Generate reset password token
 * @returns {string} Reset token
 */
const generateResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString('hex');
  return resetToken;
};

/**
 * Hash reset token
 * @param {string} token - Reset token
 * @returns {string} Hashed token
 */
const hashResetToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Format date to Vietnamese format
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(date).toLocaleDateString('vi-VN', options);
};

/**
 * Calculate time difference in minutes
 * @param {Date} startTime - Start time
 * @param {Date} endTime - End time
 * @returns {number} Time difference in minutes
 */
const calculateTimeDifference = (startTime, endTime) => {
  const diffMs = new Date(endTime) - new Date(startTime);
  return Math.round(diffMs / (1000 * 60));
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitize string input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Generate pagination object
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {object} Pagination object
 */
const generatePagination = (page = 1, limit = 10, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null
  };
};

/**
 * Generate search query for MongoDB
 * @param {string} searchTerm - Search term
 * @param {array} fields - Fields to search in
 * @returns {object} MongoDB search query
 */
const generateSearchQuery = (searchTerm, fields = []) => {
  if (!searchTerm || !fields.length) return {};

  const searchRegex = new RegExp(searchTerm, 'i');
  const searchConditions = fields.map(field => ({
    [field]: searchRegex
  }));

  return {
    $or: searchConditions
  };
};

/**
 * Calculate average rating
 * @param {array} ratings - Array of rating objects
 * @returns {number} Average rating
 */
const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  
  const totalRating = ratings.reduce((sum, rating) => sum + rating.score, 0);
  return Math.round((totalRating / ratings.length) * 10) / 10;
};

/**
 * Format currency to Vietnamese format
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

/**
 * Check if date is in the future
 * @param {Date} date - Date to check
 * @returns {boolean} Is future date
 */
const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

/**
 * Check if date is today
 * @param {Date} date - Date to check
 * @returns {boolean} Is today
 */
const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return checkDate.getDate() === today.getDate() &&
         checkDate.getMonth() === today.getMonth() &&
         checkDate.getFullYear() === today.getFullYear();
};

module.exports = {
  generateRandomString,
  generateResetToken,
  hashResetToken,
  formatDate,
  calculateTimeDifference,
  isValidEmail,
  isValidPhone,
  sanitizeInput,
  generatePagination,
  generateSearchQuery,
  calculateAverageRating,
  formatCurrency,
  isFutureDate,
  isToday
}; 