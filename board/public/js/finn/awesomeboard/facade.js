(function(F){
    var callback;
    var baseURL = "/api/report";
    var localUrl = "/";

	if (console === "undefined") console = {log:function(){}};
    function leaderboard(mainCategory, numDays, limit, callback){
        var command = {
          "category": JSON.stringify(mainCategory),
          "days": JSON.stringify(numDays),
          "limit": limit
        };
        queryServer(baseURL + "/leaderboard", "GET", "category=" + mainCategory + "&" + "days=" + numDays + "&limit=" + limit, callback);
    }
    function handleServerError(xhr, status){
        console.log("Error:", xhr, status);
    }
	function retrieveTemplates(callback){
		queryServer(localUrl + "renderingTemplates", "GET", "", "html", callback)
	}
	function retrieveTweets(callback){
		queryServer(localUrl + "tweets", "GET", "", "json", callback);
	}
    function queryServer(url, method, command, dataType, queryCallback, errorCallback){
        var jsonCommand = JSON.stringify(command);
        $.ajax({
            type: method,
            url: url,
            data: command,
            processData: false,
            timeout: 10000,
            dataType: dataType,
            contentType: "application/json;charset=UTF-8",
            beforeSend: function(){
            },
            success: function (data, status, xhr) {
                if (queryCallback != null){
                    queryCallback.apply(null, [data]);
                }
            },
            complete: function(){
            },
            error: function(xhr, status){
                if (errorCallback != null){
                    errorCallback.apply(null [xhr, status]);
                } else {
                    handleServerError(xhr, status)
                }
            }
        });
    }
    var publicAPI = {
        retrieveTemplates: retrieveTemplates,
		retrieveTweets: retrieveTweets
    };
	F.awesomeboard = F.awesomeboard || {};
    F.awesomeboard.facade = publicAPI;
}(FINN || {}));