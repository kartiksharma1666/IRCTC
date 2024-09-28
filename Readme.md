## Setup Instructions

### Step 1: Clone the Repository
```bash
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
Step 5: Run the Server

npm run server
