const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');

// Create a MySQL connection
const connection = mysql.createConnection({

  host: "34.102.56.1",
  user: "root",
  password: "Jaws0044!!!!",
  database: "restaurantdb",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  // console.log('Connected to the database.');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { username, email, password, password2 } = req.body;

  // Check if the passwords match
  if (password !== password2) {
    res.render('signup', { error: 'Passwords do not match' });
    return;
  }

  const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Promisify the connection.query function
    const queryPromise = util.promisify(connection.query).bind(connection);

    // Insert the user into the database
    await queryPromise(query, [username, email, hashedPassword]);

    console.log('Account Created!');
    res.redirect('/login');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

module.exports = router;
