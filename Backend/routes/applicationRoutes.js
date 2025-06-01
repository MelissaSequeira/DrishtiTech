const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Application = require('../models/Application');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // use full path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST /api/apply - form submission
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    console.log('📥 Received form data:', req.body);
    console.log('📎 Uploaded file info:', req.file);

    const { name, email, role } = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!name || !email || !role || !resumePath) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newApplication = new Application({ name, email, role, resumePath });
    await newApplication.save();

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('❌ Error in /api/apply:', error);
    res.status(500).json({ error: 'Server error while submitting application' });
  }
});

// GET /api/apply - fetch all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    console.error('❌ Error fetching applications:', err);
    res.status(500).json({ error: 'Server error fetching applications.' });
  }
});

module.exports = router;
