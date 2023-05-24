const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');

// Create a MySQL connection
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
  // console.log('Connected to the database.');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Request body:', req.body);
  const query = 'SELECT * FROM user WHERE username = ?';
  console.log('Query:', query);

  try {
    // Promisify the connection.query function
    const queryPromise = util.promisify(connection.query).bind(connection);

    // Query the database for a user with the given username
    const results = await queryPromise(query, [username]);
    console.log('Query results:', results);

    if (results.length > 0) {
      const user = results[0];

      console.log('Entered password:', password);

      // Compare the hashed password in the database with the provided password
      const passwordMatches = await bcrypt.compare(password, user.password);

      console.log('Password matches:', passwordMatches);

      if (passwordMatches) {
        req.session.user = user;  // set session cookie
        // console.log(req.session);
        console.log('Redirecting to home page');
        res.redirect('/');        // redirect to home page
        return;
      } else {
        res.render('login', { error: 'Invalid username or password' });
      }
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
// Middleware to ensure the user is authenticated
function ensureDriverAuthenticated(req, res, next) {
  if (req.session.driverID) {
    // User is authenticated, proceed to the next middleware/route handler
    return next();
  }
  res.redirect('/driverLogin');
}

function ensureUserAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function ensureRestaurantAuthenticated(req, res, next) {
  if (req.session.restaurant) {
    return next();
  } else {
    res.redirect('/restaurantLogin');
  }
}

router.get('/favorites', ensureUserAuthenticated, async (req, res) => {
  const user_id = req.session.user.user_id;
  const querySelect = 'SELECT f.id, r.restaurantID, r.restaurant_Name, r.image_url, r.delivery_time FROM favorites AS f INNER JOIN Restaurant AS r ON f.restaurant_id = r.restaurantID WHERE f.user_id = ?';
  
  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const favorites = await queryPromise(querySelect, [user_id]);

    // log favorites data
    console.log('Favorites:', favorites);
    res.render('favorites', { favorites: favorites || [] });

  } catch (err) {
    console.error('Error getting favorites:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});






router.post('/favorites', ensureUserAuthenticated, async (req, res) => {
  const user_id = req.session.user.user_id;
  const { restaurant_id } = req.body;
  const querySelect = 'SELECT * FROM favorites WHERE user_id = ? AND restaurant_id = ?';
  const queryInsert = 'INSERT INTO favorites (user_id, restaurant_id) VALUES (?, ?)';
  const queryDelete = 'DELETE FROM favorites WHERE user_id = ? AND restaurant_id = ?';
  
  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const favorites = await queryPromise(querySelect, [user_id, restaurant_id]);

    if (favorites.length > 0) {
      // The restaurant is already in the user's favorites, so remove it
      await queryPromise(queryDelete, [user_id, restaurant_id]);
      res.json({ success: true, action: 'removed' });
    } else {
      // The restaurant is not in the user's favorites, so add it
      await queryPromise(queryInsert, [user_id, restaurant_id]);
      res.json({ success: true, action: 'added' });
    }

  } catch (err) {
    console.error('Error updating favorites:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

router.delete('/favorites/:id', ensureUserAuthenticated, async (req, res) => {
  const user_id = req.session.user.user_id;
  const favorite_id = req.params.id;
  const queryDelete = 'DELETE FROM favorites WHERE id = ? AND user_id = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    await queryPromise(queryDelete, [favorite_id, user_id]);
    res.json({ success: true, action: 'removed' });
  } catch (err) {
    console.error('Error removing favorite:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});
router.get('/restaurantMenuPage/:id', async (req, res) => {
  const restaurantId = req.params.id;
  const query = 'SELECT * FROM Menu WHERE restaurantId = ?';
  const queryPromise = util.promisify(connection.query).bind(connection);
  const menuItems = await queryPromise(query, [restaurantId]);
  res.render('restaurantMenuPage', { menuItems });
});

router.get('/restaurantMenuPage', (req, res) => {
  res.render('restaurantMenuPage');
});





module.exports = {
  router,
  ensureUserAuthenticated,
  ensureRestaurantAuthenticated,
  ensureDriverAuthenticated
};