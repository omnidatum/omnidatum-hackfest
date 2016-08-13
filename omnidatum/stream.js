var Twitter = require('twitter');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var tweetSchema = mongoose.Schema({
index: Number,
    track: String,
    tweet: Object
});
var Tweet = mongoose.model('Tweet', tweetSchema);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  // we're connected!
});



var client = new Twitter({
  consumer_key: 'SfK5F3tXZOrkSay283ohtUyHg',
  consumer_secret: '60Ad8SaKVwSUtHJWRvVIZjvcuqIee2T6FC9lWwdvpZDBjRAzQE',
  access_token_key: '548836327-GuTO3cV32VrndSCKiQ1gcYhyfSME6jASzb1fMDMW',
  access_token_secret: 'uHmDMosGx2kqUM5vwah80WHwVyemGTXmcr7ZDfmryZmca'
});



var the_track = 'rio,olympics';
var stream = client.stream('statuses/filter', {track: the_track});
stream.on('data', function(event) {
if(event.coordinates!=null){
  console.log(event && event.text);
console.log(event.coordinates);
var the_tweet = new Tweet({index:event.id, track:the_track, tweet:event});
the_tweet.save();
}
});
 
stream.on('error', function(error) {
  throw error;
});
 
/*// You can also get the stream in a callback if you prefer. 
client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});
*/
