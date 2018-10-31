var express = require('express');
var router = express.Router();
// /* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Moodsetter' });
});


/*
* GET home page.
*/

exports.index = function (req, res) {
	var message = '';
	res.render('index', { message: message });

};


// nav bar
router.get('/presetcolor', function (req, res, next) {
	res.render('presetcolor', { page: 'PreSet Colors', menuId: 'presetcolor' });
});
router.get('/moodcolor', function (req, res, next) {
	res.render('moodcolor', { page: 'Mood Colors', menuId: 'moodcolor' });
});
router.get('/mycolors', function (req, res, next) {
	res.render('mycolors', { page: 'My Colors', menuId: 'mycolors' });
});
router.get('/faq', function (req, res, next) {
	res.render('faq', { page: 'FAQ', menuId: 'faq' });
});
router.get('/about', function (req, res, next) {
	res.render('about', { page: 'About Us', menuId: 'about' });
});
router.get('/contact', function (req, res, next) {
	res.render('contact', { page: 'Contact Us', menuId: 'contact' });
});

// footer
router.get('/faq', function (req, res, next) {
	res.render('faqFooter', { page: 'FAQ', menuId: 'faqFooter' });
});
router.get('/about', function (req, res, next) {
	res.render('aboutFooter', { page: 'About', menuId: 'aboutFooter' });
});
router.get('/contact', function (req, res, next) {
	res.render('contactFooter', { page: 'Contact', menuId: 'contactFooter' });
});

// module.exports = router;
