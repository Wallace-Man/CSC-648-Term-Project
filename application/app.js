const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const restaurantRouter = require('./routes/restaurants');
//const usersRouter = require('./routes/users');
const { router: usersRouter, ensureAuthenticated } = require('./routes/users');
//const registerRouter = require('./routes/register');
const driverRouter = require('./routes/driver');
const menuRouter = require('./routes/menu');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Change to 'true' for HTTPS
}));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

// Middleware to make user data available to Pug templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  console.log('User data sent to Pug templates:', res.locals.user);
  next();
});
// Middleware to make Restaurant data available to Pug templates
app.use((req, res, next) => {
  res.locals.restaurantID = req.session.restaurantID || null;
  console.log('Restaurant data sent to Pug templates:', res.locals.restaurantID);
  next();
});
// Middleware to make Driver data available to Pug templates
app.use((req, res, next) => {
  res.locals.driverID = req.session.driverID || null;
  console.log('Driver data sent to Pug templates:', res.locals.driverID);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);
app.use('/restaurants', restaurantRouter);
app.use('/', usersRouter);
app.use('/', driverRouter);
app.use('/', menuRouter);


//app.use('/images', express.static('public/images'));

// app.use((req, res) => res.status(404).send('Not Found'));


const port = parseInt(process.env.PORT) || 8081;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`application: listening on port ${port}`);
  });
}

module.exports = app;
