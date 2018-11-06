var express = require("express");
var router = express.Router();
const request = require('request');
//new
var session = require('express-session');
var app = express();

var ssn;
// /* GET customizable listing. */
// router.get('/', function (req, res, next) {
// 	res.send('respond with a resource');
// 	console.log("preset");
// });
var user = require('../../routes/user');





module.exports = {
	sendColor: function (host, red, green, blue) {
		var colorEndPoint = "http://" + host + "/changeLedInRange?from=0&to=59&red=" + red + "&green=" + green + "&blue=" + blue + "&brightness=50"
		console.log("contacting colorEndPoint", colorEndPoint);

		request(colorEndPoint, { json: true }, (err, res, body) => {
			console.log("just sent request");
			if (err) { return console.log(err); }
			//	console.log(body.url);
			console.log("this is color js");
			//	console.log(body.explanation);

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