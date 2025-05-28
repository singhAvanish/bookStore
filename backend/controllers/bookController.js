const Book = require('../models/Book');
const Review = require('../models/Review');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const newBook = new Book({ ...req.body, createdBy: req.user.userId });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all books with pagination and filters
exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = genre;

  try {
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name' // Optional: only include user's name
        }
      });

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single book by ID with average rating and paginated reviews
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const reviews = await Review.find({ book: book._id });
    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length || 1);

    res.json({
      book,
      averageRating,
      reviews
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search books by title or author
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
