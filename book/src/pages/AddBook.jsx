

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/AddBook.css'

function AddBook({ onBookAdded }) {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
  });

  const api = process.env.REACT_APP_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/books`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Book added successfully');
      setForm({ title: '', author: '', genre: '', description: '' });
      onBookAdded();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add book');
    }
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        required
      />
      <input
        name="genre"
        placeholder="Genre"
        value={form.genre}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
