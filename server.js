const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Only if you're using a `.env` file locally

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration
app.use(cors({
  origin: 'https://qr-feedback-frontend.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use('/api/reviews', require('./routes/reviewRoutes'));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
