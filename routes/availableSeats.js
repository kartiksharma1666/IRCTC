const express = require('express');
const connection = require('../config/dbConnection'); // Database connection
const authMiddleware = require('../middlewares/authMiddleware'); // JWT Auth middleware
const router = express.Router();

// Get Seat Availability Endpoint (Protected)
router.get('/trains/available-seats', authMiddleware, (req, res) => {
  const { source, destination } = req.query;

  // Check if source and destination are provided
  if (!source || !destination) {
    return res.status(400).json({ message: 'Source and destination are required' });
  }

  // SQL query to fetch trains between the given source and destination
  const query = `SELECT train_name, source, destination, seat_capacity
                 FROM trains
                 WHERE source = ? AND destination = ?`;

  connection.query(query, [source, destination], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching trains', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No trains found between these stations' });
    }

    res.status(200).json({ trains: results });
  });
});

module.exports = router;
