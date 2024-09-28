
const express = require('express');
const connection = require('../models/userModel'); 
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router();

// Get Specific Booking Details (Protected by JWT)
router.get('/booking-details', authMiddleware, (req, res) => {
  const userId = req.user.id;  // Extracted from JWT
  
  // Query to get booking details for the logged-in user
  const query = `SELECT bookings.id, bookings.booking_time, trains.train_name, trains.source, trains.destination
                 FROM bookings
                 JOIN trains ON bookings.train_id = trains.id
                 WHERE bookings.user_id = ?`;

  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching booking details', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json({ bookings: results });
  });
});

module.exports = router;
