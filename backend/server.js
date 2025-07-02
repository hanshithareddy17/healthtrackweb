const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const goalRoutes = require('./routes/goals');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// ✅ Updated CORS Setup
const allowedOrigins = [
  'http://localhost:3000',
  'https://healthtrackweb.vercel.app' // 👈 your actual frontend URL on Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. Postman, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parser
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/workouts', require('./routes/workouts'));

// Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
