/**
 * This is the builder function for the image carousel.
 * The opts.items[].ctaButtonText is optional.
 * @param {Object} opts Configuration object.
 * @param {String} opts.renderTo The id of an existing element where you want the carousel to appear.
 * @param {Boolean} [opts.firstItemLocked=false] If this is set to true, the first item will not be slided and remain visible.
 * @param {Number} opts.nextSlideAfterSeconds How long should one item be visible in seconds?
 * @param {Number} opts.firstSlideStaysSeconds How long should the first item be visible on initial load in seconds?
 * @param {String} opts.ivwCode IVW Tag/Code that should be called when somebody clicks on next and previous slide.
 * @param {Object[]} opts.items Array of objects containing all items that can be slided.
 * @example onmjs.img.carousel.init({
 *	renderTo: 'TEASERCAROUSEL',
 *	nextSlideAfterSeconds: 5,
 *	firstSlideStaysSeconds: 10,
 *	ivwCode: 'GALLY-1337',
 *	items: [
 *		{
 *			title: 'test 1',
 *			sub_title: 'test subtitle 1',
 *			description: 'this is a example description',
 *			picture: 'http://www.wolves.com/picture_of_a_wolve.jpg',
 *			clickurl: 'http://wolves-are-fun.com/',
 *			ctaButtonText: 'This is a funny button'
 *		},
 *		{
 *			title: 'test 2',
 *			sub_title: 'test subtitle 2',
 *			description: 'this is a example description',
 *			picture: 'http://www.wolves.com/picture_of_a_wolve.jpg',
 *			clickurl: 'http://wolves-are-fun.com/',
 *		},
 *		{
 *			title: 'test 3',
 *			sub_title: 'test subtitle 3',
 *			description: 'this is a example description',
 *			picture: 'http://www.wolves.com/picture_of_a_wolve.jpg',
 *			clickurl: 'http://wolves-are-fun.com/',
 *			ctaButtonText: 'This is a funny button'
 *		}
 *	]
 * });
 *
 */
