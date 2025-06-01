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
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is missing.' });
    }

    const newApp = new Application({
      name,
      email,
      role,
      resume: req.file.path // ✅ Use 'resume' to match your schema
    });

    await newApp.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error('Error while saving application:', err.message);
    res.status(500).json({ error: 'Something went wrong on the server.', details: err.message });
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
