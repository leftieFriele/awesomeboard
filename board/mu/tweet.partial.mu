{{#source}}{{#user}}
<div class="Twatter pvl awesomesize" 
	style="
	{{#profile_use_background_image}}background-image:url({{profile_background_image_url}});
	{{/profile_use_background_image}}
	color:{{profile_text_color}};
	border-color:{{profile_sidebar_border_color}};">
{{/user}}{{/source}}
	<div class="v_wrapper">
	    <div class="bd v_cell">
	        <blockquote class="mbn pam speech bg-lt-gray">
	        	{{tweet}}
	        	{{^tweet}}Jeg fant ingen tweets, beklager!{{/tweet}}
	        </blockquote>
	        <div class="speech-byline mal">
				<div class="media">
				{{#source}}{{#user}}
				<img class="img mvm" style="border:5px solid white;border-radius:5px;" alt="{{nick}}" src="{{profile_image_url_bigger}}">
				{{/user}}{{/source}}
				<div class="bd">
					<div class="mal">
					{{#source}}{{#user}}
						<span>{{name}}</span> <a href="http://twitter.com/{{screen_name}}">{{screen_name}}</a>
					{{/user}}{{/source}}
					<time datetime="{{date}}">{{formatedDate}}</time>
					</div>
				</div>
				</div>
	        </div>                                
	    </div>
	</div>
</div>