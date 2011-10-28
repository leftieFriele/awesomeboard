var http = require("http"),
	sys = require("sys");
	
exports.queryServer = function(host, port, url, method, data, callback){
	var cookie = "something=anything",
		client = http.createClient(port, host),
		boundary = Math.random(),
		postData = data.replace(/.*\?(.*)/, "$1"),
		headers = {
	    	"Host": host,
		    "Cookie": cookie,
			"__auth": "trust-me",
		    "Content-Type": "application/json",
	//		"Content-Length" : postData.length,
			"Accept": "application/json",
			"User-Agent": "Awesomeboard"
		};	

	if (method === "GET"){
		url += "?" + postData;
	}
	var request = client.request(method, url, headers);
	console.log("request", host, port, url, postData);
	request.on("response", function(response) {
		var data = "";
		response.on("data", function(chunk) {
			if (chunk != null){
				data += chunk;
			}
		});
		response.on("end", function() {
			console.log("Request ended");
			callback(data.toString());
		  });
	});
	request.write(postData);
	request.end();
	request = null;		
};