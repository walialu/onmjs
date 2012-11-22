onmjs.img.pictureClicker.setLarge = function(configObject) {

	var obj = onmjs.get('#'+configObject.item_id).parentNode.parentNode.parentNode.parentNode.parentNode.firstChild;

	var ds = onmjs.internals.dataStores.img.carousel[obj.parentNode.id];

	var data = ds.items[configObject.item_id];


	if (typeof data != 'undefined') {

		if (obj.src != data.picture) {
			/** @ignore */
			obj.onclick = function() {

				location.href = data.clickurl;

			};

			obj.firstChild.src = data.picture;

			obj.children[1].innerHTML = '<h1>' + data.title + '</h1><h2>' + data.sub_title + '</h2><p>' + data.description + '</p>';

			// if ctaButtonText is defined add it to the
			// innerHTML
			if (data.ctaButtonText) {

				obj.children[1].innerHTML += '<span class="ACTION_BUTTON"><a href="#">'+ data.ctaButtonText+ '</a></span>';

			}

			var item_id = null;

			if (ds.firstItemLocked === true ||
				ds.firstItemLocked === 1) {

				item_id = configObject.item_id;

				if (ds.activeItem.id != 'carousel_item_0') {

					ds.activeItem.className = 'REITER_SCROLLEN';

				}

				if (ds.activeItem.id == 'carousel_item_0') {

					ds.activeItem.parentNode.className = 'REITER_PRAEGNANT';

					ds.activeItem.className = 'REITER_TEXT';

				}

			} else {

				item_id = configObject.item_id;

				ds.activeItem.className = 'REITER_SCROLLEN';

				var actualFirstItem = document.getElementById(item_id);

				actualFirstItem.className = 'REITER_PRAEGNANT';

				ds.activeItem = actualFirstItem;

				// set shadow div onclick event

				/** @ignore */
				obj.parentNode.children[1].onclick = function(evt) {
					evt = evt || window.event;
					var target = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
					var cls = target.parentNode.className;
					if (cls == 'KARUSSELNAVI_RECHTS' ||cls == 'KARUSSELNAVI_LINKS') {
							return;
					}

					window.location.href = data.clickurl;

				};

			}

		}

	}

};