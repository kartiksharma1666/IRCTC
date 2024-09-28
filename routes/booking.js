
const express = require('express');
const connection = require('../models/userModel'); // MySQL connection
const authMiddleware = require('../middlewares/authMiddleware'); // JWT Auth middleware
const router = express.Router();


router.post('/book-seat', authMiddleware, (req, res) => {
    const { trainId } = req.body;
    const userId = req.user.id;  
  
    // Start a transaction to prevent race conditions
    connection.beginTransaction((err) => {
      if (err) return res.status(500).json({ message: 'Transaction error', error: err });
  
      // Lock the row for seat booking to prevent other users from booking the same seat
      const lockQuery = `SELECT seats_available FROM trains WHERE id = ? FOR UPDATE`;
  
      connection.query(lockQuery, [trainId], (err, results) => {
        if (err) {
          return connection.rollback(() => res.status(500).json({ message: 'Error locking row', error: err }));
        }
  
        const seatsAvailable = results[0]?.seats_available;
  
        // Check if seats are available
        if (seatsAvailable > 0) {
          // Proceed to book the seat by decreasing the seats_available count
          const updateQuery = `UPDATE trains SET seats_available = seats_available - 1 WHERE id = ?`;
  
          connection.query(updateQuery, [trainId], (err, updateResults) => {
            if (err) {
              return connection.rollback(() => res.status(500).json({ message: 'Error booking seat', error: err }));
            }
  
            // Insert booking into bookings table
            const bookingQuery = `INSERT INTO bookings (user_id, train_id) VALUES (?, ?)`;
  
            connection.query(bookingQuery, [userId, trainId], (err, bookingResults) => {
              if (err) {
                return connection.rollback(() => res.status(500).json({ message: 'Error inserting booking', error: err }));
              }
  
              // Commit the transaction if booking and record insertion were successful
              connection.commit((err) => {
                if (err) {
                  return connection.rollback(() => res.status(500).json({ message: 'Transaction commit error', error: err }));
                }
  
                res.status(200).json({ message: 'Seat booked successfully' });
              });
            });
          });
        } else {
          // No seats available, rollback the transaction
          connection.rollback(() => res.status(400).json({ message: 'No seats available' }));
        }
      });
    });
  });
  

module.exports = router;
