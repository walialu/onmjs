onmjs.internals.booleanChecker = function(value) {

	if (value === true ||
		value === false ||
		value === 1 ||
		value === 0 ||
		value === 'true' ||
		value === 'no') {

			return true;

		} else {

			return false;

		}

};