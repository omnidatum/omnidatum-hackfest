var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: creds["CONSUMER_KEY"],
  consumer_secret: creds["CONSUMER_SECRET"],
  access_token_key: creds["ACCESS_TOKEN"],
  access_token_secret: creds["ACCESS_TOKEN_SECRET"]
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});