

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AddBook from './AddBook';
import Toast from './Toast';
import UpdateReviewForm from './UpdateReviewForm';
import "../styles/book.css"

function Book() {
  const { token, user, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const booksPerPage = 3;

  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (user && token) {
      fetchBooks();
    }
  }, [token, user]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const handleReviewSubmit = async (bookId, rating, comment) => {
    try {
      await axios.post(
        `${api}/books/${bookId}/reviews`,
        { rating: Number(rating), comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast('Review added');
      fetchBooks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit review');
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await axios.delete(`${api}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast('Review deleted');
      fetchBooks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete review');
    }
  };

  const handleReviewUpdate = async (reviewId, updatedComment, updatedRating) => {
    try {
      await axios.put(
        `${api}/reviews/${reviewId}`,
        { comment: updatedComment, rating: Number(updatedRating) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast('Review updated');
      fetchBooks();
      setEditingReview(null);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update review');
    }
  };

  const logOut = () => {
    logout();
    window.location.href = "/";
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (!token || !user) return <p>Please log in to see and review books.</p>;
  if (loading) return <p>Loading books...</p>;

  return (
    <div className="container">
      <Toast message={toastMessage} />

     

      <h2>All Books with Reviews</h2>
      <input
        type="text"
        placeholder="Search by title or genre..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="book">
        {paginatedBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          paginatedBooks.map((book) => {
            const userReview = book.reviews?.find((r) => r.user._id === user._id);
            return (
              <div key={book._id} className="book-card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Description:</strong> {book.description}</p>

                <h4>Reviews:</h4>
                {book.reviews?.length > 0 ? (
                  <ol>
                    {book.reviews.map((review) => (
                      <li key={review._id}>
                        <ul style={{ listStyle: 'none' }}>
                          <li>{review.user.name}</li>
                          <li>Rating: {review.rating}</li>
                          <li>Comment: {review.comment}</li>
                          {user._id === review.user._id && (
                            <>
                              <button onClick={() => setEditingReview(review)}>Update</button>{' '}
                              <button onClick={() => handleReviewDelete(review._id)}>Delete</button>
                            </>
                          )}
                        </ul>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>No reviews yet.</p>
                )}

                {!userReview && (
                  <form
                    className="review-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const rating = e.target.elements[`rating-${book._id}`].value;
                      const comment = e.target.elements[`comment-${book._id}`].value;
                      handleReviewSubmit(book._id, rating, comment);
                      e.target.reset();
                    }}
                  >
                    <input
                      type="number"
                      name={`rating-${book._id}`}
                      min="1"
                      max="5"
                      placeholder="Rating (1-5)"
                      required
                    />
                    <textarea
                      name={`comment-${book._id}`}
                      placeholder="Write a review..."
                      required
                    />
                    <button type="submit">Submit Review</button>
                  </form>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => goToPage(idx + 1)}
            className={currentPage === idx + 1 ? 'active' : ''}
          >
            {idx + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>

      <button className="toggle-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Close Add Book Form' : 'Add New Book'}
      </button>

      {showAddForm && <AddBook onBookAdded={fetchBooks} />}

      <button className="logout-btn" onClick={logOut}>Log Out</button>

      {editingReview && (
        <UpdateReviewForm
          review={editingReview}
          onSubmit={handleReviewUpdate}
          onClose={() => setEditingReview(null)}
        />
      )}
    </div>
  );
}

export default Book;

