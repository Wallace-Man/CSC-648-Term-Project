// Import necessary libraries
const express = require('express');
const router = express.Router();
const mysql = require('mysql');


// Create a MySQL connection
const dbConnection = mysql.createConnection({
    host: "34.94.177.91",
    user: "jruv",
    password: "12345",
    database: "restaurantdb",
  });
  
  // Connect to the MySQL database
  dbConnection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database.');
  });


 /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });


  router.post('/signup', function(req, res, next) {
    console.log(req)
    res.send('data');
  });


// Export the router to be used in the main application
module.exports = router;
