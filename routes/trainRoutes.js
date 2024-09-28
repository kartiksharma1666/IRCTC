
const express = require('express');
const connection = require('../models/userModel'); 
const router = express.Router();

// Get Available Trains (Public route)
router.get('/trains', (req, res) => {
  const { source, destination } = req.query;

  const query = `SELECT * FROM trains WHERE source = ? AND destination = ?`;

  connection.query(query, [source, destination], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching trains', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No trains found between these stations' });
    }

    res.status(200).json({ trains: results });
  });
});

module.exports = router;
