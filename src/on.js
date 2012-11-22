/**
 * Wrapper for on+event. You can also use it as onDocumentReady in a cross-browser way.
 * This function does not override existing events. It'll append them.
 * @function
 * @param {string} m Event (e.g.: ready).
 * @param {function} callback Callback function when event fires.
 * @example onmjs.on('ready',function(){
 * 	alert('document ready');
 * });
 */
onmjs.on = function(m,callback) {

	if ( m == 'ready') {

		/* Chrome!!, Mozilla, Opera and all the other great browsers
		 * that (mostly) care about W3C specs
		 */
		if (document.addEventListener) {

			document.addEventListener('DOMContentLoaded', callback, false);

		}

		/* Safari, iCab, Konqueror */
		if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {

			var DOMLoadTimer = setInterval(function () {

				if (/loaded|complete/i.test(document.readyState)) {

					callback();

					clearInterval(DOMLoadTimer);

				}

			}, 10);

		}

		// Other web browsers
		var oldonload = window.onload;

		if (typeof window.onload != 'function') {

			window.onload = callback;

		} else {

			window.onload = function() {

				if (oldonload) {

					oldonload();

				}

				callback();

			};
		}

	}

};
