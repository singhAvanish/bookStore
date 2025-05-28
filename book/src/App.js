import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Book from './pages/Book';
import AddBook from './pages/AddBook';


import { AuthContext } from './context/AuthContext';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Book />} />
        <Route path="/add-book" element={<AddBook />} />
        
       
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/books" />
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Login</h2>
                <Login />
                <p>Not registered yet?</p>
                <a href="/signup">Sign Up</a>
              </div>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
