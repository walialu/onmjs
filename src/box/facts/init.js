/**
 * This is somehow a picture gallery element but without images
 * @function
 * @param {Object} cfg Configuration object.
 * @param {String} cfg.renderTo String (id of element) where the factbox should rendered to.
 * @param {Object} cfg.renderTo HTMLObject where the factbox should be rendered in.
 * @param {String} cfg.title Title of the factbox
 * @param {Object[]} Array of objects containing all facts.
 * @param {String} cfg.gaCode Google Analytics path to call when navigating between facts.
 * @param {String} cfg.gaAccount Google Analytics Account to use when making calls.
 * @param {String} cfg.ivwCode IVW code to call when navigating between facts.
 * @return {undefined}
 * @see http://flyspray.intern.gofemininde.local/3076
 * @example
 * onmjs.box.facts.init({
 * 	"renderTo": "ONMEDA_FACTBOX_2",
 * 	"title": "testbox",
 * 	"gaCode": "/tools/factbox/preview.php-factbox-00002.html",
 * 	"gaAccount": "UA-115586-6",
 * 	"ivwCode": "factbox-00002",
 * 	"items":[{"text":"test"},{"text":"test2"}]
 * });
 */
onmjs.box.facts.init = function (cfg) {

	var renderTo,itemsLength,title;

	/*
	 * Check if renderTo is an object or a string
	 * If it is an object we dont need to do a getElementById
	 * If it is a string we will do a getElementById
	 *
	 *	If it is no object nor a string
	 *	we will console.log the error
	 */
	if (typeof cfg.renderTo != 'undefined') {

		if (typeof cfg.renderTo == 'object') {

			renderTo = cfg.renderTo;

		} else if (typeof cfg.renderTo == 'string') {

			renderTo = document.getElementById(cfg.renderTo);

		} else {

			console.log('onmjs.box.facts.init(): Configuration object with key renderTo does not contain valid value!');

			 return;
		}

	} else {

		console.log('onmjs.box.facts.init(): Configuration object with key renderTo is required but not given!');

		 return;
	}

	if (!cfg.title ||
		typeof cfg.title != 'string') {

		console.log('onmjs.box.facts.init(): Configuration object with key title does not contain valid value!');

		return;

	} else {

		title = cfg.title;

	}

	if (!cfg.items) {

		console.log('onmjs.box.facts.init(): Configuration object key items required!');

		return;

	}

	itemsLength = cfg.items.length;

	var datastores = onmjs.internals.dataStores.box.facts;

	datastores[cfg.renderTo] = new Array();

	var datastore = datastores[cfg.renderTo];

	datastore.ivwCode = cfg.ivwCode;
	datastore.gaCode = cfg.gaCode;
	datastore.gaAccount = cfg.gaAccount;

	for (var i=0;i<itemsLength;i++) {

		datastore[i] = {};

		datastore[i].text = cfg.items[i].text;

	}

	datastore.currentIndex = 0;


	var content =  content	= document.createElement('div');

	content.className = 'ARTIKEL_FAKTENBOX';


	var elem_h3 = document.createElement('h3');

	elem_h3.innerHTML = title;


	var elem_box = document.createElement('div');

	elem_box.className = 'FAKTENBOX_GERUEST';


	var elem_description = document.createElement('div');

	elem_description.className = 'FAKTENBOX_BESCHRIFTUNG';

	elem_description.style.minHeight = '85px';
	elem_description.style.height = 'auto';


	var elem_p = document.createElement('p');

	elem_p.innerHTML = cfg.items[0].text;


	var elem_span = document.createElement('span');

	var currentOfTotal = onmjs.getTranslation(null,'factbox->currentOfTotal').replace('[current]','1').replace('[total]',itemsLength);

	elem_span.innerHTML = currentOfTotal;


	var elem_nav = document.createElement('div');

	elem_nav.className = 'FAKTENBOX_NAVIGATION';


	var elem_prev = document.createElement('a');

	elem_prev.className = 'GALERIE_ZURUECK';

	elem_prev.innerHTML = '<span>zur&uuml;ck</span>';

	elem_prev.href = 'javascript:void(0);';


	var elem_next = document.createElement('a');

	elem_next.className = 'GALERIE_VOR';

	elem_next.innerHTML = '<span>vor</span>';

	elem_next.href = 'javascript:void(0);';

	/** @ignore */
	elem_prev.onclick = function() {

		onmjs.box.facts.prev(this,datastore);

		onmjs.tracker.ivw.track({"tag": datastore.ivwCode});

		onmjs.tracker.googleAnalytics.track({
			"gaCode": datastore.gaCode,
			"gaAccount": datastore.gaAccount
		});

	};

	/** @ignore */
	elem_next.onclick = function() {

		onmjs.box.facts.next(this, datastore);

		onmjs.tracker.ivw.track({"tag": datastore.ivwCode});

		onmjs.tracker.googleAnalytics.track({
			"gaCode": datastore.gaCode,
			"gaAccount": datastore.gaAccount
		});

	};


	/* Add keyleft and keyright event,
	 * if not set by another instance */
	var keyMap = onmjs.internals.dataStores.keyEvents.keyMap;

	// left and right arrows
	onmjs.utils.addKeyListener(document,'down',function(evt) {

		var keyCode = onmjs.utils.getKeyCode(evt);

		if (keyCode == keyMap.leftArrow) {
			elem_prev.onclick();
		}

		if (keyCode == keyMap.rightArrow) {
			elem_next.onclick();
		}

	});

	elem_nav.appendChild(elem_prev);

	elem_nav.appendChild(elem_next);


	elem_description.appendChild(elem_p);

	elem_description.appendChild(elem_span);

	elem_description.appendChild(elem_span);

	elem_description.appendChild(elem_nav);


	elem_box.appendChild(elem_description);


	content.appendChild(elem_h3);

	content.appendChild(elem_box);


	renderTo.innerHTML = '';

	renderTo.appendChild(content);

};