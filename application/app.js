const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const restaurantRouter = require('./routes/restaurants');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/restaurants', restaurantRouter);
app.use('/', usersRouter);


//app.use('/images', express.static('public/images'));

// app.use((req, res) => res.status(404).send('Not Found'));


const port = parseInt(process.env.PORT) || 8081;

// if process is a test environment, don't have the app listen on the port
if (process.env.NODE_ENV !== 'test') {
  // otherwise listen on port
  app.listen(port, () => {
    console.log(`application: listening on port ${port}`);
  });
}

module.exports = app;
