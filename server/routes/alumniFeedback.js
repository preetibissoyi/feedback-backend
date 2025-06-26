const express = require('express');
const router = express.Router();
const alumniFeedbackController = require('../controllers/alumniFeedbackController');

// Submit alumni feedback
router.post('/alumni', alumniFeedbackController.submitAlumniFeedback);
// Get alumni feedback statistics
router.get('/', alumniFeedbackController.getAlumniFeedbackStats);
// Get all alumni feedbacks
router.get('/all', alumniFeedbackController.getAllAlumniFeedbacks);

module.exports = router; 
