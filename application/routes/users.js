// Import required modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');


// views/login.pug
//

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => { // Change this line
  const { username, password } = req.body;
  const query = 'SELECT * FROM user WHERE username = ?';

  try {


    // Query the database for a user with the given username
    const results = await db.query(query, [username]);

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


// views/signup.pug
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


    // Insert the user into the database
    await db.query(query, [username, email, hashedPassword]);

    console.log('Account Created!');
    res.redirect('/login');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});


module.exports = router;
