//This is place where we will be defining all our website routes.

//Module dependencies.
var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var colorUtility = require('./public/javascripts/color');

//connect to user sql (table) db
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Tinkwyatt811',
	database: 'moodsetter'
});

//create connection
connection.connect();

//global connection
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
	//cookie expires after 1 hour
	cookie: { expiry: 3600 }
}))

// development only
app.get('/', routes.index);//call for main index page
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post function in user.js
app.get('/presetcolor', user.presetcolor);//call for preset color selection page after login

//call for user.js to get the session variable tableID
app.get('/user', function (req, res) {
	//testing
	//console.log(req.query);
	ssn = req.session;
	ssn.tableID = req.query.tableID;
	//testing
	//console.log("req.query.tableID", req.query.tableID);
	//console.log(ssn.tableID);
	res.end('done');
});

//get the color the user picked from the pages
app.post('/color', function (req, res) {
	//testing
	//console.log("this is before sending the color");

	//assigning variables from the form
	var red = req.body.redInput;
	var green = req.body.greenInput;
	var blue = req.body.blueInput;
	var host = req.session.host;
	//testing
	//console.log("sending color");

	if (red == null || red == undefined) {
		red = 0;
	}
	if (green == null || green == undefined) {
		green = 0;
	}
	if (blue == null || blue == undefined) {
		blue = 0;
	}
	//calling colorUtility variable which is calling color.js file
	//to get the sendColor function and passing these parameters
	colorUtility.sendColor(host, red, green, blue);

	//testing-value from the color pages just submitted
	console.log(req.body);
	//console.log("sent color");

	//after the request is sent redirect the user back on the same page they were on
	return res.redirect('back');

});

//get the pages when the user clicks on their links and render them
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

//listening on port 8080
app.listen(8080)
//export app from this file
module.exports = app;