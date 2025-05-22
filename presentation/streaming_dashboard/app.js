const path = require('node:path');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((request, res, next) => {
	next(createError(404));
});

// Error handler
app.use((error, request, res, next) => {
	// Set locals, only providing error in development
	res.locals.message = error.message;
	res.locals.error = request.app.get('env') === 'development' ? error : {};

	// Render the error page
	res.status(error.status || 500);
	res.render('error');
});

module.exports = app;
