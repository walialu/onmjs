onmjs.img.carousel.slideLeft.go = function(id,redo){

	if ( window.blurred ) { return; }

	var ds = onmjs.internals.dataStores.img.carousel[id];

	var d = onmjs.get('#'+id);

	if (ds.firstItemLocked === true ||
		ds.firstItemLocked === 1) {

		var item_id = d.children[1].firstChild.children[2].firstChild.children[1].id;

		var prev_item_id = d.children[1].firstChild.children[2].firstChild.id;

		if (ds.firstItemLocked !== true && ds.firstItemLocked !== 1) {

			onmjs.get('#'+prev_item_id).className = 'REITER_SCROLLEN';

			onmjs.get('#'+item_id).className = 'REITER_PRAEGNANT';

			onmjs.img.carousel.setLarge({'item_id': item_id});

		}

		clearTimeout(ds.sliderTimeout);

		ds.sliderTimeout = setTimeout("onmjs.img.carousel.slideLeft.go('"+ds.id+"',"+redo+")",ds.items[item_id].secondsUntilNextSlide*1000);

		ds.pixelSlided = 0;

		var originalItem = d.children[1].firstChild.children[2].firstChild.firstChild;

		var tempItem = originalItem.cloneNode(true);

		tempItem.onmouseover = originalItem.onmouseover;

		tempItem.onclick = originalItem.onclick;

		var holder = d.children[1].firstChild.children[2].firstChild;

		holder.removeChild(d.children[1].firstChild.children[2].firstChild.firstChild);

		holder.appendChild(tempItem);

		d.children[1].firstChild.children[2].scrollLeft = 0;

	} else {

		clearTimeout(ds.sliderTimeout);

		if (redo) {

			ds.sliderTimeout = setTimeout("onmjs.img.carousel.slideLeft.go('"+ds.id+"',1)",ds.items[ds.activeItem.id].secondsUntilNextSlide*1000);

		}

	}

	onmjs.img.carousel.slideLeft.interval(id);
};