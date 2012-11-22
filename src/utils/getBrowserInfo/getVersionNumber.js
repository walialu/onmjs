/**
 * This is currently only working for IE browsers. But do not rely on only IE specific results, because this will change in upcoming releases.
 * @function
 * @return {Number} Version number of browser.
 * @example var bi = onmjs.utils.getBrowserInfo;
 * if(bi.isIE() && bi.getVersionNumber() <= 7) {
 * 	alert('Update your browser, dude!');
 * }
 */
onmjs.utils.getBrowserInfo.getVersionNumber = function() {
	var v = 0;
	if (this.utils.getBrowserInfo.sIE()) {
		v = parseFloat(navigator.appVersion.split("MSIE")[1]);
	}
	return v;
};