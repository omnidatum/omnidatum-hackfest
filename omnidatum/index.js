var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
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


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


app.get('/', function(req, res){
console.log(req.query.track)
	var stream = Tweet.find({track:req.query.track}, '', function(e, r){
res.send(r);
});
	var last_id = 0
/*
	stream.on('data', function (data) {

		doc = {
			emo_class:data.emo_class,
			text:data.tweet.text,
			author:data.tweet.author,
			retweets:data.tweet.retweets,
			stars:data.tweet.stars,
			coordinates:data.tweet.coordinates
		}
		last_id = data.index

		socket.emit('aline', doc);
	  // do something with the mongoose document
	}).on('error', function (err) {
	  // handle the error
	}).on('close', function () {
	});
*/

});

var fs = require('fs');

io.on('connection', function(socket){

	var stream = Tweet.find().stream();
	var last_id = 0

	stream.on('data', function (data) {

		doc = {
			emo_class:data.emo_class,
			text:data.tweet.text,
			author:data.tweet.author,
			retweets:data.tweet.retweets,
			stars:data.tweet.stars,
			coordinates:data.tweet.coordinates
		}
		last_id = data.index

		socket.emit('aline', doc);
	  // do something with the mongoose document
	}).on('error', function (err) {
	  // handle the error
	}).on('close', function () {

		/*var doc = Tweet.find().limit(1).sort({$natural:-1})
*/

		function check_new(){
		Tweet.findOne().sort('-created_at').exec(function(err, doc) {

				if(doc.index != last_id){
					socket.emit('aline',doc)
					last_id=doc.index
				}
				setTimeout(check_new,1500)
		});
		}
		check_new()

		// the stream is closed
	});

/*	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('tweets.txt')
	});

	lineReader.on('line', function (line) {
		//console.log('Line from file:', line);
		socket.emit('aline', { aline:true, buffer: line });
	});*/
});



/*
io.on('connection', function(socket){
  console.log('a user connected');
});
*/


http.listen(3000, function(){
  console.log('listening on *:3000');
});


