const express = require('express');
const router = express.Router();
const studentFeedbackController = require('../controllers/studentFeedbackController');

// Submit student feedback
router.post('/student', studentFeedbackController.submitStudentFeedback);
// Get student feedback statistics
router.get('/', studentFeedbackController.getStudentFeedbackStats);
// Get all student feedbacks
router.get('/all', studentFeedbackController.getAllStudentFeedbacks);

module.exports = router; 
