//module dependencies
var express = require('express');
var router = express.Router();

// /* GET customizable listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});


//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
	//setting variables
	var message = '';
	//session variable
	var sess = req.session;

	//if the request method is post
	if (req.method == "POST") {
		//variable equals what was posted in the body
		var post = req.body;
		//variable equals the tablepin the user enter on the login page
		var tablePin = post.tablepin;

		//variable equals a sql select statement saying
		//select the tableID, host from the customertable table in the database where the tablePin equals 
		//what the user typed in
		var sql = "SELECT tableID, host FROM `customertable` WHERE `tablePin`=?";
		//calling the database and passing parameters
		db.query(sql, [tablePin], function (err, results) {
			//if the results are not null or undefined (there is something in the database that meet the credentials the user put in)
			if (results.length) {
				//set the session variable equal to the tableID found
				req.session.tableID = results[0].tableID;
				//set the session variable equal to the host found
				req.session.host = results[0].host;
				//set the session variable equal to the TablePin typed in 
				req.session.tablePin = tablePin

				//setting variables
				var currentUserID = results[0].tableID;
				var currentUserHost = results[0].host;
				var currentUsertablePin = tablePin;

				//testing
				// console.log("results id", currentUserID);
				// console.log('results host', currentUserHost);
				// console.log('results tablePin', currentUsertablePin);

				//redirect the user to the preset color section page
				res.redirect('/presetcolor');
			}
			//if the credentials are wrong give the user an error message saying "Wrong Credentials." and direct them back to the index
			//page (login page)
			else {
				message = 'Wrong Credentials.';
				res.render('index.ejs', { message: message });
				console.log('WRONG CREDENTIALS');
			}

		});
	}
	//if the credentials are wrong give the user an error message saying "Wrong Credentials." and direct them back to the index
	//page (login page)
	else {
		res.render('index.ejs', { message: message });
	}

};
//-----------------------------------------------dashboard page functionality----------------------------------------------
//this is the page the user is directed to after logging in, if they were successful
exports.presetcolor = function (req, res, next) {
	//setting session variables to the user and tableID
	var user = req.session.user,
		tableID = req.session.tableID;

	//testing
	//console.log('ddd=' + tableID);

	//if the userID is empty (not properly logged in) send the user to the homepage (login page)
	if (tableID == null) {
		res.redirect("/login");
		return;
	}

	//variable equal sql statement saying select all the variable in the database from the customertable table 
	//where the id equals the founded tableID from logging in 
	var sql = "SELECT * FROM `customertable` WHERE `tableID`='" + tableID + "'";

	//calling database and passing parameters, if successful render the preset color selection page
	db.query(sql, function (err, results) {
		res.render('presetcolor.ejs', { user: user });
		console.log("dashboard")
	});
};