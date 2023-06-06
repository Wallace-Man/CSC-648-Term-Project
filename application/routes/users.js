const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');

// Create a MySQL connection
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
  const user_id = req.session.user.user_ID;
  console.log(`GET /favorites userId: ${user_id}`); // New log

  const querySelect = 'SELECT f.id, r.restaurantID, r.restaurant_Name, r.image_url, r.delivery_time FROM favorites AS f INNER JOIN restaurant AS r ON f.restaurant_id = r.restaurantID WHERE f.user_id = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const favorites = await queryPromise(querySelect, [user_id]);

    // log favorites data
    console.log(`GET Favorites Query Result: ${JSON.stringify(favorites)}`); // Modified log

    res.render('favorites', { favorites: favorites || [] });

  } catch (err) {
    console.error('Error getting favorites:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});





router.post('/favorites', ensureUserAuthenticated, async (req, res) => {
  const user_id = req.session.user.user_ID;
  const { restaurant_id } = req.body;
  const querySelect = 'SELECT * FROM favorites WHERE user_id = ? AND restaurant_id = ?';
  const queryInsert = 'INSERT INTO favorites (user_id, restaurant_id) VALUES (?, ?)';
  const queryDelete = 'DELETE FROM favorites WHERE user_id = ? AND restaurant_id = ?';

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const favorites = await queryPromise(querySelect, [user_id, restaurant_id]);

    console.log('Select Query Result:', favorites);

    if (favorites.length > 0) {
      // The restaurant is already in the user's favorites, so remove it
      const deleteResult = await queryPromise(queryDelete, [user_id, restaurant_id]);
      console.log('Delete Query Result:', deleteResult);
      res.json({ success: true, action: 'removed' });
    } else {
      // The restaurant is not in the user's favorites, so add it
      const insertResult = await queryPromise(queryInsert, [user_id, restaurant_id]);
      console.log('Insert Query Result:', insertResult);
      res.json({ success: true, action: 'added' });
    }

  } catch (err) {
    console.error('Error updating favorites:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});


router.delete('/favorites/:id', ensureUserAuthenticated, async (req, res) => {
  const user_id = req.session.user.user_ID;
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
  const query = 'SELECT * FROM menu WHERE restaurantId = ?';
  const queryPromise = util.promisify(connection.query).bind(connection);
  const menuItems = await queryPromise(query, [restaurantId]);
  res.render('restaurantMenuPage', { menuItems });
});

router.get('/restaurantMenuPage', (req, res) => {
  res.render('restaurantMenuPage');
});

router.post('/editUserAccount', ensureUserAuthenticated, async (req, res) => {
  const userId = req.session.user.user_ID;
  const { fullname, email, phone, password, confirmPassword, imageURL } = req.body;

  console.log("Inside POST: UserID =", userId);
  console.log(req.body);

  // Validate input data
  if (password !== confirmPassword) {
    res.render('editUserAccount', { user: { full_name: fullname, email, phone }, error: 'Passwords do not match' });
    return;
  }

  try {
    // Check if password is provided
    if (!password && !confirmPassword) {
      // Password fields are optional, so we only update the user information
      await util.promisify(connection.query).bind(connection)(
        'UPDATE user SET full_name = ?, email = ?, phone = ?, gator_id = ? WHERE user_id = ?',
        [fullname, email, phone, imageURL, userId]
      );
    } else {
      // Hash the password before updating the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user information in the database
      await util.promisify(connection.query).bind(connection)(
        'UPDATE user SET full_name = ?, email = ?, phone = ?, password = ?, gator_id = ? WHERE user_id = ?',
        [fullname, email, phone, hashedPassword, imageURL, userId]
      );
    }

    // Update the session data with the new user information
    req.session.user.full_name = fullname;
    req.session.user.email = email;
    req.session.user.phone = phone;
    req.session.user.imageURL = imageURL;

    // Fetch the updated user data
    const user = await util.promisify(connection.query).bind(connection)(
      'SELECT * FROM user WHERE user_id = ?',
      [userId]
    );

    // Render the edit user information page with the updated user data
    res.redirect('/userAccount');
  } catch (err) {
    console.error('Error updating user information:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});


router.get('/editUserAccount/:userId', ensureUserAuthenticated, async (req, res) => {
  const userId = req.params.user_ID;
  console.log(userId);

  if (!userId) {
    return res.status(400).send('Missing userId parameter');
  }

  try {
    const queryPromise = util.promisify(connection.query).bind(connection);
    const user = await queryPromise('SELECT * FROM user WHERE user_ID = ?', [userId]);

    // Render the edit user information page and pass the user data
    res.render('editUser', { user });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});



module.exports = {
  router,
  ensureUserAuthenticated,
  ensureRestaurantAuthenticated,
  ensureDriverAuthenticated
};