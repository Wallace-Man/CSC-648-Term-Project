const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ensureUserAuthenticated, ensureRestaurantAuthenticated } = require('./users');

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
  // console.log('Connected to the database.');
});

router.get('/menu', ensureRestaurantAuthenticated, async (req, res) => {
  const query = 'SELECT * FROM menu';
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

  const query = 'INSERT INTO menu (restaurantID, itemName, itemDescription, itemPrice) VALUES (?, ?, ?, ?)';

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
  const query = 'SELECT * FROM menu WHERE restaurantID = ?';

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
  const query = 'SELECT * FROM menu WHERE restaurantID = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const results = await queryPromise(query, [restaurantID]);

    res.json({ menuItems: results });  // Sending data as JSON
  } catch (err) {
    console.error('Error retrieving menu:', err);
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
});
// router.get('/restaurantAccount', ensureRestaurantAuthenticated, async (req, res) => {
//   const restaurantID = req.query.restaurantID; // We're using query parameter to get restaurantID
//   const query = 'SELECT * FROM Menu WHERE restaurantID = ?';

//   try {
//     const queryPromise = util.promisify(connection.query).bind(connection);
//     const results = await queryPromise(query, [restaurantID]);

//     res.render({ menuItems: results });  // Sending data as JSON
//   } catch (err) {
//     console.error('Error retrieving menu:', err);
//     res.status(500).json({ error: 'Internal Server Error: ' + err.message });
//   }
// });
router.post('/editRestaurantAccount', ensureRestaurantAuthenticated, (req, res) => {
  const restaurantID = req.session.restaurantID;

  console.log("Inside POST: RestaurantID =", restaurantID);
  console.log(req.body); // log the request body

  const {
    restaurant_Name,
    imageURL,
    address_,
    city,
    state_,
    zip_code,
    country,
    open_,
    closed,
    cuisine_type,
    website,
    delivery_time,
    price_range,
    restaurant_username,
    email,
    phone,
    bio
  } = req.body;

  connection.query('SELECT * FROM restaurant WHERE restaurantID = ?', [restaurantID], function (error, results, fields) {
    if (error) {
      console.log('Error retrieving restaurant details:', error);
      return res.status(500).send('Error retrieving restaurant details');
    }

    if (results.length === 0) {
      console.log('No restaurant found with this ID');
      return res.status(404).send('No restaurant found with this ID');
    }

    const currentDetails = results[0];
    console.log(currentDetails); // log the current details

    const updatedRestaurant = {
      restaurant_Name: restaurant_Name || currentDetails.restaurant_Name,
      website: website || currentDetails.website,
      address_: address_ || currentDetails.address_,
      city: city || currentDetails.city,
      state_: state_ || currentDetails.state_,
      zip_code: zip_code || currentDetails.zip_code,
      country: country || currentDetails.country,
      open_: open_ || currentDetails.open_,
      closed: closed || currentDetails.closed,
      cuisine_type: cuisine_type || currentDetails.cuisine_type,
      image_url: imageURL || currentDetails.image_url,
      delivery_time: delivery_time || currentDetails.delivery_time,
      price_range: price_range || currentDetails.price_range,
      restaurant_username: restaurant_username || currentDetails.restaurant_username,
      email: email || currentDetails.email,
      phone: phone || currentDetails.phone,
      bio: bio || currentDetails.bio
    };

    console.log(updatedRestaurant);

    const sqlQuery = `UPDATE restaurant SET ? WHERE restaurantID = ?`;

    console.log(sqlQuery); // log the SQL query

    connection.query(sqlQuery, [updatedRestaurant, restaurantID], (err, result) => {
      if (err) {
        console.log("Error updating details:", err);
        res.status(500).send("Error updating details");
      } else {
        console.log(result); // log the result of the SQL query
        res.redirect('/');
      }
    });
  });
});



router.get('/editRestaurantAccount/:restaurantID', async (req, res) => {
  const restaurantID = req.params.restaurantID;
  console.log(restaurantID);
  if (!restaurantID) {
      return res.status(400).send('Missing restaurantID parameter');
  }
  
    
    let currentDetails;
//
    const query = 'SELECT * FROM restaurant WHERE restaurantID = ?';

    try {
      const queryPromise = util.promisify(connection.query).bind(connection);
      
      currentDetails = (await queryPromise(query, [restaurantID]));
  
      // res.redirect('/restaurantAccount');
    } catch (err) {
      console.error('Error adding menu item:', err);
      res.status(500).send('Internal Server Error: ' + err.message);
    }

    // Render the Pug file with the current details
    res.render('editRestaurantAccount', { currentDetails });
});

module.exports = router;
