/**
 * Returns the translation string that is saved in a translation dataStore of onm.js.
 * @function
 * @param {String} [lang] [Language key. If set to null onmjs will determine the language based on the browsers language.]
 * @param {String} [key] [This key is used to get the right translation.]
 * @example
 *	var currentOfTotal = onmjs.getTranslation(null,'pictureClicker->currentOfTotal').replace('[current]',currentPageNumber).replace('[total]',ds.itemLength);
 */
onmjs.utils.getTranslation = function(lang, key){

	if (lang === null) {
		lang = onmjs.utils.getBrowserInfo.getLanguage();
	}

	var ds = onmjs.internals.l18n;
	if ( typeof ds[lang] == 'undefined') {
		ds['en'];
	} else {
		ds = ds[lang];
	}

	keys = key.split('->');

	var ref = ds;

	for (var i=0;i<keys.length;i++) {
		ref = ref[keys[i]];
	}

	return ref;
};