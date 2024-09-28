
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../models/userModel'); // MySQL connection
const router = express.Router();

// Login Endpoint
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      role: user.role
    });
  });
});

module.exports = router;
