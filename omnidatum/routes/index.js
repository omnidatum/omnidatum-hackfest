var express = require('express');
var router = express.Router();

// var creds = require('../creds.js');
// var Twitter = require('twitter');

var fs = require("fs");

// Synchronous read
var data = fs.readFileSync('tweets.txt');
var dump = data.toString().split(/\r?\n/);
var tweets = [];

for (var i = 0; i < dump.length; i++) {
  try {
    raw_tweet = JSON.parse(dump[i]);
    tweet = {
      id: raw_tweet.id,
      text: raw_tweet.text,
      coordinates: raw_tweet.coordinates.coordinates
    };
    tweets.push(tweet);
  } catch (e) {}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var search = req.query.search ? req.query.search : '';

  // var client = new Twitter(creds);
  // var params = {q: search, lang: 'en', count: 100, geocode: "-180,-90,180,90"};
  // client.get('search/tweets', params, function(error, tweets, response) {
  //   if (!error) {
  //     var data = [];
  //     for (var i = 0; i < tweets.statuses.length; i++) {
  //       data.push(JSON.stringify(tweets.statuses[i].text, true));
  //       console.log(tweets.statuses[i].coordinates);
  //     }
  //     console.log(data);
  //     res.render('index', { title: 'Tweets', tweets: data, query: search });
  //   }
  // });
  //
  // var lineReader = require('readline').createInterface({
  //   input: require('fs').createReadStream('tweets.txt')
  // });
  //
  // lineReader.on('line', function (line) {
  //   console.log('Line from file:', line);
  // });

  res.render('index', { title: 'Tweets', query: search, tweets: tweets });
});

module.exports = router;
