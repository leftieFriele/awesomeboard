FINN = FINN || {};
FINN.feedback = FINN.feedback || {};

FINN.feedback.temprature = (function(){
	function callback(counterMap) {
		if (counterMap){
			$(".awsomebar-wrapper").show();
			var ups = Object.keys(counterMap.upCounter).length;
			var dwns = Object.keys(counterMap.downCounter).length;
			var zeros = Object.keys(counterMap.zeroCounter).length;
			var totals = ups + dwns;

			var pNoCounts = Math.round((dwns/totals)*100);
			var pDwns = Math.round(((dwns/totals)*100)/2); 
			var pYesCounts = ( 100 - pNoCounts )
			var pUps = ( 50 - pDwns ) 
			$(".awsomebar-wrapper .no-count").html(pNoCounts);
			$(".awsomebar-wrapper .noses").css("height", pDwns + "%");
			//var pUps = Math.round((ups/totals)*100);
			$(".awsomebar-wrapper .yes-count").html(pYesCounts);
			$(".awsomebar-wrapper .yeses").css("height", pUps + "%");
		} else {
			$(".awsomebar-wrapper").hide();
		}
	}
	function render(){
		var feedUrl = "http://www.finn.no/finn/feedback/temp?days=1&jsonp=FINN.feedback.temprature.counterCallback";
		var styles = document.createElement("link");
		styles.href = "css/feedback_elements.css";
		styles.rel = "stylesheet";
		document.getElementsByTagName("HEAD")[0].appendChild(styles);
		var scriptTag = document.createElement("script");
		scriptTag.src = feedUrl;
		document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
		return this;
	}
	return {
		counterCallback: callback,
		render: render		
	}
})().render();