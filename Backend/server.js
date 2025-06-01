const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const applicationRoutes = require('./routes/applicationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/auth');

const app = express();

// ✅ Enable CORS for your frontend
app.use(cors({
  origin: 'https://drishtitechnologies.netlify.app', // allow your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve static files from uploads folder
const uploadsPath = path.join(__dirname, 'uploads');
console.log('🛠️ Serving static files from:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/apply', applicationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Basic route to check if backend is working
app.get('/', (req, res) => {
  res.send('🎉 API is running! Welcome to the Job Application Backend.');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});