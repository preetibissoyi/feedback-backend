const Feedback = require('../models/feedback');

exports.submitParentFeedback = async (req, res) => {
  try {
    // Extract parent-specific fields from req.body
    const {
      studentName,
      studentYear,
      studentMajor,
      parentName,
      academicSatisfaction,
      academicSatisfactionExplain,
      advisorSupport,
      advisorSupportExplain,
      informed,
      informedExplain,
      academicCommunication,
      academicCommunicationSuggestions,
      sufficientResources,
      insufficientResourcesExplain,
      campusSafety,
      campusSafetyExplain,
      supportServices,
      supportServicesExplain,
      parentCommunication,
      parentCommunicationSuggestions,
      adminAccessibility,
      adminAccessibilityExplain,
      socialEmotional,
      parentStrengths,
      parentImprovements,
      parentComments
    } = req.body;

    const feedbackData = {
      type: 'parent',
      studentName: studentName || '',
      studentYear: studentYear || '',
      studentMajor: studentMajor || '',
      parentName: parentName || '',
      academicExperience: {
        academicSatisfaction,
        academicSatisfactionExplain,
        advisorSupport,
        advisorSupportExplain,
        informed,
        informedExplain,
        academicCommunication,
        academicCommunicationSuggestions,
        sufficientResources,
        insufficientResourcesExplain
      },
      campusLife: {
        campusSafety,
        campusSafetyExplain,
        supportServices,
        supportServicesExplain,
        parentCommunication,
        parentCommunicationSuggestions,
        adminAccessibility,
        adminAccessibilityExplain,
        socialEmotional
      },
      overallFeedback: {
        parentStrengths,
        parentImprovements,
        parentComments
      },
      rawFormData: req.body
    };

    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    res.status(201).json({
      message: 'Parent feedback submitted successfully!',
      feedbackId: newFeedback._id,
      submittedAt: newFeedback.submittedAt
    });
  } catch (error) {
    console.error('Parent feedback submission error:', error);
    res.status(500).json({ error: 'Failed to submit parent feedback.' });
  }
};

exports.getAllParentFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ type: 'parent' }).sort({ submittedAt: -1 });
    res.json({
      totalFeedbacks: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error('Fetch parent feedbacks error:', error);
    res.status(500).json({ error: 'Failed to fetch parent feedbacks.' });
  }
};

exports.getParentFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      { $match: { type: 'parent' } },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    res.json({
      totalParentFeedbacks: stats[0]?.count || 0
    });
  } catch (error) {
    console.error('Parent feedback stats error:', error);
    res.status(500).json({ error: 'Failed to fetch parent feedback statistics.' });
  }
}; 