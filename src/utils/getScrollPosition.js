/**
 * Returns the current window's scroll position.
 * @function
 * @returns {Object} Scrollposition Object like {top: xxx, left: xxx}
 * @example var sp = onmjs.utils.getScrollPosition();
 * console.log('Scroll position is -> left: ' + sp.left + ' & top: ' +sp.top);
 */
onmjs.utils.getScrollPosition = function() {

	var scrOfX = 0;
	var scrOfY = 0;

	if ( typeof( window.pageYOffset ) == 'number' ) {

		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;

	} else if ( document.body &&
		( document.body.scrollLeft || document.body.scrollTop ) ) {

		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;

	} else if ( document.documentElement &&
		( document.documentElement.scrollLeft ||
		document.documentElement.scrollTop ) ) {

		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;

	}

	return {'top': scrOfY, 'left': scrOfX};

};