const Review = require('../models/Review');
const Book = require('../models/Book');

// Create review (one per user per book)
exports.createReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const existing = await Review.findOne({
      book: req.params.id,
      user: req.user.userId
    });

    if (existing) return res.status(400).json({ message: 'You already reviewed this book' });

    const review = new Review({
      book: req.params.id,
      user: req.user.userId,
      rating,
      comment
    });

    await review.save();
    await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
