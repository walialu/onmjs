onmjs.utils.autoSuggest.keyNavigation = function(evt,textfield) {

	var keyCode = evt.keyCode;
	var keyMap = onmjs.internals.dataStores.keyEvents.keyMap;

	onmjs.utils.autoSuggest.setTimeout(textfield.id);

	// Escape key pressed - hide/destroy the suggest-box
	if (keyCode == keyMap['escape']) {

		onmjs.utils.autoSuggest.clear(textfield);

		return true;

	}

	// enter pressed
	if (keyCode == keyMap['return']) {

		var value = onmjs.utils.autoSuggest.getSelectedItemText(textfield);

		if (value) {

			textfield.value = value;

			onmjs.utils.autoSuggest.clear(textfield);

			clearTimeout(onmjs.utils.autoSuggest.timer);

			onmjs.utils.autoSuggest.timer=null;

			return true;

		// submit form
		} else {

			var pNode = textfield.parentNode;

			while (pNode.nodeName.toLowerCase() != 'form') {
				pNode = pNode.parentNode;
			}

			// we are submitting the form now
			pNode.submit();

		}

	}

	//up or down arrows used and list is visible
	if ((keyCode == keyMap['upArrow'] || keyCode == keyMap['downArrow']) && onmjs.utils.autoSuggest.listIsVisible(textfield)) {

		if (keyCode == keyMap['upArrow']) {

			onmjs.utils.autoSuggest.moveSelection('up', textfield);

		} else {

			onmjs.utils.autoSuggest.moveSelection('down', textfield);

		}

		return true;

	} else {

		return false;

	}

};