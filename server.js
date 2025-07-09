const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Add CORS middleware
app.use(cors({
  origin: 'https://qr-feedback-frontend.vercel.app', // your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Your routes go here
app.use('/api/reviews', require('./routes/reviewRoutes'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch(err => console.error('MongoDB connection error:', err));
