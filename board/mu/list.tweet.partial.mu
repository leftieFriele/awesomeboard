{{#items}}<tr>
	<td>
	<div class="media">
	<img class="img" src="{{#source}}{{#user}}{{profile_image_url}}{{/user}}{{/source}}">
	<p class="bd pls">@{{nick}}</p>
	</div>
	</td>
	<td>{{tweet}}</td>
	<td>({{formatTimestamp timestamp}})</td>
	<td>{{{link}}} {{{inreplyto}}}</td>
</tr>{{/items}}