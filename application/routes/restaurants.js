// Import necessary libraries
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const util = require('util');

// Create a MySQL connection
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jaws0044",
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
//function for database photo import

//cloudinary configuration for image storage
cloudinary.config({
  cloud_name: 'dh1xrnknh',
  api_key: '455679853853498',
  api_secret: 'ICod3Gyzgek7V8PxsDI_28aCguA'
});
//Generates cloud link for image to then be used on postman as a post request
// cloudinary.uploader.upload('public/images/jjop.jpeg', (error, result) => {
//   if (error) {
//     console.error('Error uploading image:', error);
//   } else {
//     console.log('Image uploaded successfully:', result.url);
//   }
// });

//uncomment to test the route
// router.get('/test', (req, res) => {
//   res.send('Test route is working');
// });


// Define /getRestaurants endpoint to search for restaurants by name
router.get('/getRestaurants', (req, res) => {
  const searchTerm = req.query.searchTerm; // Get the search term from the query string
  const query = "SELECT restaurantID, restaurant_Name FROM restaurant WHERE restaurant_Name LIKE '%" + searchTerm + "%'";
 // Create SQL query
  console.log(`Executing query: ${query}`);

  // Execute the SQL query and handle the result
  dbConnection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Query result:', result);
    res.json(result); // Send the result as the response
  });
});

// Define /getCuisineType endpoint to search for restaurants by cuisine type
router.get('/getCuisineType', (req, res) => {
  const searchTerm = req.query.searchTerm; // Get the search term from the query string
  // const query = "SELECT restaurant_Name, image_url,delivery_time FROM Restaurant WHERE cuisine_type = '" + searchTerm + "'"; // Create SQL query, include image_url
  const query = "SELECT restaurantID, restaurant_Name, address_, city, state_, zip_code, image_url, delivery_time FROM restaurant WHERE cuisine_type = '" + searchTerm + "'";


  console.log(`Executing query: ${query}`);

  // Execute the SQL query and handle the result
  dbConnection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Query result:', result);
    res.json(result); // Send the result as the response
  });
});


// Define /getAllRestaurants endpoint to return all restaurants
router.get('/getAllRestaurants', (req, res) => {
  const query = "SELECT * FROM restaurant"; // Create SQL query

  // Execute the SQL query and handle the result
  dbConnection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result); // Send the result as the response
  });
});

router.post('/restaurant', async (req, res) => {
  console.log(req.body);
  const { address, city, state, country, zip, name, username, email, password, phone, website, open, close, deliveryTime, cuisine, imageURL } = req.body;
  console.log('Inside Restaurant');
  // Log the form data
  console.log('Form data:', req.body);

  const query = 'INSERT INTO restaurant (restaurant_Name, website, address_, city, state_, zip_code, country, open_, closed, cuisine_type, image_url, delivery_time, restaurant_username, password, email, phone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  try {
    // Promisify the MySQL query function
    const queryPromise = util.promisify(dbConnection.query).bind(dbConnection);
    // Execute the SQL query with the form data
    await queryPromise(query, [name, website, address, city, state, zip, country, open, close, cuisine, imageURL, deliveryTime, username, hashPassword(password), email, phone]);
    console.log('Account Created!');
    // Redirect the user to the home page
    res.redirect('/');
  } catch (err) {
    // Handle errors during the registration process
    console.error('Error during registration:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});


// Add a new route for the restaurant login
router.get('/restaurantLogin', (req, res) => {
  res.render('restaurantLogin');
});
router.get('/Restaurantlogout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Add a new route for the restaurant login
// Add a new route for the restaurant login
router.post('/restaurantLogin', async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body

  const { email, password } = req.body;
  const query = 'SELECT restaurantID, password FROM restaurant WHERE email = ?';

  try {
    const queryPromise = util.promisify(dbConnection.query).bind(dbConnection);
    const results = await queryPromise(query, [email]);

    console.log('Query results:', results);

    if (results.length === 0) {
      console.error('Error during login: Email not found');
      res.status(401).send('Invalid email or password');
      return;
    }

    for (let i = 0; i < results.length; i++) {
      if (await bcrypt.compare(password, results[i].password)) {
        req.session.restaurantID = results[i].restaurantID;
        req.session.restaurant = true;

        console.log('Session after successful restaurant login:', req.session);
        res.redirect('/');
        return;
      }
    }

    console.error('Error during login: Incorrect password');
    res.redirect('/login?error=Invalid email or password');
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});



module.exports = router;

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}