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


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const spawn = require('child_process').spawn;
const ls = spawn('./corenlp/corenlp.sh', ['-annotators', 'tokenize,ssplit,pos,lemma,parse,sentiment', '-outputFormat', 'json']);
var Promise = require('bluebird');

/*
ls.stdin.write("i love you\n");

ls.stdout.on('data', (data) => {

	data = data.toString('utf8');
	console.log(typeof data)

	if(typeof data != "string"){return}
	if(data.substr(0,1)!='{'){return}

	//console.log(`stdout: ${data}`);
	data = JSON.parse(data)
	var sentimentValue = data.sentences[0].sentimentValue;
	var sentiment = data.sentences[0].sentiment;

	console.log(`val ${sentimentValue} sen ${sentiment}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
*/
var datumf=function(e){};
ls.stdout.on('data', function(data){return datumf(data)});

var client = new Twitter({
  consumer_key: 'SfK5F3tXZOrkSay283ohtUyHg',
  consumer_secret: '60Ad8SaKVwSUtHJWRvVIZjvcuqIee2T6FC9lWwdvpZDBjRAzQE',
  access_token_key: '548836327-GuTO3cV32VrndSCKiQ1gcYhyfSME6jASzb1fMDMW',
  access_token_secret: 'uHmDMosGx2kqUM5vwah80WHwVyemGTXmcr7ZDfmryZmca'
});

function promiseGetEmo(text) {
    return new Promise(function (resolve, reject) {
var curstr=''
	datumf=function(data){

		data = data.toString('utf8');
		//console.log(typeof data)
		//console.log(data);

		if(typeof data != "string"){return}
		if(data.substr(0,4)=='java'){return}
		if(curstr==''&&data.trim().substr(0,2)!='{\n'){return}

		//console.log(`stdout: ${data}`);
		curstr+=data
		if(curstr.trim().substr(-2) != "\n}"){return}
		try{
var toparse='';
var pcurstr = curstr.trim().split("\n");
for(var i = 0; i < pcurstr.length; i ++){
toparse+=pcurstr[i]
if(pcurstr[i] == "}"){
break
}
}
			data = JSON.parse(toparse)
			if(typeof data !== 'undefined' && data.sentences && data.sentences.length){
				var sentimentValue = data.sentences[0].sentimentValue;
				var sentiment = data.sentences[0].sentiment;
				//console.log(`val ${sentimentValue} sen ${sentiment} t ${data}`);
			}
			curstr=''
			resolve({sentiment:sentiment,sentimentValue:sentimentValue})
}catch(e){
console.log(e,curstr)
}

 };

	ls.stdin.write(text+"\n")
	
    });
}
var ourq=[];
var promiseFor = Promise.method(function(condition, action, value) {
    if (!condition(value)) return value;
    return action(value).then(promiseFor.bind(null, condition, action));
});

promiseFor(function() {
    return true;
}, function(count) {
if(!ourq.length){
return Promise.delay(500)
}
    return promiseGetEmo(ourq[0].text.replace(/\./g, '')).timeout(2000)
             .then(function(res) { 
		console.log(JSON.stringify(res), ourq[0].id)
		Tweet.update({index:ourq[0].id}, { $set: { emo_class: res }},{ multi: true },function(e, n){ })
		ourq.shift()
                return ++count;
             })
		.catch(Promise.TimeoutError, function(e) {
		    console.log("could not read file within 100ms",ourq[0].text);

ourq.shift()
		});

}, 0).then(console.log.bind(console, 'all done'));


var the_track = process.argv[2];//'rio,olympics';
console.log(the_track)
var stream = client.stream('statuses/filter', {track: the_track});
stream.on('data', function(event) {

	if(event.lang=="en"){
	if(event.coordinates!=null){
		console.log(event && event.text);
		//console.log(event.coordinates);
		//ourq.push(event)
		var the_tweet = new Tweet({index:event.id, track:the_track, tweet:event, emo_class:{"k":1}});
		the_tweet.save();
	}
	}
});
 
stream.on('error', function(error) {
  throw error;
});
 
