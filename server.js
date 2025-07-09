const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // ✅ If using .env file for MONGO_URI

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
app.use(cors({
  origin: 'https://qr-feedback-frontend.vercel.app', // your frontend deployed URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ Routes
app.use('/api/reviews', require('./routes/reviewRoutes'));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch(err => console.error('❌ MongoDB connection error:', err));
