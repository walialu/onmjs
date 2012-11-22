/**
 * Copies a value from elem1 to elem2.
 * @function
 * @param {Object} [from] [Element from which the value should be copied.]
 * @param {Object} [to] [Element where the value should be copied to.]
 * @param {String} [keyName] [Name of the key that should be copied.]
 * @example
 * var anchor = onmjs.get('#anchor1'), anchor2 = onmjs.get('#anchor2');
 * // copy href key and value from anchor to anchor2
 * onmjs.utils.copyValue(anchor,anchor2,'href');
 */
onmjs.utils.copyValue = function(from, to, keyName) {

	if (from && to && from[keyName]) {

		if(typeof to.setAttribute == 'function') {

			to.setAttribute(keyName, from.getAttribute(keyName));

		} else {

			to[keyName] = from[keyName];

		}

	} else {

		return null;

	}

	return false;

};