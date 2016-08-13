var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var Twitter = require('twitter');
   
  var client = new Twitter({
    consumer_key: "SfK5F3tXZOrkSay283ohtUyHg",
    consumer_secret: "60Ad8SaKVwSUtHJWRvVIZjvcuqIee2T6FC9lWwdvpZDBjRAzQE",
    access_token_key: "548836327-GuTO3cV32VrndSCKiQ1gcYhyfSME6jASzb1fMDMW",
    access_token_secret: "uHmDMosGx2kqUM5vwah80WHwVyemGTXmcr7ZDfmryZmca"
  });
  var params = {q: 'rio', lang: 'en', count: 5};
  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      //console.log(tweets);
      //console.log(response);
      var result =[];
      tweets["statuses"].forEach((tweet) => {
      	result.push(tweet.text);
      });
      res.render("users", {tweets:result});
      
    }
  });

    

});

module.exports = router;
