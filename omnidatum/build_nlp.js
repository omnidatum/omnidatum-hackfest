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
	Tweet.find({}, '', function(e, r){
		for(var i in r) {
		if(!r.hasOwnProperty(i)){continue}
//console.log(r[i])
if(r[i].tweet.lang=='en'){
ourq.push(r[i].tweet)}
		}
	})
  // we're connected!
});

const spawn = require('child_process').spawn;
const ls = spawn('./corenlp/corenlp.sh', ['-annotators', 'tokenize,ssplit,pos,lemma,parse,sentiment', '-outputFormat', 'json']);
var Promise = require('bluebird');

var datumf=function(e){};
ls.stdout.on('data', function(data){return datumf(data)});

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
console.log(ourq[0])
if(!ourq.length){
return Promise.delay(500)
}
if(typeof ourq[0] == 'undefined'){
return Promise.delay(300)
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

 
