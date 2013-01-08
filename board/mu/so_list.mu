<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
		<title>List view of tweets</title>
		{{> mu_awesome_style_partial}}
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
		<script src="/js/lib/mustache/mustache.js"></script>
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
	<div class="mod mlm mvm transparent">
		<div class="inner">
			<div class="bd">
				<form method="GET" action="/list">
			        <input type="text" name="q" id="q" value="{{query}}">
			        <input type="submit" value="Search">
			    </form>
		    </div>
	    </div>
    </div>
    <table class="outerborder zebra-striped mlm mrm">
    	<thead>
    		<tr>
    			<th>Bruker</th>
    			<th>Tweet</th>
    			<th>&nbsp;</th>
    			<th>&nbsp;</th>
    		</tr>
		</thead>
    	<tbody>
    	{{>mu_list_tweet_partial}}
    	</tbody>
    </table>
    <div class="fleft">
	    <ul class="pagination">
	    	<li>{{newerLink page query}}</li>
	    	<li>{{olderLink page query}}</li>
		</ul>
	</div>
</body>
</html>
