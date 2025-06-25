const Feedback = require('../models/feedback');

exports.submitAlumniFeedback = async (req, res) => {
  try {
    // Extract alumni-specific fields from req.body
    const {
      name,
      graduationYear,
      major,
      email,
      profession,
      prepForCareer,
      prepForCareerExplain,
      mostBeneficial,
      couldBeImproved,
      teachingQuality,
      teachingQualityExplain,
      alumniLibrary,
      alumniAdvising,
      alumniCareer,
      alumniIT,
      alumniOtherResources,
      campusLifeSatisfaction,
      campusLifeExplain,
      extracurricularValue,
      extracurricularExplain,
      alumniCommunity,
      alumniDiversity,
      alumniEngagement,
      alumniEngagementExplain,
      alumniCommunication,
      alumniEvents,
      alumniEventsOther,
      alumniCommImprove,
      alumniStrengths,
      alumniImprovements,
      alumniComments
    } = req.body;

    const feedbackData = {
      type: 'alumni',
      name: name || '',
      graduationYear: graduationYear || '',
      major: major || '',
      email: email || '',
      profession: profession || '',
      academicExperience: {
        prepForCareer,
        prepForCareerExplain,
        mostBeneficial,
        couldBeImproved,
        teachingQuality,
        teachingQualityExplain
      },
      academicResources: {
        alumniLibrary,
        alumniAdvising,
        alumniCareer,
        alumniIT,
        alumniOtherResources
      },
      campusLife: {
        campusLifeSatisfaction,
        campusLifeExplain,
        extracurricularValue,
        extracurricularExplain,
        alumniCommunity,
        alumniDiversity
      },
      alumniEngagement: {
        alumniEngagement,
        alumniEngagementExplain,
        alumniCommunication,
        alumniEvents: Array.isArray(alumniEvents) ? alumniEvents : [],
        alumniEventsOther,
        alumniCommImprove
      },
      overallFeedback: {
        alumniStrengths,
        alumniImprovements,
        alumniComments
      },
      rawFormData: req.body
    };

    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    res.status(201).json({
      message: 'Alumni feedback submitted successfully!',
      feedbackId: newFeedback._id,
      submittedAt: newFeedback.submittedAt
    });
  } catch (error) {
    console.error('Alumni feedback submission error:', error);
    res.status(500).json({ error: 'Failed to submit alumni feedback.' });
  }
};

exports.getAllAlumniFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ type: 'alumni' }).sort({ submittedAt: -1 });
    res.json({
      totalFeedbacks: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error('Fetch alumni feedbacks error:', error);
    res.status(500).json({ error: 'Failed to fetch alumni feedbacks.' });
  }
};

exports.getAlumniFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      { $match: { type: 'alumni' } },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    res.json({
      totalAlumniFeedbacks: stats[0]?.count || 0
    });
  } catch (error) {
    console.error('Alumni feedback stats error:', error);
    res.status(500).json({ error: 'Failed to fetch alumni feedback statistics.' });
  }
}; 