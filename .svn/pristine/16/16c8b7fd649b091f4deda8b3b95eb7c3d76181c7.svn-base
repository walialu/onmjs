onmjs.utils.autoSuggest.setTimeout = function(textboxId) {
	//check if timeout is user-defined

	var tms = onmjs.internals.dataStores.utils.autoSuggest[textboxId].timeoutInMilliseconds;

	if( !tms ) {

		tms = 2500;

	}


	// clear timeout
	clearTimeout(onmjs.internals.dataStores.utils.autoSuggest[textboxId].timeout);
	onmjs.internals.dataStores.utils.autoSuggest[textboxId].timeout = null;

	// set timeout
	onmjs.internals.dataStores.utils.autoSuggest[textboxId].timeout = setTimeout("onmjs.utils.autoSuggest.clear(onmjs.get('#"+textboxId+"'))", tms);
};