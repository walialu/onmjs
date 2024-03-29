/**
 * Renders the likebox of facebook.
 * @function
 * @param {Object} opts Configuration object.
 * @param {String} opts.renderTo The id of a dom element. The Like-box will appear in this element.
 * @param {Number} [opts.appId=209818542451223] The Application ID of your Facebook app used to create this facebook likebox.
 * @param {String} [opts.url=location.href] The url to like.
 * @example
 * onmjs.social.widgets.facebook.like({
 * 	renderTo: 'FACEBOOK_EMPFEHLEN', 
 * 	url: 'http%3A%2F%2Fwww.onmeda.de%2Fratgeber%2Fkinderwunsch%2Fungewollt_kinderlos%2Feisprung.html'
 * });
 */
onmjs.social.widgets.facebook.like = function(opts) {
	var cfgObject = opts,
		fblike = document.createElement('div'),
		likeurl = location.href,
		appId = 209818542451223;


	if (typeof cfgObject.appId != 'undefined' &&
		typeof cfgObject.appId == 'string' &&
		cfgObject.appId !== '') {

		appId = cfgObject.appId;

	}

	if (typeof cfgObject.url != 'undefined' &&
		cfgObject.url !== '') {

		likeurl = cfgObject.url;

	}

	likeurl = escape(likeurl);

	var iframe = '<iframe src="//www.facebook.com/plugins/like.php?href=' + likeurl + '&amp;send=false&amp;layout=button_count&amp;width=120&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=' + appId + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe>';

	onmjs.get('#'+cfgObject.renderTo).innerHTML = iframe;

};