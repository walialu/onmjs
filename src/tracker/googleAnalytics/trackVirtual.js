/**
 * Will send a request to Google Analytics
 *
 * @example
 * onmjs.tracker.googleAnalytics.trackVirtual();
 */
onmjs.tracker.googleAnalytics.trackVirtual = function () {

	onmjs.tracker.googleAnalytics.track({
		gaCode: (""+document.location).replace(/^http:\/\/.*?\//gi,"/virtual/")
	});

};