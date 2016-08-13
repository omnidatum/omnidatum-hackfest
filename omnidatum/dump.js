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
	var stream = Tweet.find().stream();

	stream.on('data', function (doc) {
		console.log(JSON.stringify(doc.tweet));
	  // do something with the mongoose document
	}).on('error', function (err) {
	  // handle the error
	}).on('close', function () {
	  // the stream is closed
require('process').exit()
	});

});



var client = new Twitter({
  consumer_key: 'SfK5F3tXZOrkSay283ohtUyHg',
  consumer_secret: '60Ad8SaKVwSUtHJWRvVIZjvcuqIee2T6FC9lWwdvpZDBjRAzQE',
  access_token_key: '548836327-GuTO3cV32VrndSCKiQ1gcYhyfSME6jASzb1fMDMW',
  access_token_secret: 'uHmDMosGx2kqUM5vwah80WHwVyemGTXmcr7ZDfmryZmca'
});



