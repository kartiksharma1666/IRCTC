const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kartik@1666',
  database: 'railway_management'
});

module.exports = connection;
