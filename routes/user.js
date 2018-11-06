var express = require('express');
var router = express.Router();

// /* GET customizable listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

// module.exports = router;

//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function (req, res) {
	message = '';
	if (req.method == "POST") {
		var post = req.body;
		var tablePin = post.tablepin;
		// var name = post.user_name;
		// var pass = post.password;
		// var fname = post.first_name;
		// var lname = post.last_name;
		// var mob = post.mob_no;

		var sql = "SELECT tableID, host FROM `customertable` WHERE `tablePin`='" + tablePin + "'";

		var query = db.query(sql, function (err, result) {

			message = "Succesfully! Your account has been created.";
			res.render('signup.ejs', { message: message });
		});

	} else {
		res.render('signup');
	}
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
	var message = '';
	var sess = req.session;

	if (req.method == "POST") {
		var post = req.body;
		var tablePin = post.tablepin;
		// var name = post.user_name;
		// var pass = post.password;

		//	var sql = "SELECT tableID, host FROM `customertable` WHERE`tablePin` = '12345'";
		var sql = "SELECT tableID, host FROM `customertable` WHERE `tablePin`='" + tablePin + "'";
		db.query(sql, function (err, results) {
			if (results.length) {

				req.session.tableID = results[0].tableID;
				req.session.host = results[0].host;
				req.session.tablePin = tablePin

				var currentUserID = results[0].tableID;
				var currentUserHost = results[0].host;
				var currentUsertablePin = tablePin;

				console.log("results id", currentUserID);
				console.log('results host', currentUserHost);
				console.log('results tablePin', currentUsertablePin);

				res.redirect('/presetcolor');
			}
			else {
				message = 'Wrong Credentials.';
				res.render('index.ejs', { message: message });
				console.log('WRONG CREDENTIALS');
			}

		});
	} else {
		res.render('index.ejs', { message: message });
	}

};
//-----------------------------------------------dashboard page functionality----------------------------------------------
let q = 1;
exports.presetcolor = function (req, res, next) {

	var user = req.session.user,
		tableID = req.session.tableID;
	//console.log('ddd=' + tableID);
	if (tableID == null) {
		res.redirect("/login");
		return;
	}

	q++;
	console.log("q", q);
	var sql = "SELECT * FROM `customertable` WHERE `tableID`='" + tableID + "'";
	//works for console
	//console.log("sql", tableID);
	db.query(sql, function (err, results) {
		res.render('presetcolor.ejs', { user: user });
		console.log("dashboard")
	});
};
//------------------------------------logout functionality----------------------------------------------
exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		res.redirect("/login");
	})
};
//--------------------------------render user details after login--------------------------------
exports.profile = function (req, res) {

	var tableID = req.session.tableID;
	if (tableID == null) {
		res.redirect("/login");
		return;
	}

	var sql = "SELECT * FROM `customertable` WHERE `tableID`='" + tableID + "'";
	db.query(sql, function (err, result) {
		res.render('profile.ejs', { data: result });
	});
};
//---------------------------------edit customertable details after login----------------------------------
exports.editprofile = function (req, res) {
	var tableID = req.session.tableID;
	if (tableID == null) {
		res.redirect("/login");
		return;
	}

	var sql = "SELECT * FROM `customertable` WHERE `tableID`='" + tableID + "'";
	db.query(sql, function (err, results) {
		res.render('edit_profile.ejs', { data: results });
	});
};


