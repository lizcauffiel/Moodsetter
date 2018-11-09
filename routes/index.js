//if user enters the wrong credentials logging in it will show an error message
exports.index = function (req, res) {
	var message = '';
	res.render('index', { message: message });
};