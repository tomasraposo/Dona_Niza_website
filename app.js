// require modules
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var jquery = require('jquery');
var jsdom = require('jsdom');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routes
var indexRouter = require('./routes/index');
var vinhosRouter = require('./routes/vinhos');
var vinhaRouter = require('./routes/vinha');
var contactoRouter = require('./routes/contacto');
var mobileMenuRouter = require('./routes/mobile-menu');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//enable jsdom
app.use('/jsdom', express.static(path.join(__dirname, 'node_modules/jsdom')));
//enable jquery
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));

// include static files - stylesheets, images, etc - e.g., index.css
app.use(express.static(path.join(__dirname, 'public')));

// use routes on specified URLs
app.use('/', indexRouter);
app.use('/vinhos', vinhosRouter);
app.use('/vinha', vinhaRouter);
app.use('/contacto', contactoRouter);
app.use('/menu', mobileMenuRouter);

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

// create express server on port 8000
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log("Server running on port 8000");
});

module.exports = app;

