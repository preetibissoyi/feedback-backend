const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data for different feedback types
const studentFeedbackData = {
  studentName: "Test Student",
  department: "Computer Science",
  yearOfStudy: "2nd Year",
  major: "B.Tech Computer Science",
  studentId: "TEST001",
  instructionQuality: "Very Satisfied",
  facultyHelpfulness: "Very Accessible/Helpful",
  teachingMethods: "Test teaching methods feedback",
  courseAlignment: "Test course alignment feedback",
  campusEnvironment: "Very Satisfied",
  strengths: "Test strengths",
  areasForImprovement: "Test improvements",
  otherComments: "Test comments"
};

const parentFeedbackData = {
  studentName: "Test Student",
  studentYear: "2nd Year",
  studentMajor: "B.Tech Computer Science",
  parentName: "Test Parent",
  academicSatisfaction: "Very Satisfied",
  academicSatisfactionExplain: "Test explanation",
  campusSafety: "Very Safe",
  campusSafetyExplain: "Test safety explanation",
  parentStrengths: "Test strengths",
  parentImprovements: "Test improvements",
  parentComments: "Test comments"
};

const alumniFeedbackData = {
  name: "Test Alumni",
  graduationYear: "2023",
  major: "B.Tech Computer Science",
  email: "test.alumni@email.com",
  profession: "Software Engineer",
  prepForCareer: "Very Well",
  prepForCareerExplain: "Test explanation",
  alumniStrengths: "Test strengths",
  alumniImprovements: "Test improvements",
  alumniComments: "Test comments"
};

async function testEndpoint(method, url, data = null, description) {
  try {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`📍 ${method.toUpperCase()} ${url}`);
    
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    
    console.log(`✅ Success! Status: ${response.status}`);
    console.log(`📊 Response:`, JSON.stringify(response.data, null, 2));
    
    return { success: true, data: response.data };
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    if (error.response) {
      console.log(`📊 Error Response:`, JSON.stringify(error.response.data, null, 2));
    }
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🚀 Starting API Endpoint Tests...\n');
  
  const results = [];
  
  // Test Student Feedback
  results.push(await testEndpoint(
    'POST', 
    `${BASE_URL}/studentfeedback/student`, 
    studentFeedbackData, 
    'Submit Student Feedback'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/studentfeedback/all`, 
    null, 
    'Get All Student Feedbacks'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/studentfeedback`, 
    null, 
    'Get Student Feedback Stats'
  ));
  
  // Test Parent Feedback
  results.push(await testEndpoint(
    'POST', 
    `${BASE_URL}/parentfeedback/parent`, 
    parentFeedbackData, 
    'Submit Parent Feedback'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/parentfeedback/all`, 
    null, 
    'Get All Parent Feedbacks'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/parentfeedback`, 
    null, 
    'Get Parent Feedback Stats'
  ));
  
  // Test Alumni Feedback
  results.push(await testEndpoint(
    'POST', 
    `${BASE_URL}/alumnifeedback/alumni`, 
    alumniFeedbackData, 
    'Submit Alumni Feedback'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/alumnifeedback/all`, 
    null, 
    'Get All Alumni Feedbacks'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/alumnifeedback`, 
    null, 
    'Get Alumni Feedback Stats'
  ));
  
  // Test General Endpoints
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/`, 
    null, 
    'Get All Feedbacks (Root)'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/?limit=5&page=1`, 
    null, 
    'Get All Feedbacks with Pagination'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/?type=student`, 
    null, 
    'Get Feedbacks by Type (Student)'
  ));
  
  results.push(await testEndpoint(
    'GET', 
    `${BASE_URL}/feedback`, 
    null, 
    'Get Admin Feedback View'
  ));
  
  // Summary
  console.log('\n📋 Test Summary:');
  console.log('================');
  
  const successfulTests = results.filter(r => r.success).length;
  const totalTests = results.length;
  
  console.log(`✅ Successful: ${successfulTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - successfulTests}/${totalTests}`);
  
  if (successfulTests === totalTests) {
    console.log('\n🎉 All tests passed! Your backend is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check your backend configuration.');
  }
}

// Run the tests
runTests().catch(console.error); 