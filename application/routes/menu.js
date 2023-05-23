const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
  console.log('Connected to the database.');
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

router.post('/restaurantAccount', ensureRestaurantAuthenticated, (req, res) => {
  let restaurantID = req.session.restaurantID;
  
  console.log("Inside Post: RestaurantID =", restaurantID);
  console.log(req.body); // log the request body

  connection.query('SELECT * FROM Restaurant WHERE restaurantID = ?', [restaurantID], function (error, results, fields) {
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

    let restaurant_Name = req.body['restaurant_Name'] || currentDetails.restaurant_Name;
    let website = req.body['website'] || currentDetails.website;
    let address_ = req.body['address_'] || currentDetails.address_;
    let city = req.body['city'] || currentDetails.city;
    let state_ = req.body['state'] || currentDetails.state_;
    let zip_code = req.body['zip_code'] || currentDetails.zip_code;
    let country = req.body['country'] || currentDetails.country;
    let open_ = req.body['open_'] || currentDetails.open_;
    let closed = req.body['closed'] || currentDetails.closed;
    let cuisine_type = req.body['cuisine_type'] || currentDetails.cuisine_type;
    let image_url = req.body['image_url'] || currentDetails.image_url;
    let delivery_time = req.body['delivery_time'] || currentDetails.delivery_time;
    let price_range = parseInt(req.body['price_range']) || currentDetails.price_range;
    let restaurant_username = req.body['restaurant_username'] || currentDetails.restaurant_username;
    let email = req.body['email'] || currentDetails.email;
    let phone = req.body['phone'] || currentDetails.phone;
    let bio = req.body['bio'] || currentDetails.bio;

    console.log(city + address_ + state_);

    const sqlQuery = `UPDATE Restaurant SET restaurant_Name = ?, website = ?, address_ = ?, city = ?, state_ = ?, zip_code = ?, country = ?, open_ = ?, closed = ?, cuisine_type = ?, image_url = ?, delivery_time = ?, price_range = ?, restaurant_username = ?, email = ?, phone = ?, bio = ? WHERE restaurantID = ?`;

    console.log(sqlQuery); // log the SQL query

    connection.query(sqlQuery, 
      [restaurant_Name, website, address_, city, state_, zip_code, country, open_, closed, cuisine_type, image_url, delivery_time, price_range, restaurant_username, email, phone, bio, restaurantID], 
      (err, result) => {
        if (err) {
          console.log("Error updating details:", err);
          res.status(500).send("Error updating details");
        } else {
          console.log(result); // log the result of the SQL query
          res.redirect('/');
        }
      }
    );
  });
});



router.get('/restaurantAccount/:restaurantID', async (req, res) => {
  const restaurantID = req.params.restaurantID;
  console.log(restaurantID);
  if (!restaurantID) {
      return res.status(400).send('Missing restaurantID parameter');
  }
  
    
    let currentDetails;
//
    const query = 'SELECT * FROM Restaurant WHERE restaurantID = ?';

    try {
      const queryPromise = util.promisify(connection.query).bind(connection);
      
      currentDetails = (await queryPromise(query, [restaurantID]));
  
      // res.redirect('/restaurantAccount');
    } catch (err) {
      console.error('Error adding menu item:', err);
      res.status(500).send('Internal Server Error: ' + err.message);
    }

    // Render the Pug file with the current details
    res.render('restaurantAccount', { currentDetails });
});

module.exports = router;
