// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


/**
* Module dependencies.
*/
var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path');
//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var colorUtility = require('./public/javascripts/color');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Tinkwyatt811',
	database: 'moodsetter'
});

connection.connect();

global.db = connection;

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	//cookie expires after 2 min
	cookie: { maxAge: 120000 }
}))

// development only

app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/presetcolor', user.presetcolor);//call for dashboard page after login


app.post('/color', function (req, res) {
	//var redPreset = req.body.redPreset;
	//console.log(redPreset);
	colorUtility.sendColor();
	console.log(req.body);
	//res.send(200);

	return res.redirect('back');

});

//app.get('/presetcolor', color);  //call for dashboard page after login
//app.post('/presetcolor', color.presetcolor);//call for login post
// app.post('/color', function (req, res) {
// 	var redPreset = req.body.redPreset;
// 	console.log(redPreset);
// });

app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile', user.profile);//to render users profile

app.get('/loginhome', function (req, res) {
	res.render('loginhome', {
		title: 'loginhome'
	});
});
app.get('/homeLogin', function (req, res) {
	res.render('homeLogin', {
		title: 'homeLogin'
	});
});
app.get('/mycolors', function (req, res) {
	res.render('mycolors', {
		title: 'mycolors'
	});
});
app.get('/presetcolor', function (req, res) {
	res.render('presetcolor', {
		title: 'presetcolor'
	});
});
app.get('/moodcolor', function (req, res) {
	res.render('moodcolor', {
		title: 'moodcolor'
	});
});
app.get('/faq', function (req, res) {
	res.render('faq', {
		title: 'faq'
	});
});
app.get('/about', function (req, res) {
	res.render('about', {
		title: 'about'
	});
});
app.get('/contact', function (req, res) {
	res.render('contact', {
		title: 'contact'
	});
});
//Middleware

app.listen(8080)
module.exports = app;