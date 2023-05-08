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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM user WHERE username = ?';

  try {


    // Query the database for a user with the given username
    const results = await db.query(query, [username]);

    if (results.length > 0) {
      const user = results[0];

      console.log('Entered password:', password);

      // Compare the hashed password in the database with the provided password
      const passwordMatches = await bcrypt.compare(password, user.password);

      console.log('Password matches:', passwordMatches);

      if (passwordMatches) {
        req.session.user = user;  // set session cookie
        console.log('Redirecting to home page');
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

    router.get('/editUser', function(req, res) {
    // Retrieve the user's current information from the database
      const query = 'SELECT * FROM user WHERE user_id=?';
      const params = [req.session.user.user_id];
        db.query(query, params, function(error, results, fields) {
      if (error) {
        console.error('Error retrieving user:', error);
        res.status(500).send('Internal Server Error: ' + error.message);
        return;
        }

      // Render the edit user page with the current information
        res.render('editUser', { user: results[0] });
    });
});

router.post('/editUser', function(req, res) {
  // Extract the updated information from the request body
  const { username, email, password } = req.body;

  // Hash the new password using bcrypt
  bcrypt.hash(password, 10, function(error, hashedPassword) {
    if (error) {
      console.error('Error hashing password:', error);
      res.status(500).send('Internal Server Error: ' + error.message);
      return;
    }

    // Update the user's information in the database
    const query = 'UPDATE user SET username=?, email=?, password=? WHERE user_id=?';
    const params = [username, email, hashedPassword, req.session.user.user_id];
    db.query(query, params, function(error, results, fields) {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error: ' + error.message);
        return;
      }

      // Redirect back to the user account page
      res.redirect('/userAccount');
    });
  });
});

module.exports = router;
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
    console.log("User is logged in! ")
  }
}
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = {
  router,
  ensureAuthenticated
};
