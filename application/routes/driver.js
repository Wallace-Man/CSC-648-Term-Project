// Import required modules
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');


// Route to handle driver registration
router.post('/driver', async (req, res) => {
  // Extract form data from the request body
  const { username, email, password, secPassword, phoneNum } = req.body;

  // Check if the two passwords match
  if (password != secPassword) {
    res.render('driver', { error: 'Passwords do not match' });
    return;
  }

  // Define the SQL query to insert a new driver into the database
  const query = 'INSERT INTO drivers (diver_username, driver_email, driver_password, phone_number) VALUES (?, ?, ?, ?)';

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Promisify the MySQL query function
    const queryPromise = util.promisify(connection.query).bind(connection);
    // Execute the SQL query with the form data
    await queryPromise(query, [username, email, hashedPassword, phoneNum]);

    console.log('Account Created!');
    // Redirect the user to the home page
    res.redirect('/');
  } catch (err) {
    // Handle errors during the registration process
    console.error('Error during registration:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

// Export the router for use in other files
module.exports = router;
