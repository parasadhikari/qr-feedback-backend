const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
