
var env = process.env.NODE_ENV || '';
if (process.env.NODE_ENV && process.env.NODE_ENV !== ''){
	env = '.' + env;
}
var config = require('./appConfig'+ env).config;
console.log('Environment:', process.env.NODE_ENV || 'Production');
module.exports = config;

var express = require('express'); 
var mongo = require('mongodb');
var hbs = require('hbs'); 
var fs = require('fs');
var http = require('http');	
var sys = require('util');

var db; 
var app;

var host = process.argv[2] || config.databaseHost;
var port = config.databasePort;
var dbName = config.databaseName;
var webappPort = config.webappPort;
var error = false;
	
var mainTemplate = 'so_board';
var listTemplate = 'so_list'

function startApp(){
	app = express();
	initializePartials();
	initializeExpressApplication(app);
	initializeDatabase(host, port);

	app.listen(webappPort);
	sys.log('Express app started on port :' + webappPort);	
}

function initializeDatabase(host, port){
	sys.log('Connecting to MongoDB ' + host + ':' + port);
	db = new mongo.Db(dbName, new mongo.Server(host, port, {auto_reconnect: true}), {safe: false});
	db.open(function(err, db) {
		if (err) throwIfError(err, 'opening connection');
	});
	db.addListener('error', function(error){
	   sys.puts('MongoDB error: ' + error);
	   die();
	});

}
function die(){
	sys.log('Error starting application, see log');
	db.close();
	error = true;
	process.exit(0);
}

function throwIfError(error, context){
	if (error){
		sys.log('Caught error:' + error + ', context:' + context);
		//throw error;
	}
}

var clientPartial = null;
/** 
 * Retrieves the partial files from the tempalte directory
 **/
function initializePartials() {
	fs.readFile(__dirname + '/mu/tweet.partial.mu', function(err, data) {
		throwIfError(err);
		clientPartial = ('' + data).replace(/\n+/g, '');
		hbs.registerPartial('mu_feedback_partial',('' + data).replace(/\n+/g, ''));
	});
	fs.readFile(__dirname + '/mu/awesome.style.partial.mu', function(err, data) {
		throwIfError(err);
		hbs.registerPartial('mu_awesome_style_partial',('' + data).replace(/\n+/g, ''));
	});
	fs.readFile(__dirname + '/mu/tracking.partial.mu', function(err, data) {
		throwIfError(err);
		hbs.registerPartial('mu_tracking_partial',('' + data).replace(/\n+/g, ''));
	});
	fs.readFile(__dirname + '/mu/list.tweet.partial.mu', function(err, data){
		throwIfError(err);
		hbs.registerPartial('mu_list_tweet_partial', ('' + data).replace(/\n+/g, ''));
	});
	fs.readFile(__dirname + '/mu/innsikt.partial.mu', function(err, data){
		throwIfError(err);
		hbs.registerPartial('innsikt_partial', ('' + data).replace(/\n+/g, ''));
	});
	fs.readFile(__dirname + '/mu/list.feedback.partial.mu', function(err, data){
		throwIfError(err);
		hbs.registerPartial('list_feedback_partial', ('' + data).replace(/\n+/g, ''));
	});
	
	
}

