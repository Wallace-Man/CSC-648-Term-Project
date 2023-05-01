const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');

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
  // console.log('Connected to the database.');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => { // Change this line
  const { username, password } = req.body;
  const query = 'SELECT * FROM user WHERE username = ?';

  try {
    // Promisify the connection.query function
    const queryPromise = util.promisify(connection.query).bind(connection);

    // Query the database for a user with the given username
    const results = await queryPromise(query, [username]);

    if (results.length > 0) {
      const user = results[0];

      console.log('Entered password:', password); // Add this line

      // Compare the hashed password in the database with the provided password
      const passwordMatches = await bcrypt.compare(password, user.password);

      console.log('Password matches:', passwordMatches); // Add this line

      if (passwordMatches) {
        // req.session.user = user;  // set session cookie
        console.log('Redirecting to home page'); // Add this line
        res.redirect('/');        // redirect to home page
        return;
      } else {
        res.render('login', { error: 'Invalid username or password' });
      }
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

module.exports = router;
