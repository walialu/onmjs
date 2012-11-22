/**
 * Check for Internet Explorer.
 * @function
 * @returns {Boolean} true if browser is some sort of Internet Explorer and false if it is not.
 * @example var bi = onmjs.utils.getBrowserInfo;
 * if (bi.isIE() { alert('Hello, you are using an outdated Browser, please upgrade!'); }
 */
onmjs.utils.getBrowserInfo.isIE = function() {

	if (navigator.appVersion.indexOf("MSIE") != -1) {

		return true;

	}

	return false;

};
