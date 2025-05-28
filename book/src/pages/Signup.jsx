import React, { useState } from 'react';
import axios from 'axios';
import Toast from './Toast';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [toastMessage, setToastMessage] = useState('');
  const api = process.env.REACT_APP_API_URL;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/auth/signup`, form);
      showToast(res.data.message);
    } catch (err) {
      showToast(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <Toast message={toastMessage} />
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <h2>Sign Up</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <button
          type="button"
          style={{ marginLeft: '1rem' }}
          onClick={() => window.location.href = '/'}
        >
          Go to Login
        </button>
      </form>
    </>
  );
}

export default Signup;
