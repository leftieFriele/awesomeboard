<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
		<title>Awesomeboard Mark II</title>
		{{>awesome_style_partial}}
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
		<script src="/js/lib/mustache/mustache.js"></script>
		<script>
		var FINN = FINN || {};
		</script>
		<script src="js/finn/eventHub/eventHub.js"></script>
        <link rel="stylesheet" type="text/css" href="http://cache.finn.no/styles/so/core/core.css">
		<!-- <link rel="stylesheet" type="text/css" href="css/awesomeboard.css"> -->
	    {{>tracking_partial}}
</head>
<body>
<header>
    <h1>innsikt.finn.no</h1>
</header>
<div class="TWATSKALP"></div>
<article class="feedbackTemprature">
    <section class="temp">
        <div class="yay"></div>
        <div class="tubeyay">
        	<div class="ant"></div>
            <div class="kormassebar"><div class="chart"></div></div>
        </div>
        <div class="tubenay">
            <div class="kormassebar"><div class="chart"></div></div>        
    	    <div class="ant"></div>
        </div>
        <div class="nay"></div>
    </section>
</article>
<article class="firstRow">
    <section class="kslogChart">
		<div class="marketicons">
        	<div class="marketicon"></div>
        	<div class="marketicon"></div>
        	<div class="marketicon"></div>
        	<div class="marketicon"></div>
        </div>
		<div class="markettotals">
			<div class="markettotal"></div>
			<div class="markettotal"></div>
			<div class="markettotal"></div>			
			<div class="markettotal"></div>			
		</div>
        <div class="marketbars">
        	<div class="marketbar">
            	<div class="chart"></div>
            </div>
            <div class="marketbar">
            	<div class="chart"></div>
            </div>
            <div class="marketbar">
            	<div class="chart"></div>        
            </div>
            <div class="marketbar">
            	<div class="chart"></div>        
            </div>
        </div>
    </section>
    <section class="awesomeboard">
	{{#latest}}			
		{{>feedback_partial}}
	{{/latest}}
    </section>
    <article class="kslogLeaderboard">
        <div class="winnerofshit first">
        	<div class="iconbar">
                <div class="number">1</div>
                <div class="marketicon"></div>
                <div class="percent"></div>
            </div>
            <div class="flametext"></div>	
        </div>

    	<div class="winnerofshit second">
        	<div class="iconbar">
                <div class="number">2</div>
                <div class="marketicon"></div>
                <div class="percent"></div>            
            </div>
            <div class="flametext"></div>
        </div>	
        <div class="winnerofshit third">
        	<div class="iconbar">
                <div class="number">3</div>
                <div class="marketicon"></div>
                <div class="percent"></div>

            </div>
            <div class="flametext"></div>	
        </div>  
    </article>
</article>    
<footer>
	<a href="/list">Se som liste</a>
</footer>

<script type="text/html" id="FeedbackPartial"></script>
<script src="js/finn/awesomeboard/facade.js"></script>
<script src="js/finn/awesomeboard/boardmanager.js"></script>
<script src="js/finn/awesomeboard/updater.js"></script>
<script src="js/finn/awesomeboard/main.js"></script>
</body>
</html>
