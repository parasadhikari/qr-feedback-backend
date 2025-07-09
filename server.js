const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/qr-feedback', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Error:", err));

// Schema and Model
const reviewSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number, // <-- Add this line
  date: { type: Date, default: Date.now } // Optional: adds timestamp
});


const Review = mongoose.model('Review', reviewSchema);

// Routes
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, message, rating } = req.body; // include rating
    const newReview = new Review({ name, message, rating });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
