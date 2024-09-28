
const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../models/userModel'); // MySQL connection
const router = express.Router();


router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if trying to register as admin
  if (role === 'admin') {
    const apiKey = req.header('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ message: 'Forbidden: You cannot register as admin without valid API key' });
    }
  }

  // Check if user already exists
  connection.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    };

    connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

module.exports = router;
