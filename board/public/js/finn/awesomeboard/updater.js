var FINN = FINN || {};
FINN.awesomeboard = FINN.awesomeboard || {};

FINN.awesomeboard.updater = (function(facade, eventHub){
	var tweetCache = [],
		refreshRate = 20000;
	function pollForTweets(){
		eventHub.publish("retrieving-new-tweets", "");
		facade.retrieveTweets(function(tweets){
			if (tweets){
				if (tweetCache.length == 0 || tweetCache[0].id !== tweets[0].id){
					tweetCache = tweets;
					eventHub.publish("got-new-tweets", tweetCache);
				}
			}
		});
		setTimeout(pollForTweets, refreshRate);
	}
	function initiatePollSequence(){
		eventHub.subscribe("templates-ready", function(options){
			refreshRate = options.refreshRate;
			pollForTweets();
		});		
	}
	return {
		start: initiatePollSequence
	};
}(FINN.awesomeboard.facade, FINN.eventHub));