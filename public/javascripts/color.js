var express = require("express");
var router = express.Router();

// /* GET customertable listing. */
// router.get('/', function (req, res, next) {
// 	res.send('respond with a resource');
// 	console.log("preset");
// });


const request = require('request');



module.exports = {
	sendColor: function () {
		request('http://192.168.1.207:5000/changeLedInRange?from=1&to=15&red=190&green=80&blue=90&brightness=50', { json: true }, (err, res, body) => {
			if (err) { return console.log(err); }
			console.log(body.url);
			console.log(body.explanation);

		});
	}
};


//app.listen(3000);

//new
// exports.presetcolor = function (req, res) {
// 	var message = '';
// 	var sess = req.session;

// 	var user = req.session.user,
// 		tableID = req.session.tableID;
// 	console.log('ddd2times=' + tableID);
// 	if (tableID == null) {
// 		res.redirect("/login");
// 		return;
// 	}

// 	if (req.method == "POST") {
// 		var post = req.body;
// 		var redPreset = post.redPreset;
// 		// var name = post.user_name;
// 		// var pass = post.password;

// 		console.log(redPreset);
// 		res.redirect('/presetcolor');

// 	}
// };