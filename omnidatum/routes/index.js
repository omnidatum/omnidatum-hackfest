var express = require('express');
var GoogleMapsLoader = require('google-maps'); // only for common js environments
  GoogleMapsLoader.load(function(google) {
    new google.maps.Map(el, options);
});

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
