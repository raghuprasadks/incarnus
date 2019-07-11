var express = require('express');
var router = express.Router();

// use session auth to secure the angular app files
router.use('/', function (req, res, next) {
	console.log('token : ',req.session.token);
	console.log('path :',req.path);
    if (req.path !== '/login' && !req.session.token) {
        return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
    }

    next();
});

// make JWT token available to angular app
router.get('/token', function (req, res) {
	 console.log('jwt token : ',req.session.token);
    res.send(req.session.token);
});

// serve angular app files from the '/app' route
router.use('/', express.static('app'));

module.exports = router;