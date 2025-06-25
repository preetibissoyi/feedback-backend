var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentFeedbackRouter = require('./routes/studentFeedback');
const alumniFeedbackRouter = require('./routes/alumniFeedback');
const parentFeedbackRouter = require('./routes/parentFeedback');
// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://xappsoft:xappsoft%40123@cluster0.jvr4sjv.mongodb.net/feedback';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

var app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? '*' // Allow all origins in production
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/studentfeedback', studentFeedbackRouter);
app.use('/alumnifeedback', alumniFeedbackRouter);
app.use('/parentfeedback', parentFeedbackRouter);

// View feedback route for admin access
app.get('/feedback', async (req, res) => {
  try {
    const { admin_password } = req.query;
    
    // Simple password check (in production, use proper authentication)
    if (admin_password !== 'admin123') {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const Feedback = require('./models/feedback');
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    
    res.json({
      totalFeedbacks: feedbacks.length,
      feedbacks: feedbacks
    });
  } catch (error) {
    console.error('View feedback error:', error);
    res.status(500).json({ error: 'Failed to fetch feedback data.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Port configuration
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
