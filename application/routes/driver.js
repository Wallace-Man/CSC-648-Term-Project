const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');
const { ensureUserAuthenticated, ensureRestaurantAuthenticated, ensureDriverAuthenticated } = require('./users');

// Configure the MySQL database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jaws0044",
  database: "restaurantdb",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
});

// Route to handle driver registration
// Route to handle driver registration
// Route to handle driver registration
router.post('/driver', async (req, res) => {
  console.log('Driver registration route hit.');
  console.log('Request Body:', req.body);

  // Extract form data from the request body
  const { username, email, password, password2, phoneNum } = req.body;

  // Check if the two passwords match
  if (password != password2) {
    console.log('Error: Passwords do not match.');
    res.render('driver', { error: 'Passwords do not match' });
    return;
  }

  // Define the SQL query to insert a new driver into the database
  const query = 'INSERT INTO drivers (driver_username, driver_email, driver_password, phone_number) VALUES (?, ?, ?, ?)';
  console.log('SQL Query:', query);

  try {
    // Hash the password using bcrypt
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed.');

    // Promisify the MySQL query function
    console.log('Promisifying query function...');
    const queryPromise = util.promisify(connection.query).bind(connection);

    // Execute the SQL query with the form data
    console.log('Executing SQL query...');
    await queryPromise(query, [username, email, hashedPassword, phoneNum]);
    console.log('SQL query executed.');

    console.log('Account Created!');
    // Redirect the user to the home page
    res.redirect('/');
  } catch (err) {
    // Handle errors during the registration process
    console.error('Error during registration:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
    return;
  }
});

//Route to handle driver login
router.post('/driverLogin', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT driverID, driver_password FROM drivers WHERE driver_email = ?';

  try {
    // Promisify the MySQL query function
    const queryPromise = util.promisify(connection.query).bind(connection);
    // Execute the SQL query with the form data
    const results = await queryPromise(query, [email]);

    // Check if there's a matching user and if the password is correct
    for (let i = 0; i < results.length; i++) {
      if (await bcrypt.compare(password, results[i].driver_password)) {
        // Store the driverID in the session
        req.session.driverID = results[i].driverID;
        console.log(req.session.driverID);

        // Redirect the user to the home page
        res.redirect('/');
        return; // Exit the function
      }
    }

    // If no match was found, redirect the user to the login page with an error message
    res.redirect('/login?error=Invalid email or password');
  } catch (err) {
    // Handle errors during the login process
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});
router.get('/driverLogout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
router.get('/driver', function(req, res) {
  res.render('driver');
});


// Export the router for use in other files
module.exports = router;
