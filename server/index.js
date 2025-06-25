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
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/feedback', feedbackRouter);
app.use('/studentfeedback', studentFeedbackRouter);
app.use('/alumnifeedback', alumniFeedbackRouter);
app.use('/parentfeedback', parentFeedbackRouter);

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
