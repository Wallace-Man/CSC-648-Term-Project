const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler middleware
app.use(function(err, req, res, next) {
  if (err.status === 404) {
    // Handle 404 errors here
    res.status(404).send('Not Found');
  } else {
    // Pass other errors to the default error handler
    next(err);
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = parseInt(process.env.PORT) || 8080;

// if process is a test environment, don't have the app listen on the port
if (process.env.NODE_ENV !== 'test') {
  // otherwise listen on port
  app.listen(port, () => {
    console.log(`application: listening on port ${port}`);
  });
}


module.exports = app;
