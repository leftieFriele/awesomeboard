var FINN = FINN || {};
FINN.awesomeboard = FINN.awesomeboard || {};

FINN.awesomeboard.boardmanager = (function(eventHub, mu){
	var templateId = '';
	var tweets = [];
	var currentIndex = 0;
	var maxIndex = 0;
	var TWEET_WAIT_TIME = 1000;
	var addedTweetCounter = 0;
	
	function updateBoard() {
		if (maxIndex==currentIndex) currentIndex = 0;
		var tweetData = tweets[currentIndex];
		// update from normal to bigger
		var newProfileImage = tweetData.source.user.profile_image_url.replace('_normal', '_bigger');
		tweetData.source.user.profile_image_url_bigger = newProfileImage;
				
		var focusTweet = mu.to_html(document.getElementById(templateId).innerHTML, tweetData);
		$($('*[data-tweet]')[0]).html(focusTweet);
	}
	function appendTweet(tweet){
		tweets.pop(tweets.length -1);
		tweets.push(tweet);
	}
	function rotateTweets(){
		currentIndex = currentIndex + 1;
		updateBoard();
		setTimeout(rotateTweets, TWEET_WAIT_TIME);
	}
	function initialize(options){
		eventHub.subscribe('got-new-tweets', function(newTweets){
			tweets = newTweets;
			maxIndex = tweets.length;
			currentIndex = 0;
		});
		eventHub.subscribe('add-new-tweet', appendTweet);
		eventHub.subscribe('got-new-tweets', function(){
			setTimeout(rotateTweets, TWEET_WAIT_TIME);					
		});
		eventHub.subscribe('templates-ready', function(options){
			TWEET_WAIT_TIME = options.refreshRate;
			templateId = options.boardTemplate;
		});
		$(document).delegate('body', 'click', function(){
			currentIndex = currentIndex + 1;
			updateBoard();
		});
	}
	return {
		initialize: initialize,
		updateBoard: updateBoard
	}
}(FINN.eventHub, Mustache));


