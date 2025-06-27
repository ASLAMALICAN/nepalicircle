require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Routes
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload'); // ✅ NEW: upload route

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static file serving for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ NEW

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes); // ✅ NEW

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
