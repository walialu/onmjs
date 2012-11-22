/**
 * Gets the position of any dom element.
 * @function
 * @param {Object} obj The DOM element to guess the position for.
 * @returns {Object} A object with the offsets like: {top: xxx, left: xxx}
 * @example var pos = onmjs.utils.getPosition(onmjs.get('#moo2'));
 * console.log('DIV with ID moo2 position info -> left: '
 * 	 + pos.left + ' top: ' + pos.top);
 */
onmjs.utils.getPosition = function(obj) {

	var o = null;

	if (typeof obj == 'string') {

		o = document.getElementById(obj);

	} else if (typeof obj == 'object') {

		o = obj;

	} else {

		return false;
	}


	var l = o.offsetLeft;

	var t = o.offsetTop;

	/*jsl:ignore*/
	while (o=o.offsetParent) {

		l += o.offsetLeft;

	}
	/*jsl:end*/
	if (typeof obj == 'string') {

		o = document.getElementById(obj);

	} else if (typeof obj == 'object') {

		o = obj;

	} else {

		return false;

	}

	/*jsl:ignore*/
	while (o=o.offsetParent) {

		t += o.offsetTop;

	}
	/*jsl:end*/

	return {'top': t, 'left': l};

};