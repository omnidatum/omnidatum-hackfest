var express = require('express');
var router = express.Router();
var request = require('request');
// var creds = require('../creds.js');
// var Twitter = require('twitter');

// var fs = require("fs");
//
// // Synchronous read
// var data = fs.readFileSync('tweets.txt');
// var dump = data.toString().split(/\r?\n/);
// var tweets = [];
//
// for (var i = 0; i < dump.length; i++) {
//   try {
//     raw_tweet = JSON.parse(dump[i]);
//     tweet = {
//       id: raw_tweet.id,
//       text: raw_tweet.text,
//       coordinates: raw_tweet.coordinates.coordinates
//     };
//     tweets.push(tweet);
//   } catch (e) {}
// }

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

  var q = req.query.q;

  if (q) {
    request('http://150.242.42.16:3000/?track=' + q, function(error, response, body) {
      if(error) {
        console.log(error);
      } else {
        var tweets = [];
        var dump = JSON.parse(body);

        for (var i = 0; i < dump.length; i++) {
          try {
            object = dump[i];
            tweet = {
              id: object.tweet.id,
              text: object.tweet.text,
              coordinates: object.tweet.coordinates.coordinates,
              sentiment: object.emo_class.sentiment,
              name: object.tweet.user.screen_name
            };
            tweets.push(tweet);
          } catch (e) {}
        }
        res.render('index', { title: 'Tweets', query: q, tweets: tweets });
      }
    });
  } else {
    res.render('index', { title: 'Tweets', query: q, tweets: [] });
  }

});

module.exports = router;
