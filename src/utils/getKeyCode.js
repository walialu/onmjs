/**
 * Returns the current keyCode.
 * @function
 * @param {Object} evt KeyCode event.
 * @example
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
onmjs.utils.getKeyCode = function(evt) {

	evt =  evt || window.event;

	return evt.keyCode;

};