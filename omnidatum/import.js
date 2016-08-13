var Twitter = require('twitter');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/prod');
var db = mongoose.connection;
var tweetSchema = mongoose.Schema({
				index: Number,
				track: String,
				emo_class: Object,
				tweet: Object,
				text: String,
});
var Tweet = mongoose.model('Tweet', tweetSchema);

var table = require('./out2.json')
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	for(var k of table){
	var tw = new Tweet({index:k.index,track:k.track,emo_class:{k:1},tweet:k.tweet,text:k.text})
console.log(tw)
tw.save()
	}
});


 
