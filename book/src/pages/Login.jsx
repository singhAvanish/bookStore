import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Toast from './Toast';
import "../styles/Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [toastMessage, setToastMessage] = useState('');
  const api = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/auth/login`, form);
      const { token, user } = res.data;

      login(token, user);
      showToast('Logged in successfully');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Toast message={toastMessage} />
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
