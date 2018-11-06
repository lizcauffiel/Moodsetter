//THIS FILE IS NOT IN USE

//select from db where it equals
var mysql = require('mysql');

var con = mysql.createConnection({
	database: `moodsetter`,
	host: "localhost",
	user: "root",
	password: "Tinkwyatt811"
});

con.connect(function (err) {
	if (err) throw err;
	con.query("SELECT * FROM customertable WHERE tablePin = '12345'", function (err, result) {
		if (err) throw err;
		console.log("result first", result);
	});
});


//select from db all records
// var mysql = require('mysql');

// var con = mysql.createConnection({
// 	database: `moodsetteradmin`,
// 	host: "localhost",
// 	user: "root",
// 	password: "Tinkwyatt811"
// });

// con.connect(function (err) {
// 	if (err) throw err;
// 	con.query("SELECT * FROM user", function (err, result, fields) {
// 		if (err) throw err;
// 		console.log(result);
// 	});
// });


//connect to db
// var mysql = require('mysql');

// console.log('Get connection ...');

// var conn = mysql.createConnection({
// 	database: `moodsetteradmin`,
// 	host: "localhost",
// 	user: "root",
// 	password: "Tinkwyatt811"
// });

// conn.connect(function (err) {
// 	if (err) throw err;
// 	console.log("Connected!");
// });


//insert 1 record
// var mysql = require('mysql');

// var con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "Tinkwyatt811",
// 	database: "moodsetteradmin"
// });

// con.connect(function (err) {
// 	if (err) throw err;
// 	console.log("Connected!");
// 	var sql = "INSERT INTO user (username, email, password, allTablesControl) VALUES ('testAdmin', 'test123@email.com','password123', '12345');";
// 	con.query(sql, function (err, result) {
// 		if (err) throw err;
// 		console.log("1 record inserted");
// 	});
// });


//insert multiple records
// var mysql = require('mysql');

// var con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "Tinkwyatt811",
// 	database: "moodsetteradmin"
// });

// con.connect(function (err) {
// 	if (err) throw err;
// 	console.log("Connected!");
// 	var sql = "INSERT INTO user (username, email, password, allTablesControl) VALUES ?";
// 	var values = [
// 		['John', 'john@email.com', 'john123', '67891'],
// 		['Peter', 'peter@email.com', 'peter123', '12131'],
// 		['Amy', 'amy@email.com', 'amy123', '41516'],
// 		['Hannah', 'hannah@email.com', 'hannah123', '17181'],
// 		['Michael', 'michael@email.com', 'michael123', '92021']
// 	];
// 	con.query(sql, [values], function (err, result) {
// 		if (err) throw err;
// 		console.log("Number of records inserted: " + result.affectedRows);
// 	});
// });
