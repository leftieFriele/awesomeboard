Harvest Tweets and display them with the Awesome Board
=============

Simple application we use to harvest tweets about our company real time and then have them displayed in an application.
The name Awesome Board is in fact somewhat of a joke and we don't actually think it is that awesome :)

The Harvester utilize the [Twitter Streaming API](https://dev.twitter.com/docs/streaming-api) and stores the data in MongoDB.
The Awesome Board is an [ExpressJS](http://expressjs.com/) web application which reads from the database and displays the data.

We use this at [FINN.no](http://finn.no) to display customer feedback on various screens in our office


Pre-requisites
------------

* Compatible with Node 0.6.x versions
* Sign up for a [Twitter account](http://twitter.com). You need this in order to authenticate with the Streaming API.

Installation
------------

We currently only support storing the tweets in MongoDB. Therefor you must install it in order to get started.

* Install [MongoDB](http://www.mongodb.org/) on your machine or on some server

First clone the application

		$ git clone https://github.com/finn-no/awesomeboard.git
		
and then go into the harvester and board directory and do an NPM install

		$ npm install
		
Now that you have everything installedm you need to configure the application in order to make the Harvester and Awesome Board work. This is done by editing the  [appConfig.js](https://github.com/finn-no/awesomeboard/blob/master/appConfig.js) file, below are a description of the settings.

* `databaseHost` - hostname running MongoDB
* `databaseName` - name of the MongoDB database
* `databasePort` - 27017
* `webappPort` - 29099
* `twitterUsername` - username
* `twitterPassword` - password
* `trackItems` - an array of strings to identify what tweets to trac
* `follow` - an array of Twitter IDs to follow 

Usage
------------

In order to have anything to display you need to harvest some tweets, here is how you start the harvester.

Start your MongoDB instance

		$ mongodb --dbpath <some location>

Starting the harvester or board application, just go into the directory and then run:

    $ node index.js
or
    $ npm start
	
The board applciation can be viewed at `http://localhost:29099/` or you can view the list mode on `http://localhost:29099/list`.
The harvester will output: Harvesting started 

FAQ
------------

**No Tweets displayed, but my harvester is running**

The Harvester uses the real time Streaming API, which means that someone needs to tweet right this moment in order for you to see anything. To test you can just pick a trending topic on Twitter and you will have tweets displayed in no time. The Harvester logs every time it harvests a tweet so you can just keep an eye on it and you will know when you actually have tweets available.

**Cross Domain XHR requests**

The Awesome Board ships with a simple module which enable making cross domain XHR requests from JavaScript code in the application. 
Below is a sample snippet which can be used for that purpose.

```
	app.get("/someReuqest", function(req,res){
		res.setHeader("Content-Type", "application/json");
		var requestParams = req.url.replace(/^\?(.*)/, "$1");
		httpPassThrough.queryServer("http://name.com/someURl", requestParams, function(result){
			res.write(result);
			res.end();
		});
	});
```


About the Awesome Board
------------

The board application uses [jQuery](http://jquery.com), [Handlebars for Node](https://github.com/wycats/handlebars.js/) and the [eventHub](https://github.com/leftieFriele/eventhub) JS libraries in order to make it's magic.
The list view is pretty crap, but we might get round to fixing it.

Contribute
------------

Feel free to fork this or send pull requests to help us improve this piece of software even more.

Any questions or to get notifications follow our [@FINN_tech](http://twitter.com/#!/FINN_tech) on Twitter.

Check out [the FINN.no developer blog](http://tech.finn.no) for more cool stuff and behind the scenes reports.

