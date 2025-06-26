// Test script to verify backend connection
const BACKEND_URL = 'https://feedbackbackend-0efh.onrender.com';

async function testBackend() {
  console.log('Testing backend connection...');
  
  try {
    // Test the main endpoint
    console.log('Testing main endpoint...');
    const response = await fetch(`${BACKEND_URL}/`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is working!');
      console.log('Total feedbacks:', data.totalFeedbacks);
      console.log('Sample feedback structure:', data.feedbacks[0] ? Object.keys(data.feedbacks[0]) : 'No feedbacks yet');
    } else {
      console.log('❌ Backend responded with error:', response.status);
    }
  } catch (error) {
    console.log('❌ Failed to connect to backend:', error.message);
  }
}

testBackend(); 