const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

// PUT /reviews/:id - Update your own review (Authenticated)
router.put('/:id', authenticateToken, reviewController.updateReview);

// DELETE /reviews/:id - Delete your own review (Authenticated)
router.delete('/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;
