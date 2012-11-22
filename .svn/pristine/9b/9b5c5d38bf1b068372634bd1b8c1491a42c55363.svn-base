/**
 * This is the builder function for the images gallery.
 * @param cfgObject Configuration object.
 * @param {string} cfgObject.renderTo The id of the element where you want the pictureClicker to appear.
 * @param {string} cfgObject.layout This can be "article" if the pictureClicker should be included in an article, otherwise just leave it empty.
 * @param {string} cfgObject.ivwCode
 * @param {string} cfgObject.gaCode Supply a Google Analytics tracking code.
 * @param {object[]} cfgObject.items Array of objects containing infos for rendering the items. You need to supply at least 2 items.
 * @example
 * onmedaJS.builder.pictureClicker({
 *   renderTo: 'ONMEDA_GALLERY',
 *   title: 'Kinderkrankheiten',
 *   layout: 'wide',
 *   gaCode: '',
 *   ivwCode: 'gally-00122',
 *   url:'',
 *   items: [
 *     {
 *       'description': 'Mumps, Masern & Co. ...',
 *       'picture': 'http://i.onmeda.de/bg_kinderkrankheiten.jpg'
 *     },
 *     {
 *       'description': 'Windpocken ... ',
 *       'picture': 'http://i.onmeda.de/bg_windpocken_junge.jpg'
 *       }
 *   ]
 * });
 * @function
 */
