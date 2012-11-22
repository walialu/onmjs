/**
 * Check if jQuery is available and if not append the jQuery script to the head.
 * @function
 * @example onmjs.init.jquery();
 */
onmjs.init.jquery = function() {

	if (typeof jQuery == 'undefined') {

		var script = document.createElement('script');

		script.type = 'text/javascript';

		script.async = true;

		script.src = this.internals.jQuery.hostingUrl;

		document.getElementsByTagName('head')[0].appendChild(script);

		this.internals.jQuery.setLoaded(true);

	}

};