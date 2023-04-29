// Import necessary libraries
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');


// Create a MySQL connection
const connection = mysql.createConnection({
    host: "34.94.177.91",
    user: "jruv",
    password: "12345",
    database: "restaurantdb",
  });
  
  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database.');
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM user WHERE username = ?';
  
    try {
      // Promisify the connection.query function
      const queryPromise = util.promisify(connection.query).bind(connection);
  
      // Query the database for a user with the given username
      const results = await queryPromise(query, [username]);
  
      if (results.length > 0) {
        const user = results[0];
        
        // Compare the hashed password in the database with the provided password
        const passwordMatches = await bcrypt.compare(password, user.password);
  
        if (passwordMatches) {
          res.redirect('/');
        } else {
          console.log(res.render('login', { error: 'Invalid username or password' }));
          
        }
      } else {
        console.log(res.render('login', { error: 'Invalid username or password' }));
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).send('Internal Server Error: ' + err.message);
    }
  });
  
  module.exports = router;
  