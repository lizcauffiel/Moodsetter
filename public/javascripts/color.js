// This file relieves the form information of the colors RGB values and table number that was posted on the color pages
// Once the host is selected from the database a request "colorEndPoint" is sent to the Raspberry Pi. The request is 
//the url that says the host to contact and RGB values to change to, so the LED lights will change color.

//module dependencies 
var express = require("express");
var router = express.Router();
const request = require('request');
var session = require('express-session');
var app = express();
var ssn;
var user = require('../../routes/user');

//mexports form this file
module.exports = {
	//sendColor Function passing the host, which was pulled from the database. Red, Green and Blue
	//are the values the submitted variable from the color pages.
	// for the http url where the host is the value in the variable (ip address and port)
	sendColor: function (host, red, green, blue) {
		var colorEndPoint = "http://" + host + "/changeLedInRange?from=0&to=59&red=" + red + "&green=" + green + "&blue=" + blue + "&brightness=70"
		//testing
		console.log("contacting colorEndPoint", colorEndPoint);
		//send the request colorEndPoint, if it doesn't work send error
		request(colorEndPoint, { json: true }, (err, res, body) => {
			console.log("just sent request");
			if (err) { return console.log(err); }
		});
	}
};