const Feedback = require('../models/feedback');

exports.submitStudentFeedback = async (req, res) => {
  try {
    const {
      department,
      yearOfStudy,
      major,
      studentId,
      instructionQuality,
      facultyHelpfulness,
      teachingMethods,
      courseAlignment,
      libraryResources,
      academicAdvising,
      tutoringServices,
      onlineLearning,
      academicResourcesImprovement,
      campusEnvironment,
      studentHealth,
      careerServices,
      counsellingServices,
      itSupport,
      foodServices,
      hostel,
      studentActivities,
      communityPromotion,
      diversityInclusion,
      extracurricularSuggestions,
      facilityCondition,
      facilityConditionExplain,
      wifiReliability,
      facilityImprovements,
      strengths,
      areasForImprovement,
      otherComments
    } = req.body;

    const feedbackData = {
      type: 'student',
      studentName: req.body.studentName || '',
      studentYear: yearOfStudy || '',
      studentMajor: major || '',
      studentId: studentId || '',
      department: department || '',
      academicExperience: {
        instructionQuality,
        facultyHelpfulness,
        teachingMethods,
        courseAlignment
      },
      academicResources: {
        libraryResources,
        academicAdvising,
        tutoringServices,
        onlineLearning,
        academicResourcesImprovement
      },
      campusLife: {
        campusEnvironment,
        studentHealth,
        careerServices,
        counsellingServices,
        itSupport,
        foodServices,
        hostel,
        studentActivities,
        communityPromotion,
        diversityInclusion,
        extracurricularSuggestions
      },
      facilities: {
        facilityCondition,
        facilityConditionExplain,
        wifiReliability,
        facilityImprovements
      },
      overallFeedback: {
        strengths,
        areasForImprovement,
        otherComments
      },
      rawFormData: req.body
    };

    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    res.status(201).json({
      message: 'Student feedback submitted successfully!',
      feedbackId: newFeedback._id,
      submittedAt: newFeedback.submittedAt
    });
  } catch (error) {
    console.error('Student feedback submission error:', error);
    res.status(500).json({ error: 'Failed to submit student feedback.' });
  }
};

exports.getAllStudentFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ type: 'student' }).sort({ submittedAt: -1 });
    res.json({
      totalFeedbacks: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error('Fetch student feedbacks error:', error);
    res.status(500).json({ error: 'Failed to fetch student feedbacks.' });
  }
};

exports.getStudentFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      { $match: { type: 'student' } },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    res.json({
      totalStudentFeedbacks: stats[0]?.count || 0
    });
  } catch (error) {
    console.error('Student feedback stats error:', error);
    res.status(500).json({ error: 'Failed to fetch student feedback statistics.' });
  }
}; 