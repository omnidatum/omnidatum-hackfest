function searchTwitter(tweets){
	$.ajax({
		url: 'http://search.twitter.com/search.json?' + jQuery.param(query),
		dataType: 'jsonp',
		success: function(data){
			var tweets = $('#tweets');
			tweets.html('');
			for (res in data['results']){
				tweets.append('<div>' + data['results'][res]['from_user'] + ' wrote: <p>' + data['results'][res]['text'] + '</p></div><br />');
			}
		}
	});
}
