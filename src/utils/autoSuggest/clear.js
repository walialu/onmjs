onmjs.utils.autoSuggest.clear = function(obj) {
	if (onmjs.get('#as_'+obj.id)) {

		var acList = onmjs.get('#as_'+obj.id);

	} else {

		return;

	}

	if (acList &&
		acList.id == 'as_'+obj.id) {

	   acList.parentNode.removeChild(acList);

	}

	onmjs.utils.autoSuggest.activeItem = null;
};