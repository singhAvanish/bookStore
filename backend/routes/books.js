const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');

// POST /books - Add new book (Authenticated)
router.post('/', authenticateToken, bookController.createBook);

// GET /books - List books with pagination, author & genre filters
router.get('/',authenticateToken, bookController.getBooks);

// GET /books/:id - Get book details including average rating & reviews
router.get('/:id', bookController.getBookById);

// POST /books/:id/reviews - Submit review for a book (Authenticated)
router.post('/:id/reviews', authenticateToken, reviewController.createReview);

// GET /search - Search books by title or author (partial, case-insensitive)
router.get('/search', bookController.searchBooks);

module.exports = router;
