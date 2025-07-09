const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Adjust the path if needed

// POST route to save reviews
router.post('/api/reviews', async (req, res) => {
  const { name, message, rating } = req.body;

  try {
    const review = new Review({ name, message, rating });
    await review.save();
    res.status(201).json({ message: 'Review saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to fetch reviews (optional but useful)
router.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
