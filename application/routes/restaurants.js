// Import necessary libraries
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create a MySQL connection
const dbConnection = mysql.createConnection({
  host: "34.94.177.91",
  user: "root",
  password: "*4M3K0pOd(Y?dP?t",
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

// Define /getRestaurants endpoint to search for restaurants by name
router.get('/getRestaurants', (req, res) => {
  const searchTerm = req.query.searchTerm; // Get the search term from the query string
  const query = "SELECT * FROM Restaurant WHERE restaurant_Name LIKE '%" + searchTerm + "%'"; // Create SQL query
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
  const query = "SELECT restaurant_Name FROM Restaurant WHERE cuisine_type = '" + searchTerm + "'"; // Create SQL query
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
  const query = "SELECT * FROM Restaurant"; // Create SQL query

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

