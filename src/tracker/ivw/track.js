/**
 * Will append an IVW Counterpixel to document.body
 * If the param 'account' is not set,
 * the default 'medworld' will be used.
 *
 * The appended img will be removed from document.body as soon
 * as it has loaded.
 *
 * Caching is supressed by adding a timestamp to the image path.
 *
 * You need to supply a valid IVW-'tag'.
 *
 * Usage:
 *
 * onmjs.tracker.ivw.track({
 *	"account": "medworld",
 *	"tag": "gally-13370"
 * })
 *
 */
onmjs.tracker.ivw.track = function (cfgObject) {
	// this domains are excluded from tracking
	var excludedDomains = new Array('www.onmeda.es');

	if ( !cfgObject ) return;

	// check if current domain is excluded
	if ( location.href.indexOf(excludedDomains) != -1 ) return;

	if ( !cfgObject.tag ) return;

	var account = 'medworld';

	if (typeof cfgObject.account != 'undefined') {

		account = cfgObject.account;

	}

	var m = 'http://'+account+'.ivwbox.de/cgi-bin/ivw/CP/';

	var img = document.createElement('img');

	img.src = m + cfgObject.tag + ';?t='+ onmjs.utils.getUnixTimestamp()+ '&r=' + window.location.href;

	img.style.position = 'absolute';
	img.style.width = '1px';
	img.style.height = '1px';
	img.style.top = '-20px';
	img.style.left = '-20px';
	/** @ignore */
	img.onload = function() {

		document.body.removeChild(this);

	};

	document.body.appendChild(img);

	onmjs.ads.refreshIframes('17438');
};