const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');

// Create a MySQL connection
const dbConnection = mysql.createConnection({
  host: "34.94.177.91",
  user: "root",
  password: "Jaws0044!",
  database: "restaurantdb",
});

// Connect to the MySQL database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
});

// Define /addMenuItem endpoint to add a new menu item for a specific restaurant
router.post('/addMenuItem', async (req, res) => {
  const { itemName, itemPrice, itemDescription, itemCategory } = req.body;
  const restaurantID = req.session.restaurantID;

  if (!restaurantID) {
    res.status(400).json({ error: 'No restaurantID found in session.' });
    return;
  }

  const query = 'INSERT INTO Menu (restaurantID, item_name, item_price, item_description, item_category) VALUES (?,?,?,?,?)';

  try {
    // Promisify the MySQL query function
    const queryPromise = util.promisify(dbConnection.query).bind(dbConnection);
    // Execute the SQL query with the form data
    await queryPromise(query, [restaurantID, itemName, itemPrice, itemDescription, itemCategory]);

    console.log('Menu item added!');
    res.status(201).json({ message: 'Menu item added successfully.' });
  } catch (err) {
    // Handle errors during the addition process
    console.error('Error during menu item addition:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});







module.exports = router;
