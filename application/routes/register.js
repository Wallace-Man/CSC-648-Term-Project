const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const util = require('util');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "34.94.177.91",
  user: "root",
  password: "Jaws0044!",
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


  //rounds for bcrypt
const saltRounds = 10;

// POST request for sign up
router.post('/authorization', async (req, res) => {
    const { username, email, password, password2 } = req.body;
  
    if (password != password2) {
      res.render('register', { error: 'Passwords do not match. Please try again.' });
      return;
    }
  
    try {
      // Promisify the connection.query function
      const queryPromise = util.promisify(connection.query).bind(connection);
  
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Replace the original password with the hashed password in the query
      const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
      const results = await queryPromise(query, [username, email, hashedPassword]);
  
      if (results.affectedRows > 0) {
        res.redirect('/');
        console.log('Account Created!');
      } else {
        res.render('register', { error: 'Unable to create an account. Please try again.' });
      }
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send('Internal Server Error: ' + err.message);
    }
  });
  
  module.exports = router;