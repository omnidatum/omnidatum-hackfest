var express = require('express');
var router = express.Router();
var creds = require('../creds.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var Twitter = require('twitter');
   
  var client = new Twitter(creds);
  var params = {q: 'rio', lang: 'en', count: 10, geocode:"0,0,1000mi"};
  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      //console.log(tweets);
      //console.log(response);
      var result =[];
      tweets["statuses"].forEach((tweet) => {
      	if (tweet.geo == null){
      		result.push("null geo!");
      	} else if(tweet.coordinates == null){
      		result.push("null coordinates");
      	} else {
      		result.push(tweet.text);
      	}
      	
      });

      //console.log(creds);

      res.render("users", {tweets:result});
      
    }
  });

    

});

module.exports = router;
