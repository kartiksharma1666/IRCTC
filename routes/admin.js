
const express = require('express');
const connection = require('../models/userModel'); 
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware'); // API Key middleware
const router = express.Router();

// Add New Train (Admin only, protected by API key)
router.post('/add-train', apiKeyMiddleware, (req, res) => {
  const { trainName, source, destination, seatCapacity } = req.body;

  const query = `INSERT INTO trains (train_name, source, destination, seat_capacity, seats_available)
                 VALUES (?, ?, ?, ?, ?)`;

  connection.query(query, [trainName, source, destination, seatCapacity, seatCapacity], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error adding train', error: err });

    res.status(201).json({ message: 'Train added successfully', trainId: results.insertId });
  });
});

module.exports = router;
