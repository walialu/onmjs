onmjs.img.carousel.slideRight.go = function(id) {

	if ( window.blurred ) { return; }

	var ds = onmjs.internals.dataStores.img.carousel[id];

	if(ds.pixelSlided >= 186) {

		console.log('Next slide');

	} else {

		// remove any timeout
		clearTimeout(ds.sliderTimeout);

		var d = onmjs.get('#'+ds.id);

		ds.transitionLocked = true;

		/* remove the last item and insert it before
		 * the first item of the stream
		 */
		var originalItem = d.children[1].firstChild.children[1].firstChild.lastChild;

		var tempItem = originalItem.cloneNode(true);

		tempItem.onmouseover = originalItem.onmouseover;

		tempItem.onclick = originalItem.onclick;

		var holder = d.children[1].firstChild.children[1].firstChild;

		holder.removeChild(originalItem);

		holder.insertBefore(tempItem, d.children[1].firstChild.children[1].firstChild.firstChild);

		/* modify the viewport of the stream
		 * so the new inserted item is not viewable
		 */
		d.children[1].firstChild.children[1].scrollLeft = 186;

		// start the sliding animation
		onmjs.img.carousel.slideRight.interval(ds.id);
	}
};