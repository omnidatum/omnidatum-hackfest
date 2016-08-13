var NLP = require('stanford-corenlp');

var coreNLP = new NLP.StanfordNLP({

    "nlpPath":"./corenlp",
    "version":"3.6.0",
    //you can skip language if you want to use default english.
    "language":{
        "jar":"./corenlp/stanford-english-corenlp-2016-01-10-models.jar",
        "properties":"./nlp.prop"
    }

},function(err) {
  coreNLP.process('This is so good.', function(err, result) {
    console.log(err, JSON.stringify(result));
  });
});

