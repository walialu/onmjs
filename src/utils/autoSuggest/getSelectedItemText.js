onmjs.utils.autoSuggest.getSelectedItemText = function(textfield) {

	if (!onmjs.utils.autoSuggest.listIsVisible(textfield) || onmjs.utils.autoSuggest.activeItem === null) {

		return false;

	}

	return onmjs.utils.autoSuggest.activeItem['data-value'];

};