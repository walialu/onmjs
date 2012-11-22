onmjs.img.carousel.slideLeft.interval = function(id){

	var ds = onmjs.internals.dataStores.img.carousel[id];

	var d = onmjs.get('#'+id);

	if(ds.pixelSlided >= 186) {

		if(ds.firstItemLocked === true || ds.firstItemLocked === 1) {

			// TBD
			console.log('tbd: first item locked');

		// FIRST ITEM IS NOT LOCKED
		} else {

			// mark the actual item as not active
			ds.activeItem.className = 'REITER_SCROLLEN';

			// move the pointer to the now active item
			ds.activeItem = d.children[1].firstChild.children[1].firstChild.children[1];

			// mark the item in the stream as active (via css class)
			ds.className = 'REITER_PRAEGNANT';


			// copy over
			var originalItem = d.children[1].firstChild.children[1].firstChild.firstChild;

			var tempItem = originalItem.cloneNode(true);

			tempItem.onmouseover = originalItem.onmouseover;

			tempItem.onclick = originalItem.onclick;

			var holder = d.children[1].firstChild.children[1].firstChild;

			holder.removeChild(originalItem);

			holder.appendChild(tempItem);


			// load the new teaser image and it's texts'
			onmjs.img.carousel.setLarge({'item_id': ds.activeItem.id});

			ds.transitionLocked = false;
			ds.pixelSlided = 0;
			d.children[1].firstChild.children[1].scrollLeft = 0;

		}

	} else {

		var amount = 2;
		var sl1 = 0;

		if(onmjs.utils.getBrowserInfo.isIE()) {

			amount = 8;

		}

		if(ds.firstItemLocked === true || ds.firstItemLocked === 1) {

			sl1 = d.children[1].firstChild.children[2].scrollLeft+amount;

			d.children[1].firstChild.children[2].scrollLeft = sl1;

		} else { // default mode

			sl1 = d.children[1].firstChild.children[1].scrollLeft+amount;

			d.children[1].firstChild.children[1].scrollLeft = sl1;

		}

		ds.pixelSlided = ds.pixelSlided + amount;

		setTimeout("onmjs.img.carousel.slideLeft.interval('"+id+"')",1);

	}

};