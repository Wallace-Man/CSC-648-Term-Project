// Import necessary libraries
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const db = require('../config/db');

//function for database photo import

//cloudinary configuration for image storage
cloudinary.config({
  cloud_name: 'dh1xrnknh',
  api_key: '455679853853498',
  api_secret: 'ICod3Gyzgek7V8PxsDI_28aCguA'
});
//Generates cloud link for image to then be used on postman as a post request
// cloudinary.uploader.upload('public/images/cinnabon.png', (error, result) => {
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
router.get('/getRestaurants', async (req, res) => {
  const searchTerm = req.query.searchTerm; // Get the search term from the query string
  const query = "SELECT * FROM Restaurant WHERE restaurant_Name LIKE '%" + searchTerm + "%'"; // Create SQL query
  console.log(`Executing query: ${query}`);

  try {
    // Execute the SQL query using the database connection pool and handle the result
    const result = await db.query(query);
    console.log('Query result:', result);
    res.json(result); // Send the result as the response
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define /getCuisineType endpoint to search for restaurants by cuisine type
router.get('/getCuisineType', async (req, res) => {
  const searchTerm = req.query.searchTerm; // Get the search term from the query string
  const query = "SELECT restaurant_Name, image_url,delivery_time FROM Restaurant WHERE cuisine_type = '" + searchTerm + "'"; // Create SQL query, include image_url
  console.log(`Executing query: ${query}`);

  try {
    // Execute the SQL query using the database connection pool and handle the result
    const result = await db.query(query);
    console.log('Query result:', result);
    res.json(result); // Send the result as the response
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define /getAllRestaurants endpoint to return all restaurants
router.get('/getAllRestaurants', async (req, res) => {
  const query = "SELECT * FROM Restaurant"; // Create SQL query

  try {
    // Execute the SQL query using the database connection pool and handle the result
    const result = await db.query(query);
    res.json(result); // Send the result as the response
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;