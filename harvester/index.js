var env = process.env.NODE_ENV || '';
if (process.env.NODE_ENV && process.env.NODE_ENV !== ''){
	env = '.' + env;
}
var config = require('./appConfig'+ env).config;
console.log(process.env.NODE_ENV || 'Production');
module.exports = config;

var mongo = require('mongodb');
var twitter = require('ntwitter');
var config = require('./appConfig').config;
var sys = require('util');
var port = config.databasePort;

console.log('Harvesting started: ' + new Date().toString());

var USERNAME = config.twitterUsername;
var PASSWORD = config.twitterPassword;
var KEY = config.consumerKey;
var SECRET = config.consumerSecret;
var ACCESS_TOKEN_KEY = config.accessToken;
var ACCESS_TOKEN_SECRET = config.accessTokenSecret;
var host = config.databaseHost;
var trackArgument = config.trackArguments;
var trackTheseItems = config.trackItems;
var withPush = config.shouldPush;
var maxRetries = config.maxNumTwitterRetries || 3;
var numberOfRetries = 0;

console.log('Configuration:', config.databasePort);
var db = new mongo.Db(config.databaseName, new mongo.Server(host, port, { auto_reconnect: true }), {safe: false});
db.open(function(err, db) {
	if (err){
		console.log('error opening DB', err);
		shutdown();
	}
});
db.addListener('error', function(error){
   console.log('MongoDB error: ' + error.message);
});

function shutdown(){
	console.log('Shutting down...');
	db.close();	
	process.exit(0);
}


var twit = new twitter({
	consumer_key: KEY,
	consumer_secret: SECRET,
	access_token_key: ACCESS_TOKEN_KEY,
	access_token_secret: ACCESS_TOKEN_SECRET
});

function retryOnFailureFromStream(twit, statusCode){
	console.log('Retrying from failed stream');
	if (statusCode == '200'){
		if (numberOfRetries < maxRetries){
			doStream(trackTheseItems);
		}
	} else if (statusCode == '401'){
		console.log('Error authenticating to Twitter');
		shutdown();
	}		
	
}
process.on('SIGINT', function () {
   console.log('Got SIGINT. Stopping.');
   shutdown();
});
process.on('uncaughtException',function(error){
	console.log('uncaughtException:', error);
	retryOnFailureFromStream(twit);
});

function doStream(trackTheseItems){
	twit.stream('statuses/filter', {track: trackTheseItems}, function(stream) {
		console.log('Streaming...');

		stream.on('data', function (tweet) {
			var timestamp = new Date();
			db.collection('tweets', function(err, collection) {
		    	if (err == null && typeof(tweet) !== 'undefined') {
					// text string indicates a test post to see if the feed is up and running
					if (tweet.text.indexOf('awesome-test')!=-1){
						console.log(timestamp + ': Awesomeboard test post - ' + tweet.text);
					} else {
						console.log(timestamp + ': @' + tweet.user.screen_name + ': ' + tweet.text);
			        	collection.insert({
							'tweet':tweet.text,
					        'id':tweet.id,
							'id_str':tweet.id_str,
					        'timestamp':new Date().valueOf(), 
					        'nick':tweet.user.screen_name, 
							'source': tweet
						});
			  		}
				}
			});
		});
		stream.on('end', function(resp){
			console.log('End event recieved:' + resp.statusCode);
			retryOnFailureFromStream(twit, resp.statusCode);
		});
		stream.on('limit',function(limit){
			console.log('LIMIT: ' + sys.inspect(limit));
		});
		stream.on('destroy', function(error){
			console.log('on destroy:', error);		
			retryOnFailureFromStream(twit, '200');
		});
		stream.on('close', function(){
			stream.end();
			console.log('Subscriber CLOSE: ' + subscribers.length + ' total.\n');
		});
	});
}
doStream(trackTheseItems);
console.log('Listening for tweets with these words: ' + trackTheseItems);
