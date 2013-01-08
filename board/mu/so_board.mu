<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
		<title>Awesomeboard Mark II</title>
		{{> mu_awesome_style_partial}}
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
		<script src="js/lib/mustache/mustache.js"></script>
		<script>
		var FINN = FINN || {};
		</script>
		<script src="js/finn/eventHub/eventHub.js"></script>
        <link rel="stylesheet" type="text/css" href="css/awesomeboard.css">
        <link rel="stylesheet" type="text/css" href="http://cache.finn.no/styles/so/core/core.css">
        <link rel="stylesheet" type="text/css" href="http://cache.finn.no/styles/so/components/components.css">
	    {{> mu_tracking_partial}}

</head>
<body>
    <div class="fillparent Feedbackolini hidden">    
		<div class="TWATSKALP"></div>
		
		<div class="awsomebar-wrapper">
			<div class="awsomebar">
				<div class="yeses"></div>
				<div class="noses"></div>
			</div>
			<div class="yes-face"></div>
			<div class="yes-count centerify strong">- -</span></div>
			<div class="no-count centerify strong">- -</div>
			<div class="no-face"></div>
		</div>
		<div class="feedbackwrapper ">
			{{>list_feedback_partial}}
			<a href="http://innsikt.finn.no/feedback/">Alle tilbakemeldinger</a>
        </div>
	</div>

	<div class="fillparent Twittolini">    
		<div class="twitterlogo"></div>
		<h1 class="supertitle" style="margin-left:148px;">Twitter</h1>
		<div data-tweet>
	        {{#latest}}
	            {{>mu_feedback_partial}}
	        {{/latest}} 
	    </div>
	    <!--a href="/list">Alle tweets</a-->
	</div>

<script type="text/html" id="FeedbackPartial"></script>
<script src="js/finn/awesomeboard/facade.js"></script>
<script src="js/finn/awesomeboard/rotator.js"></script>
<script src="js/finn/awesomeboard/boardmanager.js"></script>
<script src="js/finn/awesomeboard/updater.js"></script>
<script src="js/finn/awesomeboard/main.js"></script>
</body>
</html>
