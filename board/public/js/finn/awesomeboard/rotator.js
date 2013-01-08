var FINN = FINN || {};
FINN.awesomeboard = FINN.awesomeboard || {};

FINN.awesomeboard.rotator = (function(eventHub){
	var twats = true;
	var SWAP_TIMEOUT = 20000;
	var swapInterval = SWAP_TIMEOUT;
	var timeoutId = null;

	function swapBoard(){
		eventHub.publish('rotate-board');
		clearTimeout(timeoutId);
		timeoutId = setTimeout(swapBoard, swapInterval);
	}
	function initialize(timeout){
		swapInterval = timeout;
		eventHub.subscribe('templates-ready', function(){
			eventHub.subscribe('rotate-board', function(){
				if (twats == true){
					$('.Twittolini').hide();
					$('.Feedbackolini').show();
				} else {
					$('.Twittolini').show();
					$('.Feedbackolini').hide();
				}
				twats = !twats;
				
			});
		});
		swapBoard();
	}
	return {
		initialize: initialize
	}
}(FINN.eventHub));