function initializeExpressApplication(app){
	var pub = __dirname + '/public';

	app.use(app.router);
	app.use(express.static(pub));
	app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
	app.use(express.bodyParser());
	app.set('view options', {layout: false});
	app.set('view engine', 'mu');
	app.engine('mu', hbs.__express);
	app.set('views', __dirname + '/mu');
	
	app.get('/list', function(req, res) {
	   db.collection('tweets', function(err, collection) {
		  if (err) throwIfError(err, 'list tweets');
          var hits = 20;
          if (req.query.hits) {
             hits =  req.query.hits;
          }
          var skip = 0;
          var page = 1;
          if (req.query.page) {
             page = parseInt(req.query.page);
             skip = hits * (page - 1);
          }
          var q = req.query.q;
          collection.find({ $or : [ {'nick' : q}, {'tweet' : new RegExp(q) }] }, {'limit':hits, 'skip':skip, 'sort':[['timestamp',-1]]}, function(err, cursor) {
            cursor.toArray(function(eRr, docs) {
                if (docs.length > 0) {
                	hbs.registerHelper('olderLink', function(page, query){
                		return new hbs.SafeString('<a href="/list?q=' + query + '&page=' + (Number(page) + 1 )+ '">Older &gt;&gt;</a>');
                	});
                	hbs.registerHelper('newerLink', function(page, query){
                		var nextPage = (Number(page) - 1);
                		if (nextPage > 0){
                			return new hbs.SafeString('<a href="/list?q=' + query + '&page=' + nextPage + '"> &lt;&lt; Newer</a>');
                		}
                	});
                	hbs.registerHelper('formatTimestamp', function(timestamp){
                		return new Date(parseInt(timestamp)) ;
                	})
                  res.render(listTemplate, {
                     items: docs,
                     link: function() { return '<a href=\'http://twitter.com/#!/' + this['nick'] + '/status/'  + this['source']['id_str'] + '\'>[link]</a>'; },
                     inreplyto : function() { 
                         if (this['source']['in_reply_to_status_id_str']) { 
                             return '<a href=\'http://twitter.com/#!/z/status/' + this['source']['in_reply_to_status_id_str'] + '\'>[reply to]</a>'; 
                         } else {
                             return '';
                         }
                     },
                     page: (page -0),
                     hits: hits,
                     /*prevpage: function() { return page - 1; },
                     nextpage: function () { return page + 1; },
                     hasMore: function() { return docs.length == hits; },
                     notFirstPage: function() { return page != 1; },*/
                     query: q || ''
                  });       
                } else {
                   res.send('Ingen flere treff');
                }
			 });
	      });
       });
	});
	app.get('/tweets', function(req,res){
		retrieveTweets(function(tweets){
			res.send(tweets);
		});
	});
	app.get('/renderingTemplates', function(req, res){
		res.send('' + clientPartial);
	})
	app.get('/ping', function(req, res){
		res.send('pong');
	});
	app.get('/', function(req, res){
		retrieveTweets(function(tweets){
				renderBoard(req, res, tweets, null);
		});
	});
}
function retrieveTweets(callback){
	db.collection('tweets', function(err, collection) {
	  throwIfError(err, 'retrieveTweets collection');	
      collection.find({}, {'limit':20, 'sort':[['timestamp',-1]]}, function(err, cursor) {
		throwIfError(err, 'retrieveTweets find');
		if (cursor){
	        cursor.toArray(function(err, docs) {
				throwIfError(err, 'cursor to array');
				var tweeeets = [];
				if (docs && docs.length > 0){
					tweeeets = docs;
				}
				callback(tweeeets);
	         });
		} else {
			console.log('No cursor');
		}
      });
   });	
}

function renderBoard(req, res, tweets, feedback){
	if (tweets && tweets.length > 0){
		for (var i=0; i<tweets.length; i++) {
			var itemDate = new Date(parseInt(tweets[i].timestamp));
			tweets[i].date = itemDate;
			tweets[i].formatedDate = itemDate.getHours() + ':' + itemDate.getMinutes() + ':' + itemDate.getSeconds() + ' ' + itemDate.getUTCDate() + '/' + (itemDate.getUTCMonth() +1) + '/' + itemDate.getUTCFullYear();
			var newProfileImage = tweets[i].source.user.profile_image_url.replace('_normal', '_bigger');
			tweets[i].source.user.profile_image_url_bigger = newProfileImage;
        }
		var focusTweet = tweets.shift();
        var now = new Date();
		var dato = new Date(Date.parse(now));
		var lastUpdated = dato.getHours() + ':' + dato.getMinutes() + ':' + dato.getSeconds() + ' ' + dato.getUTCDate() + '/' + (dato.getUTCMonth() +1)+ '/' + dato.getUTCFullYear();
		focusTweet.formatedDate = lastUpdated;
		var counter = 0;
		res.render(mainTemplate, {
			latest: focusTweet,
			feedback: feedback
		});
	} else {
		res.render(mainTemplate, {latest: {}, feedback: {}});
	}
}
startApp();
