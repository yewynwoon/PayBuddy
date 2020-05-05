var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var dashboard = require('./routes/dashboard');
var depositFundsPost = require('./routes/depositFundsPost');
var payments = require('./routes/payments');
var user = require('./routes/user');
var addFriend = require('./routes/addfriend');
var transferFunds = require('./routes/transferFunds');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.enable('trust proxy');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dashboard', dashboard);
app.use('/depositFundsPost', depositFundsPost);
app.use('/payments', payments);
app.use('/user', user);
app.use('/addFriend', addFriend);
app.use('/transferFunds', transferFunds);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
