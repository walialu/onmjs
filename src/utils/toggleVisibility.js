/**
 * Toggles visibility of elements.
 * @function
 * @param {string|string[]} el   Can be a string (referring to an ID), a string of IDs seperated by commata (,) or an arrayset.
 * @param {string} [style="block"] Is the style.display value that should be attached to the element when becoming visible. It defaults to "block".
 * @example onmjs.utils.toggleVisibility('moo2');
 * onmjs.utils.toggleVisibility('moo3,moo4,moo5','table-cell');
 * onmjs.utils.toggleVisibility(onmjs.get('.moo1337'),'inline');
 */
onmjs.utils.toggleVisibility = function(el,style) {

	if (!style) {
		style = 'block';
	}

	if (typeof el == 'undefined') return;

	if (typeof el == 'string') {

		el = onmjs.get('#' + el);

	}

	if (el.style.display === '') {

		el.style.display = 'none';
		return;

	}

	if (el.style.display == style) {

		el.style.display = 'none';

	} else {

		el.style.display = style;

	}



};