onmjs.img.pictureClicker.init = function(cfgObject) {

	var ds = onmjs.internals.dataStores.img.pictureClicker[cfgObject.renderTo];

	if (typeof ds == 'undefined') {

		ds = new Object();

	}

	// init default backlink value
	var backlink = 'http://www.onmeda.de/bildergalerien/';

	if (location.href.indexOf('http://www.onmeda.es') === 0) {

		backlink = 'http://www.onmeda.es/';

	}

	ds.renderTo = cfgObject.renderTo;

	ds.layout = cfgObject.layout;

	ds.items = [];

	ds.itemLength = 0;

	ds.ivwCode = cfgObject.ivwCode;

	ds.gaCode = cfgObject.gaCode;

	ds.itemLength = onmjs.utils.getObjectLength(cfgObject.items);

	ds.items  = cfgObject.items;

	// preloading all images
	onmjs.img.preloader(ds.items);

	/* Register event handler for keypress left and keypress right
	 *
	 * The handlers are only registered for
	 * the first pictureClicker. If there are more than one
	 * pictureClickers, only the first will have registered events.
	 */

	var pictureClickersLength = onmjs.internals.dataStores.img.pictureClicker;

	pictureClickersLength = onmjs.utils.getObjectLength(pictureClickersLength);

	/* Create a outline */
	var div_outline = document.createElement('div');

	div_outline.className = 'BILDERGALERIE_GERUEST';


	/* create div for the button : previous */
	var div_button_previous = document.createElement('a');

	div_button_previous.id = 'onmeda_pictureClicker_button_previous';

	div_button_previous.className = 'GALERIE_ZURUECK';

	div_button_previous.href = 'javascript:void(0);';

	/** @ignore */
	div_button_previous.onclick = function() {

		/* make some pointers ;) */
		var p_renderToItem = this.parentNode.parentNode.parentNode.parentNode;

		var p_img = p_renderToItem.childNodes[1].firstChild.firstChild;

		var p_desc = p_renderToItem.childNodes[1].childNodes[1].firstChild;

		var num = 0;

		if (img['data-num'] > 0) { // show previous picture

			/* get actual array index */
			num = img['data-num'];

			p_img.src = ds.items[num-1].picture;

			p_desc.innerHTML = ds.items[num-1].description;

			p_img['data-num'] = img['data-num']-1;

		} else { // start with last picture

			/* get actual array index */
			num = ds.itemLength-1;

			p_img['data-num'] = ds.itemLength-1;

			p_img.src = ds.items[num].picture;

			p_desc.innerHTML = ds.items[num].description;

		}

		/* Call IVW and say hello */
		if (typeof ds.ivwCode == 'string') {

			onmjs.tracker.ivw.track({'tag': ds.ivwCode});

		}

		var currentPageNumber = p_img['data-num']+1;

		var currentOfTotal = onmjs.getTranslation(null,'pictureClicker->currentOfTotal').replace('[current]',currentPageNumber).replace('[total]',ds.itemLength);

		p_renderToItem.childNodes[1].childNodes[1].childNodes[1].innerHTML = currentOfTotal;

		/* Google Analytics */
		onmjs.tracker.googleAnalytics.track({gaCode: ds.gaCode});

	};

	/* create div for the button : next */
	var div_button_next = document.createElement('a');

	div_button_next.id = 'onmeda_pictureClicker_button_next';

	div_button_next.className = 'GALERIE_VOR';

	div_button_next.href = 'javascript:void(0);';

	/** @ignore */
	div_button_next.onclick = function() {

		/* make some pointers ;) */
		var p_renderToItem = this.parentNode.parentNode.parentNode.parentNode;

		var p_img = p_renderToItem.childNodes[1].firstChild.firstChild;

		var p_desc = p_renderToItem.childNodes[1].childNodes[1].firstChild;

		// get actual array index
		var num = img['data-num'];

		// show next picture
		if (img['data-num'] >= 0 &&
			img['data-num']+1 < ds.itemLength) {

			p_img.src = ds.items[num+1].picture;

			p_desc.innerHTML = ds.items[num+1].description;

			p_img['data-num'] = img['data-num']+1;


		// start with first picture
		} else if (img['data-num']+1 == ds.itemLength) {

			p_img.src = ds.items[0].picture;

			p_desc.innerHTML = ds.items[0].description;

			p_img['data-num'] = 0;


		// start with last picture
		} else {

			p_img['data-num'] = ds.itemLength;

			p_img.src = ds.items[num].picture;

			p_desc.innerHTML = ds.items[num].description;

		}

		// Call IVW and say hello
		if (typeof ds.ivwCode == 'string') {

			onmjs.tracker.ivw.track({'tag': ds.ivwCode});

		}

		var currentPageNumber =  p_img['data-num']+1;

		var currentOfTotal = onmjs.getTranslation(null,'pictureClicker->currentOfTotal').replace('[current]',currentPageNumber).replace('[total]',ds.itemLength);

		p_renderToItem.childNodes[1].childNodes[1].childNodes[1].innerHTML = currentOfTotal;

		// Google Analytics
		onmjs.tracker.googleAnalytics.track({gaCode: ds.gaCode});

	};

	// left and right arrows
	onmjs.utils.addKeyListener(document,'down', function(evt) {

		var keyCode = onmjs.utils.getKeyCode(evt);

		var keyMap = onmjs.internals.dataStores.keyEvents.keyMap;

		if (keyCode == keyMap.leftArrow) {
			div_button_previous.onclick();
		}

		if (keyCode == keyMap.rightArrow) {
			div_button_next.onclick();
		}

	});

	// create paging span
	var span_paging = document.createElement('span');

	var currentOfTotal = onmjs.getTranslation(null,'pictureClicker->currentOfTotal').replace('[current]','1').replace('[total]',cfgObject.items.length);

	span_paging.innerHTML = currentOfTotal;


	// create div which holds all navigation items
	var div_navigation = document.createElement('div');

	div_navigation.className = 'BILDERGALERIE_NAVIGATION';

	div_navigation.appendChild(div_button_previous);

	div_navigation.appendChild(div_button_next);


	// create div for the image
	var div_img = document.createElement('div');

	div_img.className= 'BILDERGALERIE_BUEHNE';

	var title = '';
	// the title of the gallery
		// if is artcle
		if (cfgObject.layout == 'article') {

			title = document.createElement('h3');

		} else {

			title = document.createElement('h1');

		}

	title.innerHTML = cfgObject.title;


	// Create the image description element
	div_description = document.createElement('div');

	div_description.className = 'BILDGALERIE_BESCHRIFTUNG';

	var div_description_p  = document.createElement('p');

	div_description_p.innerHTML = cfgObject.items[0].description;

	div_description.appendChild(div_description_p);

	div_description.appendChild(span_paging);

	var img = document.createElement('img');

	img.style.cursor = 'pointer';

	if (cfgObject.layout == 'wide') {

		img.width = 580;

		img.height = 430;


	// article specific layout
	} else if (cfgObject.layout == 'article') {

		img.width = 380;

		img.height = 282;

	} else {

		img.width = 285;

		img.height = 430;

	}

	img.src = cfgObject.items[0].picture;

	// use custom data attribute to store actual index of array

	img['data-num'] = 0;

	// this will force jsdoc to ignore the following code until the next nocode doc comment is encountered.
	/**#nocode+*/
	img.onclick = function() {

		var p_renderToItem = this.parentNode.parentNode.parentNode;

		var p_img = this;

		var p_desc = p_renderToItem.childNodes[1].childNodes[1].firstChild;


		// get actual array index
		var num = img['data-num'];


		// show next picture
		if (img['data-num'] >= 0 &&
			img['data-num']+1 < ds.itemLength) {

			this.src = ds.items[num+1].picture;

			p_desc.innerHTML = ds.items[num+1].description;

			this['data-num'] = img['data-num']+1;


		// start with first picture
		} else if (img['data-num']+1 == ds.itemLength) {

			this.src = ds.items[0].picture;

			p_desc.innerHTML = ds.items[0].description;

			this['data-num'] = 0;


		// start with last picture
		} else {

			this['data-num'] = ds.itemLength;

			this.src = ds.items[num].picture;

			p_desc.innerHTML = ds.items[num].description;

		}

		/* Call IVW and say hello */
		if (typeof ds.ivwCode == 'string') {

			onmjs.tracker.ivw.track({'tag': ds.ivwCode});

		}

		var currentPageNumber =  p_img['data-num']+1;

		var currentOfTotal = onmjs.getTranslation(null,'pictureClicker->currentOfTotal').replace('[current]',currentPageNumber).replace('[total]',ds.itemLength);

		p_renderToItem.childNodes[1].childNodes[1].childNodes[1].innerHTML = currentOfTotal;


		/* Google Analytics */
		onmjs.tracker.googleAnalytics.track({gaCode: ds.gaCode});

	};
	/**#nocode-*/

	div_img.appendChild(img);


	// Create back to overview link
	var p_b2overview = document.createElement('p');

	var span_b2overview = document.createElement('span');

	span_b2overview.className = 'LINKS';


	var a_b2overview = document.createElement('a');

	a_b2overview.className = 'DOPPELPFEIL';

	if (cfgObject.language &&
		cfgObject.language.backTo) {

		a_b2overview.innerHTML = cfgObject.language.backTo;

	} else {

		a_b2overview.innerHTML = 'Alle Bildergalerien';


		if (window.location.hostname == 'www.onmeda.es') {

			a_b2overview.innerHTML = 'Volver a la p&#0225;gina de inicio.';

		}

	}

	a_b2overview.href = backlink;

	if (typeof cfgObject.url == 'string' &&
		cfgObject.url !== '') {

		a_b2overview.href = cfgObject.url;

	}

	span_b2overview.appendChild(a_b2overview);

	p_b2overview.appendChild(span_b2overview);


	var content = document.getElementById(cfgObject.renderTo);

	content.innerHTML = '';


	// do the append magic stuff here
	content.appendChild(title);

	div_img.appendChild(div_navigation);

	div_outline.appendChild(div_img);

	div_outline.appendChild(div_description);

	content.appendChild(div_outline);

	if (cfgObject.layout != 'article') {

		content.appendChild(p_b2overview);

		content.className='TEASERBOX_BILDERGALERIE';

	} else {

		content.className='TEASERARTIKEL_BILDERGALERIE';

	}

};