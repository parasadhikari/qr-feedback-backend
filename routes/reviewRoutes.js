const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST a new review
router.post('/', async (req, res) => {
  const { name, message, rating } = req.body;

  try {
    const newReview = new Review({ name, message, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save review' });
  }
});

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
