const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const registerRoute = require('./routes/register'); // Import the register route
const loginRoute = require('./routes/login'); // Import the login route
const adminRoutes = require('./routes/admin'); // Admin routes
const trainRoutes = require('./routes/trainRoutes'); // Train routes (seat availability)
const bookingRoutes = require('./routes/booking'); // Booking routes
const bookingDetailsRoute = require('./routes/bookingDetails');

dotenv.config();  



const app = express();
app.use(bodyParser.json());  // Parse JSON requests

// User Routes
app.use('/api/register', registerRoute); 
app.use('/api/login', loginRoute); 
app.use('/api/admin', adminRoutes);  // Admin routes (protected by API key)
app.use('/api', trainRoutes);  
app.use('/api', bookingRoutes);  // Booking routes (protected by JWT)
app.use('/api', bookingDetailsRoute);


app.get('/', (req, res) => {
  res.send('Welcome to Railway Management API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