onmjs.img.carousel.init = function(opts) {

	// remapping
	var cfgObject = opts;
	var minimumItemsRequired = 3;


	// datastore
	onmjs.internals.dataStores.img.carousel[cfgObject.renderTo] = new Object();

	var ds = onmjs.internals.dataStores.img.carousel[cfgObject.renderTo];


	// shorthand for the element where the carousel should appear
	var d = document.getElementById(cfgObject.renderTo);


	/* clear the contents of the area
	   where the carousel should appear */
	d.innerHTML = '';


	/* Check for the minimum required items.
	if we do not have enough item in the configObject.items
	then we will write an appropriate error message
	to the area where the carousel should have
	appeared and end the script here */
	if (cfgObject.items.length < minimumItemsRequired) {

		d.innerHTML = 'Minimum required items: ' + minimumItemsRequired;

		return;

	}


	ds.id = cfgObject.renderTo;

	ds.items = new Object();

	ds.firstItemLocked = cfgObject.firstItemLocked;

	ds.nextSlideAfterSeconds = cfgObject.nextSlideAfterSeconds;

	ds.firstSlideStaysSeconds = cfgObject.firstSlideStaysSeconds;

	ds.currentSlideNum = 0;

	ds.pixelSlided = 0;

	ds.imageTransitionLock = false;

	ds.activeItem = 0;

	ds.transitionLocked = false;


	d.onmouseout = function(e) {

		if (!e) {
			e = window.event;
		}


		var tg = d;

		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;


		if (!reltg) {
			return;
		}


		while (reltg != tg &&
			reltg.nodeName != 'BODY' &&
			reltg != document) {

			reltg= reltg.parentNode;

		}


		if (reltg== tg) {
		   return;
		}

		var item_id = null;

		if (cfgObject.firstItemLocked === true ||
			cfgObject.firstItemLocked === 1) {

			onmjs.img.carousel.setLarge({'item_id': 'carousel_item_0'});

			item_id = d.children[1].firstChild.children[2].firstChild.children[1].id;


			if (ds.activeItem.id != 'carousel_item_0') {

				ds.activeItem.className = 'REITER_SCROLLEN';

				ds.activeItem = document.getElementById('carousel_item_0');

				ds.activeItem.parentNode.className = 'REITER_PRAEGNANT';


			} else {

				item_id = d.children[1].firstChild.children[2].firstChild.children[1].id;

				ds.activeItem = document.getElementById('carousel_item_0');

				ds.activeItem.parentNode.className = 'REITER_PRAEGNANT';

			}

			ds.sliderTimeout = setTimeout("onmjs.img.carousel.slideLeft.go('"+ds.id+"',1)", ds.secondsUntilNextSlide*1000);

		} else {

			item_id = d.children[1].firstChild.children[1].firstChild.firstChild.id;

			var actualItem = document.getElementById(item_id);

			ds.activeItem.className = 'REITER_SCROLLEN';

			ds.activeItem = actualItem;

			ds.activeItem.className = 'REITER_PRAEGNANT';

			onmjs.img.carousel.setLarge({'item_id': actualItem.id});

			ds.sliderTimeout = setTimeout("onmjs.img.carousel.slideLeft.go('"+ds.id+"',1)", ds.secondsUntilNextSlide*1000);

		}

		return;

	};

	var divLargePic = document.createElement('div');

	divLargePic.className = 'KARUSSELBILD';

	divLargePic.style.cursor = 'pointer';

	/** @ignore */
	divLargePic.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	var imgLargePic = document.createElement('img');

	imgLargePic.src = 'about:blank';

	imgLargePic.width = 610;

	imgLargePic.height = 200;

	imgLargePic.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	var divLargePicText = document.createElement('div');

	divLargePicText.className = 'KARUSSELTEXT';

	divLargePicText.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	divLargePic.appendChild(imgLargePic);

	divLargePic.appendChild(divLargePicText);

	divLargePic.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	var divNavigationShadow = document.createElement('div');

	divNavigationShadow.className = 'KARUSSELNAVI_SCHATTEN';
	divNavigationShadow.style.cursor = 'pointer';

	divNavigationShadow.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	var divNavigation = document.createElement('div');

	divNavigation.className = 'KARUSSELNAVIGATION';

	divNavigation.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};

	/** @ignore */
	var divNavigationLeftArrow = document.createElement('div');

	divNavigationLeftArrow.onclick = function() {

		if (ds.transitionLocked === true) {

			return;

		}

		if (typeof cfgObject.ivwCode == 'string') {

			onmjs.tracker.ivw.track({'tag': cfgObject.ivwCode});

			onmjs.img.carousel.slideRight.go(cfgObject.renderTo);

		}
	};

	divNavigationLeftArrow.className = 'KARUSSELNAVI_LINKS';

	divNavigationLeftArrow.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};



	var divNavigationLeftArrow_a = document.createElement('a');

	divNavigationLeftArrow_a.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	var divNavigationLeftArrow_a_span = document.createElement('span');

	divNavigationLeftArrow_a_span.innerHTML = 'zur&uuml;ck';

	divNavigationLeftArrow_a_span.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};

	// appends
	divNavigationLeftArrow_a.appendChild(divNavigationLeftArrow_a_span);

	divNavigationLeftArrow.appendChild(divNavigationLeftArrow_a);


	// right arrow
	var divNavigationRightArrow = document.createElement('div');

	divNavigationRightArrow.onclick = function() {

		if (ds.transitionLocked === true) {

			return;

		}

		if (typeof cfgObject.ivwCode == 'string') {

			onmjs.tracker.ivw.track({'tag': cfgObject.ivwCode});

		}

		onmjs.img.carousel.slideLeft.go(ds.id);

	};

	divNavigationRightArrow.className = 'KARUSSELNAVI_RECHTS';

	divNavigationRightArrow.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	var divNavigationRightArrow_a = document.createElement('a');

	divNavigationRightArrow_a.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	var divNavigationRightArrow_a_span = document.createElement('span');

	divNavigationRightArrow_a_span.innerHTML = 'weiter';

	divNavigationRightArrow_a_span.onmouseover = function(){

		clearTimeout(ds.sliderTimeout);

	};

	// appends
	divNavigationRightArrow_a.appendChild(divNavigationRightArrow_a_span);

	divNavigationRightArrow.appendChild(divNavigationRightArrow_a);

	// appends left arrow to navigation
	divNavigation.appendChild(divNavigationLeftArrow);


	var divPreviewBar = document.createElement('div');

	divPreviewBar.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};


	if (cfgObject.firstItemLocked === true ||
		cfgObject.firstItemLocked === 1) {

		divPreviewBar.className = 'KARUSSELTHEMENBOX';

	} else {

		divPreviewBar.className = 'KARUSSELTHEMENBOX_WEIT';

	}


	var divItemHolder = document.createElement('div');

	divItemHolder.onmouseover = function() {

		clearTimeout(ds.sliderTimeout);

	};

	divItemHolder.className = 'KARUSSELTHEMEN';



	var itemsOrig = cfgObject.items;

	var items = new Array();

	var i = 0;

	for (i=0; i<itemsOrig.length*2;i++) {

		if (i<itemsOrig.length) {

			items[i] = itemsOrig[i];

		} else {

			items[i] = itemsOrig[i-itemsOrig.length];

		}

	}



	for (i=0; i<items.length; i++) {

		if ( i == itemsOrig.length && (cfgObject.firstItemLocked === true || cfgObject.firstItemLocked === 1)) {

			// @TODO: Need to be done.
			console.log('TODO..');

		} else {

			var item = items[i];

			// Copy values from init object to datastore

			ds.items['carousel_item_' + i] = new Object();

			var handle = ds.items['carousel_item_' + i];

			handle.title = item.title;

			handle.sub_title = item.sub_title;

			handle.description = item.description;

			handle.picture = item.picture;

			handle.clickurl= item.clickurl;

			if (item.ctaButtonText) {

				handle.ctaButtonText = item.ctaButtonText;

			}


			handle.secondsUntilNextSlide = item.secondsUntilNextSlide;

			ds.firstItemLocked = cfgObject.firstItemLocked;



			var divItem = document.createElement('div');

			divItem.id = 'carousel_item_' + i;

			divItem.className = 'REITER_SCROLLEN';

			var data = null;

			if (i===0) {

				// if item is locked
				if (cfgObject.firstItemLocked === true ||
					cfgObject.firstItemLocked === 1) {

					var lockedFirstItem = document.createElement('div');

					lockedFirstItem.className = 'REITER_PRAEGNANT';

					lockedFirstItem.id = 'onmeda_jsTeaser_lockedFirstItem';


					data = ds.items['carousel_item_0'];


					divItem.className = 'REITER_TEXT';

					divItem.innerHTML = '<strong>' + item.title + '</strong>' + item.sub_title;


					divLargePic.firstChild.src = item.picture;

					/** @ignore */
					divLargePic.firstChild.onclick = function() {

						window.location.href = data.clickurl;

					};

					divLargePic.children[1].innerHTML = '<h1>' + data.title + '</h1><h2>' + data.sub_title + '</h2><p>' + data.description+'</p>';

					onmedaJS.tmp.carousel.activeItem = divItem;

				} else { // first item is not locked

					data = ds.items['carousel_item_0'];

					divItem.className = 'REITER_PRAEGNANT';

					divItem.innerHTML = '<div class="REITER_TEXT">' + '<strong>' + item.title + '</strong>' + item.sub_title+'</div>';

					divLargePic.firstChild.src = item.picture;

					divLargePic.firstChild.onclick = function() {

						window.location.href = data.clickurl;

					};

					divNavigationShadow.onclick = function(evt) {

						evt = evt || window.event;

						var target = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);

						var cls = target.parentNode.className;

						if (cls == 'KARUSSELNAVI_RECHTS' ||
							cls == 'KARUSSELNAVI_LINKS') {

							return;

						}

						window.location.href = data.clickurl;

					};

					divItem.firstChild.firstChild.onclick = function() {

						 window.location.href = data.clickurl;

					};

					divLargePic.children[1].innerHTML = '<h1>' + data.title + '</h1><h2>' + data.sub_title+'</h2><p>' + data.description+'</p>';


					// if ctaButtonText is defined add it to the
					// innerHTML
					if (data.ctaButtonText) {

						divLargePic.children[1].innerHTML += '<span class="ACTION_BUTTON"><a href="#">'+ data.ctaButtonText+ '</a></span>';

					}

					divLargePic.children[1].onclick = function() {

						 divLargePic.firstChild.onclick();

					};


					ds.activeItem = divItem;

				}

			} else {

				divItem.innerHTML = '<div class="REITER_TEXT"><strong>' + item.title + '</strong>' + item.sub_title+'</div>';

			}

			divItem.onmouseover = function() {

				onmjs.img.carousel.setLarge({'item_id': this.id});

				clearTimeout(ds.sliderTimeout);

				if (cfgObject.firstItemLocked === true ||
					cfgObject.firstItemLocked === 1) {

					if (this.id == 'carousel_item_0') {

						if (ds.activeItem.id != 'carousel_item_0') {

							ds.activeItem.className = 'REITER_SCROLLEN';

							ds.activeItem = this;

							ds.activeItem.parentNode.className = 'REITER_PRAEGNANT';

						} else {

							ds.activeItem = this;

							ds.activeItem.parentNode.className = 'REITER_PRAEGNANT';

						}
					} else {

						if (ds.activeItem.id == 'carousel_item_0') {

							ds.activeItem.parentNode.className = 'REITER_SCROLLEN';

							ds.activeItem = this;

							ds.activeItem.className = 'REITER_PRAEGNANT';

						} else {

							ds.activeItem.className = 'REITER_SCROLLEN';

							ds.activeItem = this;

							ds.activeItem.className = 'REITER_PRAEGNANT';

						}

					}

				} else {

					ds.activeItem.className = 'REITER_SCROLLEN';

					ds.activeItem = this;

					ds.activeItem.className = 'REITER_PRAEGNANT';

				}

			};



			divItem.onclick = function() {

				window.location.href = ds.items[this.id].clickurl;

			};



			if (i === 0 && (cfgObject.firstItemLocked === true || cfgObject.firstItemLocked === 1)) {

				lockedFirstItem.appendChild(divItem);

				divNavigation.appendChild(lockedFirstItem);

			} else {

				divItemHolder.appendChild(divItem);

			}

		}

	}

	divPreviewBar.appendChild(divItemHolder);

	divNavigation.appendChild(divPreviewBar);

	divNavigation.appendChild(divNavigationRightArrow);

	divNavigationShadow.appendChild(divNavigation);

	d.appendChild(divLargePic);

	d.appendChild(divNavigationShadow);



	// how many slides are in here?
	ds.hasSlidesNum = onmjs.utils.getObjectLength(ds.items);

	if (cfgObject.firstItemLocked === true || cfgObject.firstItemLocked === 1) {

		d.children[1].firstChild.children[2].firstChild.style.width = '4000px';

	} else {

		d.children[1].firstChild.children[1].firstChild.style.width = '4000px';

	}

	/* Possibly this causes the strange behaviour we have seen
	 * multiple times when the user refocuses the tab
	 * or window and the teaser is going crazy and
	 * is sliding the items fast as hell */
	setTimeout(function(){

		if (!ds.sliderTimeout) {

			ds.sliderTimeout = setTimeout("onmjs.img.carousel.slideLeft.go('"+ds.id+"',1)",ds.items[ds.activeItem.id].secondsUntilNextSlide*1000);

		}

	},100);

	window.onblur = function() { window.blurred = true; };
	window.onfocus = function() { window.blurred = false; };

};