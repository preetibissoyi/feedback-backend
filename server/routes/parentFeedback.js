const express = require('express');
const router = express.Router();
const parentFeedbackController = require('../controllers/parentFeedbackController');

// Submit parent feedback
router.post('/parentfeedback', parentFeedbackController.submitParentFeedback);
// Get parent feedback statistics
router.get('/', parentFeedbackController.getParentFeedbackStats);

module.exports = router; 