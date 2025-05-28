import React, { useState } from 'react';

const UpdateReviewForm = ({ review, onSubmit, onClose }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5 || !comment) {
      alert('Please enter valid rating and comment.');
      return;
    }
    onSubmit(review._id, comment, rating);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        minWidth: '300px'
      }}>
        <h3>Update Review</h3>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-5)"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          required
        />
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReviewForm;
