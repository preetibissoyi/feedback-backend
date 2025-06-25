const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  type: { type: String, enum: ['student', 'parent', 'alumni'], required: true },
  submittedAt: { type: Date, default: Date.now },
  studentName: String,
  studentYear: String,
  studentMajor: String,
  studentId: String,
  name: String,
  email: String,
  parentName: String,
  graduationYear: String,
  profession: String,
  academicExperience: {
    instructionQuality: String,
    facultyHelpfulness: String,
    teachingMethods: String,
    courseAlignment: String,
    prepForCareer: String,
    prepForCareerExplain: String,
    mostBeneficial: String,
    couldBeImproved: String,
    teachingQuality: String,
    teachingQualityExplain: String,
    academicSatisfaction: String,
    academicSatisfactionExplain: String,
    advisorSupport: String,
    advisorSupportExplain: String,
    informed: String,
    informedExplain: String,
    academicCommunication: String,
    academicCommunicationSuggestions: String,
    sufficientResources: String,
    insufficientResourcesExplain: String
  },
  academicResources: {
    libraryResources: String,
    academicAdvising: String,
    tutoringServices: String,
    onlineLearning: String,
    academicResourcesImprovement: String,
    alumniLibrary: String,
    alumniAdvising: String,
    alumniCareer: String,
    alumniIT: String,
    alumniOtherResources: String
  },
  campusLife: {
    campusEnvironment: String,
    studentHealth: String,
    careerServices: String,
    counsellingServices: String,
    itSupport: String,
    foodServices: String,
    hostel: String,
    studentActivities: String,
    communityPromotion: String,
    diversityInclusion: String,
    extracurricularSuggestions: String,
    campusSafety: String,
    campusSafetyExplain: String,
    supportServices: String,
    supportServicesExplain: String,
    parentCommunication: String,
    parentCommunicationSuggestions: String,
    adminAccessibility: String,
    adminAccessibilityExplain: String,
    socialEmotional: String,
    campusLifeSatisfaction: String,
    campusLifeExplain: String,
    extracurricularValue: String,
    extracurricularExplain: String,
    alumniCommunity: String,
    alumniDiversity: String
  },
  facilities: {
    facilityCondition: String,
    facilityConditionExplain: String,
    wifiReliability: String,
    facilityImprovements: String
  },
  alumniEngagement: {
    alumniEngagement: String,
    alumniEngagementExplain: String,
    alumniCommunication: String,
    alumniEvents: [String],
    alumniEventsOther: String,
    alumniCommImprove: String
  },
  overallFeedback: {
    strengths: String,
    areasForImprovement: String,
    otherComments: String,
    parentStrengths: String,
    parentImprovements: String,
    parentComments: String,
    alumniStrengths: String,
    alumniImprovements: String,
    alumniComments: String
  },
  feedback: String,
  createdAt: { type: Date, default: Date.now },
  rawFormData: Object
}, {
  timestamps: true
});
feedbackSchema.index({ type: 1, submittedAt: -1 });
feedbackSchema.index({ 'academicExperience.instructionQuality': 1 });
feedbackSchema.index({ 'campusLife.campusEnvironment': 1 });

module.exports = mongoose.model('Feedback', feedbackSchema); 