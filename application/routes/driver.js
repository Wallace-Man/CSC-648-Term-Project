const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');

// Configure the MySQL database connection
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
});

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

//Route to handle driver login
router.post('/driver/login', async (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT driverID, driver_password FROM drivers WHERE driver_username = ?';

  try {
    // Promisify the MySQL query function
    const queryPromise = util.promisify(dbConnection.query).bind(dbConnection);
    // Execute the SQL query with the form data
    const result = await queryPromise(query, [username]);

    // Check if there's a matching user and if the password is correct
    if (result.length > 0 && await bcrypt.compare(password, result[0].driver_password)) {
      // Store the driverID in the session
      req.session.driverID = result[0].driverID;

      // Redirect the user to the home page
      res.redirect('/');
    } else {
      // Redirect the user to the login page with an error message
      res.redirect('/login?error=Invalid username or password');
    }
  } catch (err) {
    // Handle errors during the login process
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

// Export the router for use in other files
module.exports = router;
