const express = require('express');
const router = express.Router();
const multer = require('multer');
const Application = require('../models/Application');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST /api/apply - Handle application form submissions
// POST /api/apply - Handle application form submissions
// Route to handle application form submission
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const resumePath = req.file ? req.file.path : null; // ✅ FIXED field name

    if (!name || !email || !role || !resumePath) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newApplication = new Application({ name, email, role, resumePath }); // ✅ FIXED field name
    await newApplication.save();

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('❌ Error in /api/apply:', error.message);
    res.status(500).json({ error: 'Server error while submitting application' });
  }
});


// In your applicationRoutes.js file
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
});


module.exports = router;
