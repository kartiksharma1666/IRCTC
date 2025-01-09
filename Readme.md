git clone https://github.com/kartiksharma1666/IRCTC.git
cd IRCTC

Step 2: Install Dependencies
npm install

Step 3: Set Up Environment Variables
Create a .env file in the root directory and add the following details:
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=railway_management
JWT_SECRET=your_jwt_secret
ADMIN_API_KEY=your_admin_api_key

Step 4: Set Up MySQL Database
Create Database:
sql
Copy code
CREATE DATABASE railway_management;
Create Users Table:
sql

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);
Create Trains Table:
sql

CREATE TABLE trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_name VARCHAR(255) NOT NULL,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  seat_capacity INT NOT NULL,
  seats_available INT NOT NULL
);

Create Booking Table:

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    train_id INT NOT NULL,
    booking_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (train_id) REFERENCES trains(id) ON DELETE CASCADE
);

Step 5: Run the Server

npm run server

1. User Registration
Endpoint: /api/register
Method: POST
Description: Used to create a new user account.
2. User Login
Endpoint: /api/login
Method: POST
Description: Allows users to authenticate and receive a JWT token for protected routes.
3. Admin Routes
Endpoint: /api/admin/add-train
Method: POST
Description: Admin-only routes, protected by an API key. Used for adding train details.
4. Train Routes
Endpoint: /api/trainRoutes
Method: GET
Description: Provides train schedules.
5. Booking Routes
Endpoint: /api/booking
Method: POST/GET
Description: Handles train seat bookings, updating booking status, and managing reservations.
6. Booking Details
Endpoint: /api/booking-details
Method: GET
Description: Fetches details about a specific booking using booking ID.
7. Available Seats
Endpoint: /api/availableSeats
Method: GET
Description: Retrieves the availability of seats between source and destination after logging in.
