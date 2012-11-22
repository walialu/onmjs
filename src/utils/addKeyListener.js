/**
 * Adds a keylistener to an element.
 * @function
 * @param {Object} elem Object to add a keyevent listener to.
 * @param {String} modus keyup, keydown or keypress.
 * @param {Function} func Function to be called when event is triggered. Key-Event is passed to that function as first parameter.
 * @example 	// left and right arrows
 *	onmjs.utils.addKeyListener(document,'down', function(evt) {
 *		var keyCode = onmjs.utils.getKeyCode(evt);
 *		var keyMap = onmjs.internals.dataStores.keyEvents.keyMap;
 *		if (keyCode == keyMap.leftArrow) {
 *			div_button_previous.onclick();
 *		}
 *		if (keyCode == keyMap.rightArrow) {
 *			div_button_next.onclick();
 *		}
 *	});
 */

onmjs.utils.addKeyListener = function(elem, modus, func) {

	modus = 'onkey' + modus;

	var fnOld = elem[modus] || function(){};

	return (elem[modus] = function(evt) {

		var res = [ fnOld(evt),func(evt) ];

		return ( res[0]&&res[1] );

	});

};