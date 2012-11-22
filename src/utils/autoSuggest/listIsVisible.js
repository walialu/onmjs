onmjs.utils.autoSuggest.listIsVisible = function(textfield) {

	if (document.getElementById('as_'+textfield.id)) {

		return true;

	} else {

		return false;

	}

};