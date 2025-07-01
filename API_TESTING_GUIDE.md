# API Testing Guide for Nimapara College Feedback System

This guide provides comprehensive testing resources for the feedback system backend API.

## 📁 Files Included

1. **`postman_collection.json`** - Complete Postman collection with all endpoints
2. **`test_api_endpoints.js`** - Node.js test script for automated testing
3. **`API_TESTING_GUIDE.md`** - This guide

## 🚀 Quick Start

### Prerequisites
- Backend server running on `http://localhost:3000`
- MongoDB connection established
- Node.js installed (for test script)

### Method 1: Using Postman Collection

1. **Import Collection**
   - Open Postman
   - Click "Import" button
   - Select the `postman_collection.json` file
   - The collection will be imported with all endpoints

2. **Set Environment Variable**
   - The collection uses `{{baseUrl}}` variable
   - Default value is `http://localhost:3000`
   - You can change this in the collection variables

3. **Test Endpoints**
   - Each endpoint is organized by feedback type
   - Start with POST requests to submit feedback
   - Use GET requests to retrieve data

### Method 2: Using Test Script

1. **Install Dependencies**
   ```bash
   cd feedback-backend/server
   npm install axios
   ```

2. **Run Test Script**
   ```bash
   node test_api_endpoints.js
   ```

3. **View Results**
   - The script will test all endpoints automatically
   - Shows success/failure for each test
   - Provides detailed response data

## 📋 API Endpoints Overview

### Student Feedback Endpoints
- `POST /studentfeedback/student` - Submit student feedback
- `GET /studentfeedback/all` - Get all student feedbacks
- `GET /studentfeedback` - Get student feedback statistics

### Parent Feedback Endpoints
- `POST /parentfeedback/parent` - Submit parent feedback
- `GET /parentfeedback/all` - Get all parent feedbacks
- `GET /parentfeedback` - Get parent feedback statistics

### Alumni Feedback Endpoints
- `POST /alumnifeedback/alumni` - Submit alumni feedback
- `GET /alumnifeedback/all` - Get all alumni feedbacks
- `GET /alumnifeedback` - Get alumni feedback statistics

### General Endpoints
- `GET /` - Get all feedbacks with optional filtering
- `GET /feedback` - Admin view of all feedbacks

## 🔧 Testing Individual Endpoints

### 1. Test Student Feedback Submission

**URL:** `POST http://localhost:3000/studentfeedback/student`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "studentName": "John Doe",
  "department": "Computer Science",
  "yearOfStudy": "3rd Year",
  "major": "B.Tech Computer Science",
  "studentId": "CS2021001",
  "instructionQuality": "Very Satisfied",
  "facultyHelpfulness": "Very Accessible/Helpful",
  "teachingMethods": "The teaching methods are very effective.",
  "courseAlignment": "The courses are well-aligned with my career goals.",
  "campusEnvironment": "Very Satisfied",
  "strengths": "Excellent faculty, good infrastructure",
  "areasForImprovement": "More parking space",
  "otherComments": "Overall satisfied with the college experience."
}
```

### 2. Test Parent Feedback Submission

**URL:** `POST http://localhost:3000/parentfeedback/parent`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "studentName": "Sarah Johnson",
  "studentYear": "2nd Year",
  "studentMajor": "B.Tech Information Technology",
  "parentName": "Michael Johnson",
  "academicSatisfaction": "Very Satisfied",
  "academicSatisfactionExplain": "My child has shown significant improvement.",
  "campusSafety": "Very Safe",
  "campusSafetyExplain": "The campus has good security measures.",
  "parentStrengths": "Excellent faculty, supportive environment",
  "parentImprovements": "More parking facilities",
  "parentComments": "We are very satisfied with the college."
}
```

### 3. Test Alumni Feedback Submission

**URL:** `POST http://localhost:3000/alumnifeedback/alumni`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Priya Sharma",
  "graduationYear": "2022",
  "major": "B.Tech Computer Science",
  "email": "priya.sharma@email.com",
  "profession": "Software Engineer",
  "prepForCareer": "Very Well",
  "prepForCareerExplain": "The technical skills I developed have been invaluable.",
  "alumniStrengths": "Excellent faculty, strong technical curriculum",
  "alumniImprovements": "More industry partnerships",
  "alumniComments": "My experience was excellent and instrumental in my career success."
}
```

## 🔍 Query Parameters for GET Requests

### Pagination
```
GET /?limit=5&page=1
```

### Filter by Type
```
GET /?type=student
GET /?type=parent
GET /?type=alumni
```

### Combined Filters
```
GET /?type=student&limit=10&page=1
```

## ✅ Expected Responses

### Successful POST Response
```json
{
  "message": "Feedback submitted successfully",
  "feedback": {
    "_id": "...",
    "type": "student",
    "studentName": "John Doe",
    "submittedAt": "2024-01-01T00:00:00.000Z",
    ...
  }
}
```

### Successful GET Response
```json
{
  "totalFeedbacks": 5,
  "feedbacks": [
    {
      "_id": "...",
      "type": "student",
      "studentName": "John Doe",
      "submittedAt": "2024-01-01T00:00:00.000Z",
      ...
    }
  ]
}
```

## 🚨 Common Issues and Solutions

### 1. Connection Refused
- **Issue:** Cannot connect to server
- **Solution:** Ensure backend server is running on port 3000

### 2. MongoDB Connection Error
- **Issue:** Database connection failed
- **Solution:** Check MongoDB connection string in `.env` file

### 3. CORS Error
- **Issue:** Cross-origin request blocked
- **Solution:** CORS is configured to allow localhost:3000 and localhost:3001

### 4. Validation Error
- **Issue:** Required fields missing
- **Solution:** Ensure all required fields are provided in the request body

## 📊 Testing Checklist

- [ ] Backend server is running
- [ ] MongoDB connection is established
- [ ] Student feedback submission works
- [ ] Parent feedback submission works
- [ ] Alumni feedback submission works
- [ ] GET endpoints return data correctly
- [ ] Pagination works
- [ ] Filtering by type works
- [ ] Error handling works properly

## 🎯 Next Steps

After successful testing:

1. **Frontend Integration:** Test the frontend with the working backend
2. **Production Deployment:** Update the base URL for production
3. **Security:** Implement proper authentication if needed
4. **Monitoring:** Set up logging and monitoring for production use

## 📞 Support

If you encounter any issues:

1. Check the server logs for error messages
2. Verify MongoDB connection
3. Ensure all required environment variables are set
4. Test with the provided test script first

---

**Happy Testing! 🚀** 