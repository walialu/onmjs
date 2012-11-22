/**
 * Returns the browsers 2-letter language code. For german this would be 'de'.
 * @function
 * @returns {String} 2-letter language code of the browser.
 * @example var bi = onmjs.utils.getBrowserInfo;
 * if (bi.getLanguage() === 'de') { alert('Hello german knackwurst'); }
 */
onmjs.utils.getBrowserInfo.getLanguage = function() {

	var navLang = navigator.language || navigator.browserLanguage;

	var str = navLang.slice(0,2);

	return str.toLowerCase();

};