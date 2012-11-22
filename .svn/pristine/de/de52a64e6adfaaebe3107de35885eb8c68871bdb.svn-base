/**
 * Returns the user-viewport.
 * @function
 * @returns {Object} Returns width and height like {width: xxx, height: xxx}
 * @example var uvp = onmjs.utils.getViewportDimension();
 * console.log('viewport height is: ' + uvp.height + ' and width is: ' + uvp.width);
 */
onmjs.utils.getViewportDimension = function() {

	var e = window;
	var a = 'inner';

	if ( !( 'innerWidth' in window ) ) {
		a = 'client';
		e = document.documentElement || document.body;
	}

	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };

};