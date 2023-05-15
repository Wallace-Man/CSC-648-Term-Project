const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');

// Create a MySQL connection
const dbConnection = mysql.createConnection({
  host: "34.102.56.1",
  user: "root",
  password: "Jaws0044!!!!",
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
  const { itemName, itemDescription, itemPrice} = req.body;
  const restaurantID = req.session.restaurantID;

  if (!restaurantID) {
    res.status(400).json({ error: 'No restaurantID found in session.' });
    return;
  }

  const query = 'INSERT INTO Menu (restaurantID, itemName, itemDescription, itemPrice) VALUES (?,?,?,?)';

  try {
    // Promisify the MySQL query function
    const queryPromise = util.promisify(dbConnection.query).bind(dbConnection);
    // Execute the SQL query with the form data
    await queryPromise(query, [restaurantID, itemName, itemDescription, itemPrice]);

    console.log('Menu item added!');
    res.status(201).json({ message: 'Menu item added successfully.' });
  } catch (err) {
    // Handle errors during the addition process
    console.error('Error during menu item addition:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});


// Define /menu endpoint to get all menu items for a specific restaurant
router.get('/returnMenu', async (req, res) => {
  const restaurantID = req.query.restaurantID;
  console.log('restaurantID:', restaurantID);
  const query = 'SELECT * from Menu WHERE restaurantID = ?';

  try {
    // Promisify the MySQL query function
    const queryPromise = util.promisify(dbConnection.query).bind(dbConnection);
    // Execute the SQL query with the form data
    const menuItems = await queryPromise(query, [restaurantID]);

    console.log('Menu items retrieved:', menuItems);
    res.status(200).json({ menuItems });
  }
  catch (err) {
    // Handle errors during the addition process
    console.error('Error during menu item retrieval:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

//define /deleteMenuItem endpoint to delete a menu item for a specific restaurant
router.post('/deleteMenuItem', async (req, res) => {
  const { itemID } = req.body;

  const restaurantID = req.session.restaurantID;
  if (!restaurantID) {
    res.status(400).json({ error: 'No restaurantID found in session.' });
    return;
  }
  const query = 'DELETE FROM Menu WHERE itemID = ? AND restaurantID = ?';

  try {
    // Promisify the MySQL query function
    const queryPromise = util.promisify(dbConnection.query).bind(dbConnection);
    // Execute the SQL query with the form data
    await queryPromise(query, [itemID, restaurantID]);

    console.log('Menu item deleted!');
    res.status(201).json({ message: 'Menu item deleted successfully.' });
  } catch (err) {
    // Handle errors during the addition process
    console.error('Error during menu item deletion:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});


// Define /updateMenuItem endpoint to update a menu item for a specific restaurant
router.post('/updateMenuItem', async (req, res) => { 
  const { itemID, itemName, itemPrice, itemDescription } = req.body;
  const restaurantID = req.session.restaurantID;

  if (!restaurantID) {
    res.status(400).json({ error: 'No restaurantID found in session.' });
    return;
  }

  const query = 'UPDATE Menu SET itemName = ?, itemPrice = ?, itemDescription = ? WHERE itemID = ? AND restaurantID = ?';

  try {
    // Promisify the MySQL query function
    const queryPromise = util.promisify(dbConnection.query).bind(dbConnection);
    // Execute the SQL query with the form data
    await queryPromise(query, [itemName, itemPrice, itemDescription, itemID, restaurantID]);

    console.log('Menu item updated!');
    res.status(201).json({ message: 'Menu item updated successfully.' });
  } catch (err) {
    // Handle errors during the addition process
    console.error('Error during menu item update:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});


module.exports = router;

