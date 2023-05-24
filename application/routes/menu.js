const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const { ensureUserAuthenticated, ensureRestaurantAuthenticated } = require('./users');

const connection = mysql.createConnection({
  host: "34.102.56.1",
  user: "root",
  password: "Jaws0044!!!!",
  database: "restaurantdb",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  //console.log('Connected to the database.');
});

router.get('/menu', ensureRestaurantAuthenticated, async (req, res) => {
  const query = 'SELECT * FROM Menu';
  const restaurantID = req.session.restaurantID;

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const results = await queryPromise(query, [restaurantID]);

    res.render('restaurantInfo', { menu: results });
  } catch (err) {
    console.error('Error retrieving menu:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

router.get('/addMenuItem', ensureRestaurantAuthenticated, (req, res) => {
  res.render('addMenuItem');
});

router.post('/addMenuItem/:restaurantID', ensureRestaurantAuthenticated, async (req, res) => {
  const { itemName, itemDescription, itemPrice } = req.body;
  const { restaurantID } = req.params;

  console.log('Request body:', req.body); // Log the body to see if the data is received correctly
  console.log('Restaurant ID:', restaurantID); // Log the restaurantID to see if it is received correctly

  const query = 'INSERT INTO Menu (restaurantID, itemName, itemDescription, itemPrice) VALUES (?, ?, ?, ?)';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    await queryPromise(query, [restaurantID, itemName, itemDescription, itemPrice]);

    res.redirect('/restaurantInfo');
  } catch (err) {
    console.error('Error adding menu item:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});



router.get('/editMenuItem/:id', ensureRestaurantAuthenticated, async (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM menu WHERE id = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const results = await queryPromise(query, [id]);

    if (results.length > 0) {
      res.render('editMenuItem', { item: results[0] });
    } else {
      res.status(404).send('Menu item not found');
    }
  } catch (err) {
    console.error('Error retrieving menu item:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

router.post('/editMenuItem/:id', ensureRestaurantAuthenticated, async (req, res) => {
  const id = req.params.id;
  const { item_name, description, price, category } = req.body;

  const query = 'UPDATE menu SET item_name = ?, description = ?, price = ?, category = ? WHERE id = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    await queryPromise(query, [item_name, description, price, category, id]);

    res.redirect('/menu');
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

router.post('/deleteMenuItem/:id', ensureRestaurantAuthenticated, async (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM menu WHERE id = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    await queryPromise(query, [id]);

    res.redirect('/menu');
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

router.get('/restaurantInfo', ensureRestaurantAuthenticated, async (req, res) => {
  const restaurantID = req.session.restaurantID;
  const query = 'SELECT * FROM Menu WHERE restaurantID = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const results = await queryPromise(query, [restaurantID]);

    res.render('restaurantInfo', { restaurantID: restaurantID, menu: results });
  } catch (err) {
    console.error('Error retrieving restaurant menu:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});
router.get('/returnMenu', ensureRestaurantAuthenticated, async (req, res) => {
  const restaurantID = req.query.restaurantID; // We're using query parameter to get restaurantID
  const query = 'SELECT * FROM Menu WHERE restaurantID = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const results = await queryPromise(query, [restaurantID]);

    res.json({ menuItems: results });  // Sending data as JSON
  } catch (err) {
    console.error('Error retrieving menu:', err);
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
});


module.exports = router;
