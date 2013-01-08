var FINN = FINN || {};
FINN.awesomeboard = FINN.awesomeboard || {};
FINN.awesomeboard.main = (function(eventHub){
	function initialize(){	
		var scriptTag = document.createElement("script");
		scriptTag.src = "js/finn/awesomeboard/temprature.js";
		document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);

		FINN.awesomeboard.boardmanager.initialize();
		FINN.awesomeboard.updater.start();
		retrieveRenderingTemplate();
		
		// injectSocketSupports();
	}
	function retrieveRenderingTemplate(){
		FINN.awesomeboard.facade.retrieveTemplates(function(template){
			document.getElementById("FeedbackPartial").innerHTML = template;
			eventHub.publish("templates-ready", {
				days: 10, 
				refreshRate: 7000, 
				boardTemplate: "FeedbackPartial"}
			);
		});
	}	
	function injectSocketSupports(){
		var socketHost = "http://localhost:9091";
		var socketIoScript = document.createElement("script");
		socketIoScript.src = socketHost + "/socket.io/socket.io.js";
		document.getElementsByTagName("HEAD")[0].appendChild(socketIoScript);
		
		setTimeout(function(){
			var socket = io.connect(socketHost);
			socket.on("new.tweet", function (data) {
				eventHub.publish("add-new-tweet", data);
	//		    socket.emit("my other event", {my: "data"});
			});
		}, 2000);
		
	}
	return {
		initialize: initialize,
		retrieveRenderingTemplate: retrieveRenderingTemplate
	}
}(FINN.eventHub));
$(document).ready(function(){
	FINN.awesomeboard.main.initialize();
});
