require('dotenv').config(); 


const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const { protect } = require('./middlewares/authMiddleware');
const {
  generateInterviewQuestions,
  generateConceptExplanation
} = require('./controllers/aiController');

const app = express();

// Middleware to handle cors
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://interview-prep-w2dy-mocha.vercel.app',
      'https://interview-prep-one-zeta.vercel.app',
      /https:\/\/.*\.vercel\.app$/
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// Middleware
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Interview Prep API is running!', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);

app.post('/api/ai/generate-questions', protect, generateInterviewQuestions);
app.post('/api/ai/generate-explanation', protect, generateConceptExplanation);

// Serve upload folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});