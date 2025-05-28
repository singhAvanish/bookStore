# 📚 Bookstore Web App

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application for managing books and reviews with user authentication.

---

## 🔧 Project Setup Instructions

### 📁 Prerequisites

* Node.js & npm
* MongoDB Atlas account
* Git
* (Optional) Postman or curl for API testing

### 📦 Backend Setup (`/backend`)

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<your_secret>
```

Start the server:

```bash
npm start
```

### 🌐 Frontend Setup (`/book`)

```bash
cd book
npm install
```

Create a `.env` file inside `book/`:
### For local Backend
```env

REACT_APP_API_URL=http://localhost:4000/api 

```
### For Deployed Backend
REACT_APP_API_URL=https://bookstore-bsw6.onrender.com/api

Start the React app:


```bash
npm start
```

---

## ▶️ How to Run Locally

1. Make sure MongoDB Atlas is running and `.env` variables are correctly set.
2. Start the backend: `cd backend && npm start`
3. Start the frontend: `cd book && npm start`
4. Visit: `http://localhost:3000`

---

## 🧪 Example API Requests

### 🔐 Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"user@example.com","password":"password123"}'
```

### 📝 Add Book

```bash
curl -X POST http://localhost:4000/api/books \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"title":"Test Book","author":"Author A","genre":"Fiction","description":"Some desc"}'
```

---

## 🧠 Design Decisions & Assumptions

* **Authentication** is managed using JWT tokens stored in `AuthContext`.
* **CORS** is set to allow requests from both `localhost` and deployed frontend on Vercel.
* **Mongoose** handles all MongoDB interactions.
* **User roles** are not used; any authenticated user can add/review books.
* **React Context API** manages auth state across frontend components.

---

## 💃 Database Schema

### 👤 User

```js
{
  name: String,
  email: String,
  password: String (hashed)
}
```

### 📘 Book

```js
{
  title: String,
  author: String,
  genre: String,
  description: String,
  createdBy: ObjectId (ref to User)
}
```

### 🌟 Review

```js
{
  bookId: ObjectId (ref to Book),
  userId: ObjectId (ref to User),
  rating: Number,
  comment: String
}
```

---

Feel free to update this document based on new changes or enhancements.
