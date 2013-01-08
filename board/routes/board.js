exports.board = function(req, res){
	retrieveTweets(function(tweets){
		renderTweets(req, res, tweets);
	});
}

