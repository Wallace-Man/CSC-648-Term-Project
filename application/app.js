const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const restaurantRouter = require('./routes/restaurants');
const { router: usersRouter, ensureAuthenticated } = require('./routes/users');
const registerRouter = require('./routes/register');
const driverRouter = require('./routes/driver');

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
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);
app.use('/restaurants', restaurantRouter);
app.use('/', usersRouter);
app.use('/', registerRouter);
app.use('/', driverRouter);

const port = parseInt(process.env.PORT) || 8081;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`application: listening on port ${port}`);
  });
}

module.exports = app;
