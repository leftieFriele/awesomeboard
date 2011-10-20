var FINN = FINN || {};
FINN.awesomeboard = FINN.awesomeboard || {};

FINN.awesomeboard.boardmanager = (function(eventHub, mu){
	var templateId = "",
		tweets = [],
		currentIndex = 0,
		maxIndex = 0,
		TWEET_WAIT_TIME = 6000;
	function updateBoard() {
		if (maxIndex==currentIndex) currentIndex = 0;
		var focusTweet = mu.to_html(document.getElementById(templateId).innerHTML, tweets[currentIndex]);
		$(".awesomeboard:first").html(focusTweet);
	}
	function rotateTweets(){
		currentIndex = currentIndex + 1;
		updateBoard();
		setTimeout(rotateTweets, TWEET_WAIT_TIME);		
	}
	function initialize(options){
		eventHub.subscribe("got-new-tweets", function(newTweets){
			tweets = newTweets;
			maxIndex = tweets.length;
			currentIndex = 0;
		});
		eventHub.subscribe("got-new-tweets", function(){
			setTimeout(rotateTweets, TWEET_WAIT_TIME);					
		});
		eventHub.subscribe("templates-ready", function(template){
			templateId = template;
		});
		$(document).delegate("body", "click", function(){
			currentIndex = currentIndex + 1;
			updateBoard();
		})
	}
	return {
		initialize: initialize,
		updateBoard: updateBoard
	}
}(FINN.eventHub, Mustache));


