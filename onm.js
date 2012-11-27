/** @namespace */
onmjs = {};
/**
 * <p>This is inspired by jQuery and grabbed from the gaia.js / h4kr.js.</p>
 *
 * <p>It is a kind of wrapper for getElementById, getElementsByClassName and getElementsByTagName
 * The target param can be an ID (#idMoo123), a className (.thisClassHasAName)
 * or a tagName (h1).</p>
 *
 * <p>If it is a className or a tagName the function will return an arrayset of
 * matching elements.</p>
 *
 *
 * @example var div_with_id_moo2 = onmjs.get('#moo2'); // will return the div with the id moo2
 *
 * console.log(div_with_id_moo2); // just see for yourself
 *
 * @param {String|Object} target Can be a ID like #moo2 or a class name like .moo2 or a object like document.
 *
 * @returns {Object|Array|null} Object or Array if Element(s) exists in scope or null if element could not be found.
 */
onmjs.get = function(target) {

	var ref = document;
	var sa,elems,i2;

	if (typeof target == 'string') {

		if (target.indexOf(' ') !== false) {

			target = target.split(' ') ;

		} else {

			target[0] = target ;

		}

		for (var i=0;i<target.length;i++) {

			if (target[i].indexOf('#') !== false) { // searching for ID

				if (target[i].indexOf('#') === 0) {

					return ref.getElementById( target[i].substring(1) ) ;


				} else {

					sa = target[i].split('#') ;

					elems = ref.getElementsByTagName( sa[0] ) ;

					for ( i2=0 ; i2 < elems.length ; i2++ ) {

						if ( elems[i].id == sa[1] ) {

						   ref = elems[i] ;

						}

					}

				}

			}

			if ( target[i].indexOf('.') !== false ) { // classname

				var container = new Array() ;

				if ( target[i].indexOf('.') === 0 ) {

					ref = ref.getElementsByClassName( target[i].substring(1) ) ;

				} else {

					sa = target[i].split('.') ;

					elems = ref.getElementsByClassName( sa[1] ) ;

					for ( i2=0 ; i2 < elems.length ; i2++ ) {

						container.push( elems[i] ) ;

					}

					ref = container ;

				}

			}

			if ( i == target.length-1 ) {

				return ref ;

			}


		}

		} else if ( typeof target == 'object' ) {

			return target ;

		}

		return null;

};

/**
 * shorthand for onmjs.utils.getTranslation()
 * @function
 */
onmjs.getTranslation = function( lang, key ) {

	return onmjs.utils.getTranslation(lang, key) ;

};

/** @returns the Onmeda JS version string */
onmjs.getVerion = function() {
	return this.version;
};

/**
 * Wrapper for on+event. You can also use it as onDocumentReady in a cross-browser way.
 * This function does not override existing events. It'll append them.
 * @function
 * @param {string} m Event (e.g.: ready).
 * @param {function} callback Callback function when event fires.
 * @example onmjs.on('ready',function(){
 * 	alert('document ready');
 * });
 */
onmjs.on = function(m,callback) {

	if ( m == 'ready') {

		/* Chrome!!, Mozilla, Opera and all the other great browsers
		 * that (mostly) care about W3C specs
		 */
		if (document.addEventListener) {

			document.addEventListener('DOMContentLoaded', callback, false);

		}

		/* Safari, iCab, Konqueror */
		if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {

			var DOMLoadTimer = setInterval(function () {

				if (/loaded|complete/i.test(document.readyState)) {

					callback();

					clearInterval(DOMLoadTimer);

				}

			}, 10);

		}

		// Other web browsers
		var oldonload = window.onload;

		if (typeof window.onload != 'function') {

			window.onload = callback;

		} else {

			window.onload = function() {

				if (oldonload) {

					oldonload();

				}

				callback();

			};
		}

	}

};

/*global onmjs */
onmjs.version = '0.0.73';

/*global onmjs */
var onmedaJS = {

	builder: {

		carousel: function (cfgObject) {
			onmjs.img.carousel.init(cfgObject);
		},

		pictureClicker: function (cfgObject) {

			onmjs.img.pictureClicker.init(cfgObject);

		}

	}

};

var fontsize = function (m) {

	if (m === 'inkrement') {

		onmjs.style.font.size.set('+');

	} else if (m === 'dekrement') {

		onmjs.style.font.size.set('-');

	} else {

		onmjs.style.font.size.init();

	}

};

var MWW_OpenWindow = function (url, width, height, moo) {

	onmjs.window.open({
		"url": url,
		"id": "contactForm",
		"width": width,
		"height": height
	});

};


var sponsoredby_infoicon = function () {

	onmjs.articles.sponsoredBy.infoIcon.toggle();

};


var set_href_id = function (to, from) {

	onmjs.utils.copyValue(onmjs.get('#' + from), onmjs.get('#' + to), 'href');

};

var set_href_url = function (to, url) {

	onmjs.get('#' + to).href = url;

};

/* The onmeda_sponlinkPflichttext() is used in many smartadserver scripts and
 * causes some weird bugs in IE7 so we will override it after it has been
 * loaded and use our own polished one.
 *
 * Alternatively we could have altered every single SmartAdServer script
 * which would have been a pain in the ass.
 *
 * We just have to keep track of this and someday in the future we may delete
 * this kind of "hackish" attempt here..
 */
onmjs.on('ready', function () {

	window.onmeda_sponlinkPflichttext = function (hl, txt) {

		onmjs.articles.sponsoredBy.requiredText(hl, txt);

	};

});

/** @namespace */
onmjs.ads = {};

/**
 * Refresh the iframe we might be using in the near future to deliver epic advertisments!
 * @param  {String} fids String of Numbers seperated by commata.
 * @example
 * onmjs.ads.refreshIframes('17438');
 * @return {undefined}
 */
onmjs.ads.refreshIframes = function(fids) {

	var fid,f,c,a=fids.split(/,/),i=0;

	try {

		for ( ;i<a.length;i++ ) {

			fid=a[i];
			f=document.getElementById('af_adrefresh_ifr_'+fid);

			if (!f) {

				c=document.getElementById('af_adrefresh_container_'+fid);

			}

			if (c) {

				f = document.createElement('iframe'); f.setAttribute('id', 'af_adrefresh_ifr_'+fid);
				f.setAttribute('scrolling', 'no'); f.setAttribute('frameborder', 0);
				f.setAttribute('width', 0); f.setAttribute('height', 0);
				c.innerHTML=''; c.appendChild(f);

			}

		}

		if (f && afAd.pageid && afAd.target) {

			f.setAttribute('src', '/service/ifr_adrefresh.php?' +
			'pubf='+fid +
			'&pubp='+afAd.pageid +
			'&pubt='+escape(afAd.target) +
			'&ts='+Math.floor(Math.random()*100000));

		}

	} catch(e) {}

};

/**
 * <p>Some function for the used for showing wallpaper ads.</p>
 *
 * <p>I just changed the syntax a bit, but the original src was supplied
 * by Oliver Kuhn and possibly written by Carina Vier</p>
 * @function
 * @param options Configuration object
 * @param {String} options.color A background color style like #ff0000.
 * @param {String} options.imgURL Image URL to a background image.
 * @param {String} options.imgRepeat CSS-Style definitions for background-repeat.
 * @param {String} options.imgPosition CSS-Style definitions for background-position.
 * @param {String} options.link Click url.
 * @author Carina Vier (carina.vier@gofeminin.de)
 */
onmjs.ads.wallpaper = function( options ) {

	var IE7 = false ;
	var bgColorStyle,bgImageStyle,bgCursorStyle = '';
	var posX,posY = 0;

	if ( navigator.userAgent.indexOf('MSIE 7.0') != -1 ||
		( navigator.userAgent.indexOf('MSIE 8.0') != -1 &&
		document.documentMode == '7' ) ) {

		IE7 = true ;

	}

	if ( options.color ) {

		bgColorStyle = 'background-color:' + options.color + ';' ;

	}

	if ( options.imgURL ) {

		bgImageStyle = 'background-image:url(' + options.imgURL + ');' ;

		if ( options.imgRepeat ) {

			bgImageStyle += 'background-repeat:'  + options.imgRepeat + ';' ;

		}

		if ( options.imgPosition ) {

			var pos_einzeln = options.imgPosition.split(' ') ;

			posX = parseInt( pos_einzeln[0], 10 ) ;

			posY = parseInt( pos_einzeln[1], 10 ) ;

		}

		if (IE7) {

			posX = posX += 800 ;

		}

		bgImageStyle += 'background-position:' + posX + 'px ' + posY + 'px;';

	} else {

		bgImageStyle = '';

	}

	if (options.link) {

		bgCursorStyle = 'cursor:pointer;';

	}

	var styles = '#WALLPAPER {' + bgCursorStyle + bgColorStyle + bgImageStyle + '}';

	var htmlHead = document.getElementsByTagName('head')[0];

	var styleElement = document.createElement('style');

	styleElement.setAttribute('type', 'text/css');


	if (styleElement.styleSheet) { // IE < 9

		styleElement.styleSheet.cssText = styles;

	} else {

		styleElement.appendChild(document.createTextNode(styles));

	}

	htmlHead.appendChild(styleElement);

	/**
	* @TODO: This overwrites any existing window.onload events
	* Talk to someone if we can/should change this
	* /marco
	*/

	if(options.link) {

		window.onload = function() {

			//quickfix
			//onmjs.get('#WALLPAPER').style.height = onmjs.get('#WEBSEITE').offsetHeight + 'px';

			document.getElementById('WALLPAPER').onclick = function() {

				window.open(options.link);

			};

		};

	}

};

/** @namespace */
onmjs.articles = {};

/*global onmjs */
/**
 * Will render the publication date visibile to the user.
 * @function
 * @param  {Boolean} opts.encoded true or false.
 * @param {String} opts.renderTo ID of the element where the date should be rendered to.
 * @param {String} opts.pubDate if encoded is true then this has to be a ROT13 and reversed string.
 * @return {String}      ROT13 and reversed string.
 */
onmjs.articles.coverPubDate = function (opts) {
	if (typeof opts === 'string') {
		document.write(opts);
		return;
	}
	if (opts.encoded) {
		opts.pubDate = onmjs.utils.rot13(opts.pubDate);
		opts.pubDate = onmjs.utils.string_reverse(opts.pubDate);
	}
	if (typeof opts.renderTo === 'string') {
		onmjs.get('#' + opts.renderTo).innerHTML = opts.pubDate;
	} else {
		opts.renderTo.innerHTML = opts.pubDate;
	}
};

/** @namespace */
onmjs.articles.chapters = {};

/** @namespace */
onmjs.articles.chapters.fx = {};

/*global onmjs*/
/**
 * Makes all links in the chapterbox invisible.
 * @function
 * @param {Object} opts Configuration object.
 * @param  {Number} opts.articleId Unigue ID of that article.
 * @param  {Number} opts.chaptersMax Maximum chapters of that article.
 * @param  {Number[]} opts.chaptersVisible Array of chapters that are visible on init.
 * @param  {Object} opts.translation translation object.
 * @example
 * onmjs.articles.chapters.fx.hide({
 * 	'translation': {
 * 		'showChapters': 'Inhaltsverzeichnis einblenden', 
 * 		'hideChapters': 'Inhaltsverzeichnis ausblenden'
 * 	},
 * 	'articleId': 4701,
 * 	'chaptersMax': 4,
 * 	'chaptersVisible': [1,2,3]
 * });
 * @returns {undefined}
 */
onmjs.articles.chapters.fx.hide = function (opts) {
	var ChapterUniqueID = opts.articleId,
		chapter_max = opts.chaptersMax,
		chapter_visible = opts.chaptersVisible,
		lang = opts.translation,
		i = 1,
		a = null,
		o = null;

	onmjs.articles.chapters.fx.manageCookies(ChapterUniqueID);

	for (i = 1; i <= chapter_max; i++) {

		if (i !== chapter_visible[0] &&
				i !== chapter_visible[1] &&
				i !== chapter_visible[2]) {

			a = onmjs.get('#chapter_' + i);

			a.className = 'KAPITEL_WEG';

		}

	}

	o = onmjs.get('#KAPITEL_SLIDER');

	o.innerHTML = lang.showChapters;

	o.href = 'javascript:onmjs.articles.chapters.fx.show({\'articleId\': '+ChapterUniqueID+',\'chaptersMax\': '+chapter_max+', \'chaptersVisible\': ['+chapter_visible+'],\'translation\': {\'showChapters\': \''+lang.showChapters+'\',\'hideChapters\':\''+lang.hideChapters+'\'}});';

	o.className = 'KAPITEL_SLIDER_EIN';


};

/*global onmjs */
onmjs.articles.chapters.fx.manageCookies = function (opts) {
	var ChapterUniqueID = opts.articleId, slider = onmjs.get('#KAPITEL_SLIDER'), date = new Date(), expires = 'expires=' + date.toGMTString();

	// noch nicht ausgeklappt, wird bei klick ausgeklappt
	if (slider.className === 'KAPITEL_SLIDER_EIN') {

		date.setTime(date.getTime() + (24 * 60 * 60 * 1000));

		document.cookie = 'onmedaChaptersOut_' + ChapterUniqueID + '=true; 0; path=/';

	} else {

		document.cookie = 'onmedaChaptersOut_' + ChapterUniqueID + '=false; expires=-1; path=/';

	}
};

/*global onmjs*/
/**
 * Makes all links in the chapterbox visible.
 * @function
 * @param {Object} opts Configuration object.
 * @param  {Number} opts.articleId Unigue ID of that article.
 * @param  {Number} opts.chaptersMax Maximum chapters of that article.
 * @param  {Number[]} opts.chaptersVisible Array of chapters that are visible on init.
 * @param  {Object} opts.translation translation object.
 * @example
 * onmjs.articles.chapters.fx.show({
 * 	'translation': {
 * 		'showChapters': 'Inhaltsverzeichnis einblenden', 
 * 		'hideChapters': 'Inhaltsverzeichnis ausblenden'
 * 	},
 * 	'articleId': 4701,
 * 	'chaptersMax': 4,
 * 	'chaptersVisible': [1,2,3]
 * });
 * @returns {undefined}
 */
onmjs.articles.chapters.fx.show = function (opts) {
	var ChapterUniqueID = opts.articleId,
		chapter_max = opts.chaptersMax,
		chapter_visible = opts.chaptersVisible,
		lang = opts.translation,
		i = 1,
		a = null,
		o = null;

	onmjs.articles.chapters.fx.manageCookies(ChapterUniqueID);

	for (i = 1; i <= chapter_max; i++) {

		if (i !== chapter_visible[0] &&
				i !== chapter_visible[1] &&
				i !== chapter_visible[2]) {

			a = onmjs.get('#chapter_' + i);

			a.className = '';

		}

	}

	o = onmjs.get('#KAPITEL_SLIDER');

	o.innerHTML = lang.hideChapters;

	o.href = 'javascript:onmjs.articles.chapters.fx.hide({\'articleId\': '+ChapterUniqueID+',\'chaptersMax\': '+chapter_max+', \'chaptersVisible\': ['+chapter_visible+'],\'translation\': {\'showChapters\': \''+lang.showChapters+'\',\'hideChapters\':\''+lang.hideChapters+'\'}});';

	o.className = 'KAPITEL_SLIDER_AUS';

};

/** @namespace */
onmjs.articles.sponsoredBy = {};

/*global onmjs */
/**
 * [requiredText description]
 * @param  {String} hl  Headline of the box.
 * @param  {String} txt The Text content aka description.
 * @return {void}
 */
onmjs.articles.sponsoredBy.requiredText = function (hl, txt) {

	var div = onmjs.get('#onmeda_SponPflichttext'), o = onmjs.get('#SPONLINK'), c_offset = 16, getPos, t, l;

	if (div.style.display === 'none') {

		if (navigator.appName === 'Microsoft Internet Explorer') {
			c_offset = 13;
		}
		getPos = onmjs.utils.getPosition(o);

		t = getPos.top + c_offset;
		l = getPos.left;

		onmjs.get('#onmeda_SponPflichttext_Header').innerHTML = hl;

		onmjs.get('#onmeda_SponPflichttext_Text').innerHTML = txt;

		div.style.height = 'auto';

		div.style.minHeight = '80px';

		div.style.width = '610px';

		div.style.position = 'absolute';

		div.style.backgroundColor = '#ffffff';

		div.style.top = t + 'px';

		div.style.left = l + 'px';

		div.style.display = 'block';

	} else {

		div.style.display = 'none';

	}

};

/** @namespace */
onmjs.articles.sponsoredBy.infoIcon = {};

/*global onmjs */
/**
 * Toggles the infotext when hovering the infoIcon.
 * @function
 * @return {undefined}
 */
onmjs.articles.sponsoredBy.infoIcon.toggle = function () {
	var infoTextboxTextNormal = 'Nutzerhinweis:<br/>&quot;sponsored by&quot; bedeutet, dass dieser Bereich exklusiv mit Werbung eines einzelnen Kunden belegt ist.<br/>Alle Texte werden von der neutralen und unabh&auml;ngigen Onmeda-Redaktion verfasst und qualit&auml;tsgesichert.',
		infoTextboxTextForums = 'Nutzerhinweis:<br/>&quot;sponsored by&quot; bedeutet, dass dieses Forum exklusiv mit Werbung eines einzelnen Kunden belegt ist. Onmedas Forenexperten richten sich ausschlie&szlig;lich nach ihrer klinischen Erfahrung und dem derzeitigen Stand von Wissenschaft und Forschung.',
		iconHeight = 17,
		iconWidth = 16,
		infoTextboxHeightNormal = 37,
		infoTextboxHeightForums = 47,
		infoTextboxWidthNormal = 505,
		infoTextboxWidthForums = 505,
		infoTextboxBorder = '1px solid #57A9CE',
		infoTextboxBackgroundcolor = '#ffffff',
		infoTextboxPadding = 5,
		icon = document.getElementById('SPON_INFO'),
		obj = document.getElementById('SPON_INFO_TEXT'),
		typeOfSpon = typeof (obj),
		normalMode = 1,
		wlocation = window.location,
		div = document.createElement('div'),
		curleft = 0,
		curtop = 0,
		infoTextboxHeight = '',
		infoTextboxWidth = '';

	if (typeOfSpon !== 'undefined' && obj  !== null) {

		icon.parentNode.removeChild(obj);

	} else {

		// normal mode
		if (wlocation.indexOf('onmeda.de/foren/') !== -1) {

			/* switch to normal mode
			 * (includes everything except onmeda forums)
			 */
			normalMode = 0;

		}


		div.id = 'SPON_INFO_TEXT';

		if (normalMode === 1) {

			div.innerHTML = infoTextboxTextNormal;

			infoTextboxHeight = infoTextboxHeightNormal;

			infoTextboxWidth = infoTextboxWidthNormal;


		} else {

			div.innerHTML = infoTextboxTextForums;

			infoTextboxHeight = infoTextboxHeightForums;

			infoTextboxWidth = infoTextboxWidthForums;

		}

		curtop = curtop - infoTextboxHeight + iconHeight - (infoTextboxPadding * 2);

		curleft = icon.offsetLeft;

		div.style.lineHeight = '12px';

		div.style.position = 'absolute';

		div.style.border = infoTextboxBorder;

		div.style.backgroundColor = infoTextboxBackgroundcolor;

		div.style.display = 'block';

		div.style.width = infoTextboxWidth + 'px';

		div.style.height = infoTextboxHeight + 'px';

		div.style.top = curtop + 'px';

		div.style.left = curleft + 'px';

		div.style.padding = infoTextboxPadding + 'px';

		div.onmouseout = function () {

			onmjs.articles.sponsoredBy.infoIcon.toggle();

		};

		icon.parentNode.appendChild(div);

	}
};

/** @namespace */
onmjs.box = {};

/** @namespace */
onmjs.box.facts = {};

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

onmjs.box.facts.next = function(anchor,ds) {

	var newIndex = ds.currentIndex+1;

	if (newIndex >= ds.length) {

		newIndex = 0;

	}

	var pageNumber = newIndex+1;

	var textNode = anchor.parentNode.parentNode.firstChild;

	textNode.innerHTML = ds[newIndex].text;

	var pageNumNode = anchor.parentNode.previousSibling;

	var currentOfTotal = onmjs.getTranslation(null,'factbox->currentOfTotal').replace('[current]',pageNumber).replace('[total]',ds.length);

	pageNumNode.innerHTML = currentOfTotal;

	ds.currentIndex = newIndex;

};

onmjs.box.facts.prev = function(anchor,ds) {

	var newIndex = ds.currentIndex-1;

	if (newIndex < 0) {

		newIndex = ds.length-1;

	}

	var pageNumber = newIndex+1;

	var textNode = anchor.parentNode.parentNode.firstChild;

	textNode.innerHTML = ds[newIndex].text;

	var pageNumNode = anchor.parentNode.previousSibling;

	var currentOfTotal = onmjs.getTranslation(null,'factbox->currentOfTotal').replace('[current]',pageNumber).replace('[total]',ds.length);

	pageNumNode.innerHTML = currentOfTotal;

	ds.currentIndex = newIndex;

};

/** @namespace */
onmjs.connection = {};

/**
 * This method establishes an ajax request.
 * @function
 * @param cfg the Configuration object.
 * @param {String} cfg.method The request method. POST or GET.
 * @param {String} cfg.url The url to query.
 * @param {Function} cfg.success A callback function that is executed on success.
 * @param {Function} cfg.failure A callback function that is executed on failure.
 * @param {String} cfg.params Parameters which are sent when using POST as request method. Example: cfg.params: 'id=7&title=moo'
 * @return {undefined}
 */
onmjs.connection.request = function(cfg) {

	var xmlHttp = null;

	try {

		xmlHttp = new XMLHttpRequest();

	} catch(e) {

		try {

			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

		} catch(e) {

			try {

				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");

			} catch(e) {

				xmlHttp = null;

			}

		}

	}

	if (xmlHttp) {

		cfg.method = cfg.method.toUpperCase();

		xmlHttp.open(cfg.method, cfg.url, true);

		if (cfg.oldPost) {
			xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		xmlHttp.onreadystatechange = function () {

			if (xmlHttp.readyState == 4) {

				var json = onmjs.decode.json(xmlHttp.responseText);

				if(json.success) {

					if (typeof(cfg.success) == 'function') {

						cfg.success(xmlHttp.responseText);

					}

				} else {

					if (typeof(cfg.failure) == 'function') {

						cfg.failure(xmlHttp.responseText);

					}

				}

			}

		};

		if (cfg.method == 'POST' && typeof(cfg.params) != 'undefined') {

			xmlHttp.send(cfg.params);

		} else {

			xmlHttp.send(null);

		}

	}

};

/** @namespace */
onmjs.decode = {};

/**
 * This method will decode a given json string and return a js object.
 * @function
 * @param v JSON string.
 * @returns Object based on the json string passed to it.
 */
onmjs.decode.json = function(v) {
	if (v.indexOf('{') === 0) {

			return eval( "(" + v + ")" );

		} else {

			var returnObj = new Object();

			returnObj.success = false;

			returnObj.msg = escape(v);

			return returnObj;

		}

};

/** @namespace */
onmjs.encode = {};

/** @namespace */
onmjs.img = {};

/**
 * This method preloads image(s).
 * @param {String|Array} imgs URL string or array of url strings to preload.
 * @function
 * @return {undefined}
 */
onmjs.img.preloader = function(imgs) {
	var img;
	if (typeof imgs == 'string') {
		/** @ignore */
		img = new Image();
		img.style.position = 'absolute';
		img.style.left = '-9999px';
		img.style.top = '-9999px';
		img.src = imgs;
		document.body.appendChild(img);
	} else if (typeof imgs == 'object' && imgs.length) {
		for (var i=0;i<imgs.length;i++) {
			img = new Image();
			img.style.position = 'absolute';
			img.style.left = '-9999px';
			img.style.top = '-9999px';
			img.src = imgs[i].picture;
			document.body.appendChild(img);
		}
	}
};

/**
 * Switches image src to the specified url.
 * @param  {HTMLObject} obj HTMLObject where the src should be changed to the given parameter url.
 * @param  {[type]} url The URL to the new image src.
 * @return {undefined}
 */
onmjs.img.switcher = function(obj,url) {

	obj.src = url;

};

/** @namespace */
onmjs.img.carousel = {};

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

onmjs.img.carousel.setLarge = function(configObject) {

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
;
}

/** @namespace */
onmjs.img.carousel.slideLeft = {};

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

/** @namespace */
onmjs.img.carousel.slideRight = {};

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

onmjs.img.carousel.slideRight.interval = function(id) {

	var ds = onmjs.internals.dataStores.img.carousel[id];

	var d = onmjs.get('#'+ds.id);

	if(ds.pixelSlided >= 186) {

		if(ds.firstItemLocked === true || ds.firstItemLocked === 1) {

			// @TODO: !!!
			console.log('TODO first item locked');

		// FIRST ITEM IS NOT LOCKED
		} else {

			ds.transitionLocked = false;

			ds.pixelSlided = 0;

			d.children[1].firstChild.children[1].scrollLeft = 0;

			// mark the actual item as not active
			ds.activeItem.className = 'REITER_SCROLLEN';

			// move the pointer to the now active item
		   ds.activeItem = d.children[1].firstChild.children[1].firstChild.firstChild;

			// mark the item in the stream as active (via css class)
			ds.activeItem.className = 'REITER_PRAEGNANT';

			// load the new teaser image and it's texts'
			onmjs.img.carousel.setLarge({'item_id': ds.activeItem.id});

		}

	} else {

		var amount = 2;
		var sl1 = 0;
		if (onmjs.utils.getBrowserInfo.isIE()) {

			amount = 8;

		}

		if (ds.firstItemLocked === true ||
			ds.firstItemLocked === 1) {

			sl1 = d.children[1].firstChild.children[2].scrollLeft-amount;

			d.children[1].firstChild.children[2].scrollLeft = sl1;

		} else {

			sl1 = d.children[1].firstChild.children[1].scrollLeft-amount;

			d.children[1].firstChild.children[1].scrollLeft = sl1;

		}

		ds.pixelSlided = ds.pixelSlided + amount;

		setTimeout("onmjs.img.carousel.slideRight.interval('"+ds.id+"')",1);

	}

};

/** @namespace */
onmjs.img.pictureClicker = {};

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

/** @namespace */
onmjs.init = {};

/**
 * Check if jQuery is available and if not append the jQuery script to the head.
 * @function
 * @example onmjs.init.jquery();
 */
onmjs.init.jquery = function() {

	if (typeof jQuery == 'undefined') {

		var script = document.createElement('script');

		script.type = 'text/javascript';

		script.async = true;

		script.src = this.internals.jQuery.hostingUrl;

		document.getElementsByTagName('head')[0].appendChild(script);

		this.internals.jQuery.setLoaded(true);

	}

};

/** @namespace */
onmjs.internals = {};

onmjs.internals.booleanChecker = function(value) {

	if (value === true ||
		value === false ||
		value === 1 ||
		value === 0 ||
		value === 'true' ||
		value === 'no') {

			return true;

		} else {

			return false;

		}

};

onmjs.internals.integerChecker = function(value) {

	if (typeof value == 'number') {

		return true;

	} else {

		return false;

	}

};

onmjs.internals.l18n = {

	"en": {
		"forums": {
			"thread": {
				"slideOut": "Show Thread",
				"slideIn": "Hide Thread"
			}
		},
		"chapters": {
			"show": "Show chapters",
			"hide": "Hide chapters"
		},
		"pictureClicker": {
			"currentOfTotal": "[current] of [total]"
		},
		"factbox": {
			"currentOfTotal": "[current] of [total]"
		}
	},
	"de": {
		"forums": {
			"thread": {
				"slideOut": "mehr",
				"slideIn": "Beitrag ausblenden"
			}
		},
		"chapters": {
			"show": "Inhaltsverzeichnis einblenden",
			"hide": "Inhaltsverzeichnis ausblenden"
		},
		"pictureClicker": {
			"currentOfTotal": "[current] von [total]"
		},
		"factbox": {
			"currentOfTotal": "[current] von [total]"
		}
	},
	"es": {
		"forums": {
			"thread": {
				"slideOut": "Desplegar",
				"slideIn": "Replegar"
			}
		},
		"chapters": {
			"show": "Desplegar el Ã­ndice",
			"hide": "Replegar el Ã­ndice"
		},
		"pictureClicker": {
			"currentOfTotal": "[current] de [total]"
		},
		"factbox": {
			"currentOfTotal": "[current] de [total]"
		}
	}

}

/** @namespace */
onmjs.internals.dataStores = {};

/** @namespace */
onmjs.internals.dataStores.box = {};

/** @namespace */
onmjs.internals.dataStores.box.facts = {};

/** @namespace */
onmjs.internals.dataStores.img = {};

/** @namespace */
onmjs.internals.dataStores.img.carousel = {};

/** @namespace */
onmjs.internals.dataStores.img.pictureClicker = {};

/** @namespace */
onmjs.internals.dataStores.keyEvents = {};

onmjs.internals.dataStores.keyEvents.keyMap = {
	"return": 13,
	"escape": 27,
	"leftArrow": 37,
	"upArrow": 38,
	"rightArrow": 39,
	"downArrow": 40
};

/** @namespace */
onmjs.internals.dataStores.keyEvents.keyDown = {};

/** @namespace */
onmjs.internals.dataStores.keyEvents.keyPress = {};

/** @namespace */
onmjs.internals.dataStores.keyEvents.keyUp = {};

/** @namespace */
onmjs.internals.dataStores.style = {};

/** @namespace */
onmjs.internals.dataStores.style.font = {};

onmjs.internals.dataStores.style.font.initSize = 101;

/** @namespace */
onmjs.internals.dataStores.tracker = {};

/** @namespace */
onmjs.internals.dataStores.tracker.googleAnalytics = {};

/** @namespace */
onmjs.internals.dataStores.utils = {};

/** @namespace */
onmjs.internals.dataStores.utils.autoSuggest = {};

/** @namespace */
onmjs.internals.get = {};

/** @namespace */
onmjs.internals.get.addFunction = {};

onmjs.internals.get.addFunction.children = function(index) {

	if (typeof index != 'undefined') {

		return this.childNodes[index];

	} else {

		return this.childNodes;

	}

};

onmjs.internals.get.addFunction.next = function() {
	return this.nextSibling;
};

onmjs.internals.get.addFunction.prev = function() {
	return this.previousSibling;
};

/** @namespace */
onmjs.internals.jQuery = {};

onmjs.internals.jQuery.hostingUrl = 'http://i.onmeda.de/nav/jquery.js';

onmjs.internals.jQuery.loaded = false;

onmjs.internals.jQuery.setLoaded = function(value) {

	this.internals.jQuery.loaded = value;

};

onmjs.internals.jQuery.version = '1.7.1';

/** @namespace */
onmjs.search = {};

onmjs.search.modal_result_window = function (opts) {
	var txtfield = onmjs.get('#SCHNELLSUCHE_WERT'),
		val = txtfield.value,
		response = null,
		div = document.createElement('div');

	if (onmjs.utils.autoSuggest.listIsVisible(txtfield)) {
		onmjs.utils.autoSuggest.clear(txtfield);
	}

	onmjs.connection.request({
		method: 'POST',
		url: '/suche/ajax_compact.php',
		oldPost: true,
		params: 'q=' + escape( val ),
		success: function (r) {
			response = onmjs.decode.json(r);
			if (onmjs.get('#KOMPAKTSUCHE') !== null) {
				onmjs.get('#KOMPAKTSUCHE').parentNode.removeChild(onmjs.get('#KOMPAKTSUCHE'));
			}
			div.innerHTML = response.data;
			document.body.appendChild(div);

			// hacky hacky
			div = onmjs.get('#KOMPAKTSUCHE').cloneNode(true);
			onmjs.get('#KOMPAKTSUCHE').parentNode.parentNode.removeChild(onmjs.get('#KOMPAKTSUCHE').parentNode);

			document.body.appendChild(div);
		},
		failure: function (r) {

		}
	});

	return false;
};

/** @namespace */
onmjs.social = {};

/** @namespace */
onmjs.social.widgets = {};

/** @namespace */
onmjs.social.widgets.facebook = {};

/**
 * Renders the likebox of facebook.
 * @function
 * @param {Object} opts Configuration object.
 * @param {String} opts.renderTo The id of a dom element. The Like-box will appear in this element.
 * @param {Number} [opts.appId=209818542451223] The Application ID of your Facebook app used to create this facebook likebox.
 * @param {String} [opts.url=location.href] The url to like.
 * @example
 * onmjs.social.widgets.facebook.like({
 * 	renderTo: 'FACEBOOK_EMPFEHLEN', 
 * 	url: 'http%3A%2F%2Fwww.onmeda.de%2Fratgeber%2Fkinderwunsch%2Fungewollt_kinderlos%2Feisprung.html'
 * });
 */
onmjs.social.widgets.facebook.like = function(opts) {
	var cfgObject = opts,
		fblike = document.createElement('div'),
		likeurl = location.href,
		appId = 209818542451223;


	if (typeof cfgObject.appId != 'undefined' &&
		typeof cfgObject.appId == 'string' &&
		cfgObject.appId !== '') {

		appId = cfgObject.appId;

	}

	if (typeof cfgObject.url != 'undefined' &&
		cfgObject.url !== '') {

		likeurl = cfgObject.url;

	}

	likeurl = escape(likeurl);

	var iframe = '<iframe src="//www.facebook.com/plugins/like.php?href=' + likeurl + '&amp;send=false&amp;layout=button_count&amp;width=120&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=' + appId + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe>';

	onmjs.get('#'+cfgObject.renderTo).innerHTML = iframe;

};

/** @namespace */
onmjs.style = {};

/** @namespace */
onmjs.style.font = {};

/** @namespace */
onmjs.style.font.size = {};

onmjs.style.font.size.init = function() {
	var ds =  onmjs.internals.dataStores.style.font;

	var bodyFS = document.getElementsByTagName('body')[0].style.fontSize;

	var cookieSize = onmjs.style.font.size.cookie.get();

	if (cookieSize !== false) {

		ds.initSize = cookieSize;

	}

	document.getElementsByTagName('body')[0].style.fontSize = ds.initSize + '%';

};

/**
 * Sets the body style font size. Default value is 101.
 * Possible values in percent are: 81, 87, 93, 101, 110, 120, 130.
 * @function
 * @param {String} mode '+' or '-' will increase or decrease the fontsize
 * @example onmjs.style.font.size.set('+'); // fontsize now 110%
 * onmjs.style.font.size.set('+'); // fontsie now 120%
 */
onmjs.style.font.size.set = function(mode) {

	var ds =  onmjs.internals.dataStores.style.font;

	var sizes = new Array('81','87','93','101','110','120','130');

	var intialsize = onmjs.style.font.size.cookie.get();


	if(intialsize === false) {

		intialsize = 101;

	}

	if (mode == '+') {

		for (i=0; i< sizes.length; i++) {

			if (sizes[i] == intialsize){

				if (i < sizes.length-1) {

					document.getElementsByTagName('body')[0].style.fontSize = sizes[i+1] + '%';

					onmjs.style.font.size.cookie.set(sizes[i+1]);

					ds.initSize = sizes[i+1];

					break;

				}

			}

		}

	} else if(mode == '-') { // decrement mode

		for (i=sizes.length-1; i>=0; i--) {

			if (sizes[i] == intialsize) {

				if (i > 0) {

					document.getElementsByTagName('body')[0].style.fontSize = sizes[i-1] + '%';

					onmjs.style.font.size.cookie.set(sizes[i-1]);

					ds.initSize = sizes[i-1];

					break;

				}

			}

		}

	} else {

		bodyFS = sizes[1] + '%';

		onm_fontsize.setCookie(sizes[1]);

		ds.initSize = sizes[1];
	}

};

/** @namespace */
onmjs.style.font.size.cookie = {};

onmjs.style.font.size.cookie.get = function() {

	var cookieName = 'onmfontsize';

	var theCookie = " " + document.cookie;

	var ind = theCookie.indexOf(" "+cookieName+"=");


	if (ind==-1) {

		ind=theCookie.indexOf(";"+cookieName+"=");

	}


	if (ind==-1 || cookieName==="") {

		return false;

	}

	var ind1 = theCookie.indexOf(";", ind+1);


	if (ind1==-1) {

		ind1=theCookie.length;

	}

	var returnvalue = parseInt(unescape(theCookie.substring(ind+cookieName.length+2,ind1)),10);

	return returnvalue;

};

onmjs.style.font.size.cookie.set = function(fontsize) {
	//	seconds minutes hours days years
	var dateT = new Date();

	dateT.setTime(dateT.getTime()+(3600*1000*24*365*1));

	// cookie will expire in 1 year
	var expires = 'expires='+dateT.toGMTString();

	document.cookie = 'onmfontsize=' + fontsize + ';' + expires+';path=/';

};

/** @namespace */
onmjs.tracker = {};

/** @namespace */
onmjs.tracker.googleAnalytics = {};

onmjs.tracker.googleAnalytics.getAccount = function () {

	var acc = onmjs.internals.dataStores.tracker.googleAnalytics.account;

	return acc;

};

onmjs.tracker.googleAnalytics.setAccount = function (gaAccount) {

	onmjs.internals.dataStores.tracker.googleAnalytics.account = gaAccount;

};

/**
 * Will send a request to Google Analytics
 *
 * Usage:
 *
 * onmjs.tracker.googleAnalytics.track({
 *	"gaCode": "galleries/moo.html",
 *	"gaAccount": "UA-115586-14" // onmeda.es default account
 * })
 */
onmjs.tracker.googleAnalytics.track = function (opts) {

	var ds = onmjs.internals.dataStores.tracker.googleAnalytics;
	var ga = onmjs.tracker.googleAnalytics;

	if(!opts.gaCode) return;

	var gaCode = opts.gaCode;

	if (typeof ds.pageTracker == 'undefined') {


		if (typeof opts.gaAccount == 'undefined') { // fallback


			if (typeof ga.getAccount() == 'undefined') {


				ga.setAccount('UA-115586-6');

			}


		} else {


			ga.setAccount( opts.gaAccount );

		}

		ds.pageTracker = _gat._getTracker( ga.getAccount() );

	}


	ds.pageTracker._trackPageview(gaCode);

};

/** @namespace */
onmjs.tracker.ivw = {};

/**
 * Will append an IVW Counterpixel to document.body
 * If the param 'account' is not set,
 * the default 'medworld' will be used.
 *
 * The appended img will be removed from document.body as soon
 * as it has loaded.
 *
 * Caching is supressed by adding a timestamp to the image path.
 *
 * You need to supply a valid IVW-'tag'.
 *
 * Usage:
 *
 * onmjs.tracker.ivw.track({
 *	"account": "medworld",
 *	"tag": "gally-13370"
 * })
 *
 */
onmjs.tracker.ivw.track = function (cfgObject) {
	// this domains are excluded from tracking
	var excludedDomains = new Array('www.onmeda.es');

	if ( !cfgObject ) return;

	// check if current domain is excluded
	if ( location.href.indexOf(excludedDomains) != -1 ) return;

	if ( !cfgObject.tag ) return;

	var account = 'medworld';

	if (typeof cfgObject.account != 'undefined') {

		account = cfgObject.account;

	}

	var m = 'http://'+account+'.ivwbox.de/cgi-bin/ivw/CP/';

	var img = document.createElement('img');

	img.src = m + cfgObject.tag + ';?t='+ onmjs.utils.getUnixTimestamp()+ '&r=' + window.location.href;

	img.style.position = 'absolute';
	img.style.width = '1px';
	img.style.height = '1px';
	img.style.top = '-20px';
	img.style.left = '-20px';
	/** @ignore */
	img.onload = function() {

		document.body.removeChild(this);

	};

	document.body.appendChild(img);

	onmjs.ads.refreshIframes('17438');
};

/** @namespace */
onmjs.utils = {};

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

/**
 * Copies a value from elem1 to elem2.
 * @function
 * @param {Object} [from] [Element from which the value should be copied.]
 * @param {Object} [to] [Element where the value should be copied to.]
 * @param {String} [keyName] [Name of the key that should be copied.]
 * @example
 * var anchor = onmjs.get('#anchor1'), anchor2 = onmjs.get('#anchor2');
 * // copy href key and value from anchor to anchor2
 * onmjs.utils.copyValue(anchor,anchor2,'href');
 */
onmjs.utils.copyValue = function(from, to, keyName) {

	if (from && to && from[keyName]) {

		if(typeof to.setAttribute == 'function') {

			to.setAttribute(keyName, from.getAttribute(keyName));

		} else {

			to[keyName] = from[keyName];

		}

	} else {

		return null;

	}

	return false;

};

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

/**
 * Returns the length of an object
 * @function
 * @param {Object} obj Any object.
 * @example
 * var obj = {
 * 	title: "moo2",
 * 	description: "test blubb",
 * 	items: [{title: "test 1"},{title: "test 2"}]
 * };
 * console.log('obj length is ' + onmjs.utils.getObjectLength(obj));
 */
onmjs.utils.getObjectLength = function(obj) {
	var count = 0;

	for(var prop in obj) {

		if(obj.hasOwnProperty(prop)) count = count + 1;

	}

	return count;
};

/**
 * Gets the position of any dom element.
 * @function
 * @param {Object} obj The DOM element to guess the position for.
 * @returns {Object} A object with the offsets like: {top: xxx, left: xxx}
 * @example var pos = onmjs.utils.getPosition(onmjs.get('#moo2'));
 * console.log('DIV with ID moo2 position info -> left: '
 * 	 + pos.left + ' top: ' + pos.top);
 */
onmjs.utils.getPosition = function(obj) {

	var o = null;

	if (typeof obj == 'string') {

		o = document.getElementById(obj);

	} else if (typeof obj == 'object') {

		o = obj;

	} else {

		return false;
	}


	var l = o.offsetLeft;

	var t = o.offsetTop;

	/*jsl:ignore*/
	while (o=o.offsetParent) {

		l += o.offsetLeft;

	}
	/*jsl:end*/
	if (typeof obj == 'string') {

		o = document.getElementById(obj);

	} else if (typeof obj == 'object') {

		o = obj;

	} else {

		return false;

	}

	/*jsl:ignore*/
	while (o=o.offsetParent) {

		t += o.offsetTop;

	}
	/*jsl:end*/

	return {'top': t, 'left': l};

};

/**
 * Returns the current window's scroll position.
 * @function
 * @returns {Object} Scrollposition Object like {top: xxx, left: xxx}
 * @example var sp = onmjs.utils.getScrollPosition();
 * console.log('Scroll position is -> left: ' + sp.left + ' & top: ' +sp.top);
 */
onmjs.utils.getScrollPosition = function() {

	var scrOfX = 0;
	var scrOfY = 0;

	if ( typeof( window.pageYOffset ) == 'number' ) {

		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;

	} else if ( document.body &&
		( document.body.scrollLeft || document.body.scrollTop ) ) {

		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;

	} else if ( document.documentElement &&
		( document.documentElement.scrollLeft ||
		document.documentElement.scrollTop ) ) {

		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;

	}

	return {'top': scrOfY, 'left': scrOfX};

};

/**
 * Returns the translation string that is saved in a translation dataStore of onm.js.
 * @function
 * @param {String} [lang] [Language key. If set to null onmjs will determine the language based on the browsers language.]
 * @param {String} [key] [This key is used to get the right translation.]
 * @example
 *	var currentOfTotal = onmjs.getTranslation(null,'pictureClicker->currentOfTotal').replace('[current]',currentPageNumber).replace('[total]',ds.itemLength);
 */
onmjs.utils.getTranslation = function(lang, key){

	if (lang === null) {
		lang = onmjs.utils.getBrowserInfo.getLanguage();
	}

	var ds = onmjs.internals.l18n;
	if ( typeof ds[lang] == 'undefined') {
		ds['en'];
	} else {
		ds = ds[lang];
	}

	keys = key.split('->');

	var ref = ds;

	for (var i=0;i<keys.length;i++) {
		ref = ref[keys[i]];
	}

	return ref;
};

/**
 * Returns the unix timestamp.
 * @function
 * @returns {Number} The unix timestamp.
 * @example console.log('Current unix timestamp is: '+ onmjs.utils.getUnixTimestamp());
 */
onmjs.utils.getUnixTimestamp = function() {

	return Math.round(new Date().getTime() / 1000);

};

/**
 * Returns the user-viewport.
 * @function
 * @returns {Object} Returns width and height like {width: xxx, height: xxx}
 * @example var uvp = onmjs.utils.getViewportDimension();
 * console.log('viewport height is: ' + uvp.height + ' and width is: ' + uvp.width);
 */
onmjs.utils.getViewportDimension = function() {

	var e = window;
	var a = 'inner';

	if ( !( 'innerWidth' in window ) ) {
		a = 'client';
		e = document.documentElement || document.body;
	}

	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };

};

/**
 * Inserts a node after another node.
 * @function
 * @param parentNode The parent node.
 * @param newNode The node that should be inserted after referenceNode.
 * @param referenceNode newNode will be inserted after this node.
 * @example &lt;div id="moo1"&gt;&lt;span&gt;moo2&lt;/span&gt;&ltdiv&gt;&lt;/div&gt;&lt/div&gt;<br/>
 * &lt;script&gt;<br/>
 * var newNode = document.createElement('h1');<br/>
 * newNode.innerHTML = 'The most mooish title ever!';<br/>
 * onmjs.utils.insertAfter(onmjs.get('#moo1'),newNode,onmjs.get('moo1').firstChild);<br/>
 * &lt;/script&gt;
 */
onmjs.utils.insertAfter = function(parentNode, newNode, referenceNode) {

	parentNode.insertBefore(newNode, referenceNode.nextSibling);

};

/**
 * Encodes or decodes a string from or to ROT13.
 * @param {String} v The String to encode or decode.
 * @returns {String} ROT13 encoded or decoded string.
 */
onmjs.utils.rot13 = function(v) {
	return v.replace(/[a-zA-Z]/g, function(c){
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
	});
};

/**
 * Reverts a string
 * @param {String} str String to be reverted.
 * @returns {String} Reverted string.
 */
onmjs.utils.string_reverse = function(str) {
	return str.split("").reverse().join("");
};

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

/**
 * Decodes any given valid UTF-8 string to ISO.
 * @function
 * @param {String} str A valid UTF-8 string.
 * @returns {String} ISO decoded string.
 * @example var utf8Str = 'mÃ¼sli';
 * console.log(onmjs.utils.utf8_decode(utf8Str));
 */
onmjs.utils.utf8_decode = function(str) {
	return decodeURIComponent(str);
};

/**
 * Encodes any given valid ISO string to UTF-8.
 * @function
 * @param {String} str A valid ISO string.
 * @return {String} UTF-8 encoded string.
 * @example var isoStr = 'mÃ¼sli';
 * console.log(onmjs.utils.utf8_encode(isoStr));
 */
onmjs.utils.utf8_encode = function(str) {
	return encodeURIComponent(str);
};

/** @namespace */
onmjs.utils.autoSuggest = {};

onmjs.utils.autoSuggest.activeItem = null;

onmjs.utils.autoSuggest.clear = function(obj) {
	if (onmjs.get('#as_'+obj.id)) {

		var acList = onmjs.get('#as_'+obj.id);

	} else {

		return;

	}

	if (acList &&
		acList.id == 'as_'+obj.id) {

	   acList.parentNode.removeChild(acList);

	}

	onmjs.utils.autoSuggest.activeItem = null;
};

onmjs.utils.autoSuggest.createList = function(opts) {
	// reference node
	var rNode = onmjs.get('#' + opts.id);

	var value =  rNode.value;

	if (value === '') {

		// clear results
		onmjs.utils.autoSuggest.clear(rNode);

		return;

	}


	// position info
	var positionInfo = onmjs.utils.getPosition(rNode);


	// new node
	var nNode = document.createElement('ul');

	nNode.id = 'as_'+opts.id;

	if (opts.styleConfig &&
		opts.styleConfig.ulClassName) {

		nNode.className = opts.styleConfig.ulClassName;

	}


	nNode.style.position = 'absolute';

	nNode.style.zIndex = '9999';

	nNode.style.top = positionInfo.top+12+'px';

	nNode.style.left = positionInfo.left+'px';


	// parent node
	var pNode = onmjs.get('#' + opts.id).parentNode;

	// replace placeholder
	var qurl = opts.url.replace("[AUTOSUGGEST]", onmjs.utils.utf8_encode(value));

	onmjs.connection.request({

		method: opts.method,

		url: qurl,

		params: opts.param,

		success: function(r) {

			var json = onmjs.decode.json(r);

			onmjs.utils.autoSuggest.timer = false;

			for (var i=0;i<json.items.length;i++) {

				// append new node items
				var lNode = document.createElement('li');

				lNode['data-value'] = json.items[i].value;

				lNode.innerHTML = json.items[i].displayText;

				/** @ignore */
				lNode.onclick = function() {

					rNode.value = this['data-value'];

					onmjs.utils.autoSuggest.clear(rNode);

					onmjs.utils.autoSuggest.timer = false;

					rNode.focus();

				};


				nNode.appendChild(lNode);

				// set new timeout
				onmjs.utils.autoSuggest.setTimeout(rNode.id);

			}


			// clear results
			onmjs.utils.autoSuggest.clear(rNode);

			// add new results
			document.body.appendChild(nNode);

		},

		failure: function(r) {

			var json = onmjs.decode.json(r);

			onmjs.utils.autoSuggest.timer = false;

			if (json.message &&
				json.message == 'No matching items found!') {

				// clear results
				onmjs.utils.autoSuggest.clear(rNode);

			}

		}

	});
};

onmjs.utils.autoSuggest.getSelectedItemText = function(textfield) {

	if (!onmjs.utils.autoSuggest.listIsVisible(textfield) || onmjs.utils.autoSuggest.activeItem === null) {

		return false;

	}

	return onmjs.utils.autoSuggest.activeItem['data-value'];

};

/**
 * This function create an instance of an autoSuggest box.<br/>
 * The box will send an ajax request after a brief delay to fetch <br/>
 * results based on the input,<br/>
 * then it'll render the fetched results in a list under the input field.<br/>
 * You can select the suggested results from the list by <br/>
 * navigating with the up and down keys and pressing enter.<br/>
 * The server needs to respond with a valid json like so:<br/>
 * <code>{success: true, items: [{displayText: "&ltstrong&gt;moo&lt;/strong&gt; 2", value: "moo 2"},{displayText: "&lt;strong&gt;moo&lt;/strong&gt; 3", value: "moo 3"}]}</code><br/>
 * or if no matching elements could be found:<br/>
 * <code>{success:false}</code><br/>
 * The autoSuggest textfield needs to be inside a form element,<br/>
 * because a keypress enter event without a selected element from<br/>
 * the autoSuggest list will bubble up until it finds a form and then<br/>
 * submit it.
 * @function
 * @param {Object} opts Configuration object.
 * @param {String} opts.id Id of the textfield where you want the autoSuggest box being bound to.
 * @param {Number} [opts.delay=500] Time in Milliseconds after last keypress before the request is sent to the server.
 * @param {String} opts.method POST or GET.
 * @param {String} opts.url The URL to query. The [AUTOSUGGEST] part will be automatically replaced by the value of the textfield.
 * @param {String} opts.responseType json or xml.
 * @param {Object} opts.styleConfig Style Configuration object.
 * @param {String} opts.styleConfig.ulClassName The CSS classname that should be appended to the generated ul tag.
 * @example
 * onmjs.utils.autoSuggest.init({
 * 	id: 'SCHNELLSUCHE_WERT',
 * 	method: 'GET',
 * 	url: '/suche/search_service.php?action='
 * 		+ 'suggest&resultType=json&q=[AUTOSUGGEST]',
 * 	delay: 500,
 * 	responseType: 'json',
 * 	styleConfig: {
 * 		ulClassName: 'autosuggest'
 * 	}
 * });
 */
onmjs.utils.autoSuggest.init = function(opts) {

	var textfield = onmjs.get('#' + opts.id);

	// init dataStore
	onmjs.internals.dataStores.utils.autoSuggest[opts.id] = {};
	onmjs.internals.dataStores.utils.autoSuggest[opts.id] = opts;

	if (opts.timeout) {

		onmjs.internals.dataStores.utils.autoSuggest[opts.id].timeoutInMilliseconds = opts.timeout;

	}

	// disable autocomplete
	textfield.autocomplete = 'off';

	textfield.onblur = function() {

		// maybe we need to hide the box here
		//onmjs.utils.autoSuggest.clear(this);

	};

	textfield.onkeypress = onmjs.utils.autoSuggest.stopRKey;

	textfield.onkeydown = function(evt) {

		if (!evt) {
			evt = window.event;
		}

		// if not navigating with key arrow up or down
		if (!onmjs.utils.autoSuggest.keyNavigation(evt,this)) {

			// setting default delay
			var delay = 500;

			// getting custom delay
			if (typeof opts.delay != 'undefined') {

				delay = opts.delay;

			}

			clearTimeout(onmjs.utils.autoSuggest.timer);

			onmjs.utils.autoSuggest.timer = false;

			onmjs.utils.autoSuggest.timer = setTimeout(function(){onmjs.utils.autoSuggest.createList(opts);},delay);

		}

	};
};

onmjs.utils.autoSuggest.keyNavigation = function(evt,textfield) {

	var keyCode = evt.keyCode;
	var keyMap = onmjs.internals.dataStores.keyEvents.keyMap;

	onmjs.utils.autoSuggest.setTimeout(textfield.id);

	// Escape key pressed - hide/destroy the suggest-box
	if (keyCode == keyMap['escape']) {

		onmjs.utils.autoSuggest.clear(textfield);

		return true;

	}

	// enter pressed
	if (keyCode == keyMap['return']) {

		var value = onmjs.utils.autoSuggest.getSelectedItemText(textfield);

		if (value) {

			textfield.value = value;

			onmjs.utils.autoSuggest.clear(textfield);

			clearTimeout(onmjs.utils.autoSuggest.timer);

			onmjs.utils.autoSuggest.timer=null;

			return true;

		// submit form
		} else {

			var pNode = textfield.parentNode;

			while (pNode.nodeName.toLowerCase() != 'form') {
				pNode = pNode.parentNode;
			}

			onmjs.utils.autoSuggest.clear(textfield);

			clearTimeout(onmjs.utils.autoSuggest.timer);

			onmjs.utils.autoSuggest.timer=null;

			if (typeof onmjs.internals.dataStores.utils.autoSuggest[textfield.id].onsubmit === 'function') {
				onmjs.internals.dataStores.utils.autoSuggest[textfield.id].onsubmit(); return true;
			} else {
				// we are submitting the form now
				pNode.submit(); return true;
			}
		}

	}

	//up or down arrows used and list is visible
	if ((keyCode == keyMap['upArrow'] || keyCode == keyMap['downArrow']) && onmjs.utils.autoSuggest.listIsVisible(textfield)) {

		if (keyCode == keyMap['upArrow']) {

			onmjs.utils.autoSuggest.moveSelection('up', textfield);

		} else {

			onmjs.utils.autoSuggest.moveSelection('down', textfield);

		}

		return true;

	} else {

		return false;

	}

};

onmjs.utils.autoSuggest.listIsVisible = function(textfield) {

	if (document.getElementById('as_'+textfield.id)) {

		return true;

	} else {

		return false;

	}

};

onmjs.utils.autoSuggest.moveSelection = function(dir,textfield) {

	var list = onmjs.get('#as_'+textfield.id);

	var items = list.childNodes;

	var length = items.length;


	var activeNode = null;

	var nextActiveNode = null;

	for(var i=0;i<length;i++) {


		if (items[i].className=='active') {

			activeNode = items[i];

			if (dir=='up') {

				if(activeNode.previousSibling !== null) {

					nextActiveNode = items[i].previousSibling;

				} else {

					nextActiveNode = items[length-1];

				}

			} else {

				if (activeNode.nextSibling !== null) {

					nextActiveNode = items[i].nextSibling;

				} else {

					nextActiveNode = items[0];

				}

			}

		}

	}

	if (activeNode !== null && nextActiveNode !== null) {

		activeNode.className='';

		nextActiveNode.className='active';

		onmjs.utils.autoSuggest.activeItem = nextActiveNode;


	// fallback if nothing is selected
	} else {

		onmjs.utils.autoSuggest.resetActiveItems(textfield);

		items[0].className = 'active';

		onmjs.utils.autoSuggest.activeItem = items[0];

	}


};

onmjs.utils.autoSuggest.resetActiveItems = function(textfield) {

	var list = textfield.nextSibling;

	var items = textfield.children;

	for (var i=0;items.length;i++) {

		items[i].className='';

	}

	onmjs.utils.autoSuggest.activeItem = null;

};

onmjs.utils.autoSuggest.setTimeout = function(textboxId) {
	//check if timeout is user-defined

	var tms = onmjs.internals.dataStores.utils.autoSuggest[textboxId].timeoutInMilliseconds;

	if( !tms ) {

		tms = 2500;

	}


	// clear timeout
	clearTimeout(onmjs.internals.dataStores.utils.autoSuggest[textboxId].timeout);
	onmjs.internals.dataStores.utils.autoSuggest[textboxId].timeout = null;

	// set timeout
	onmjs.internals.dataStores.utils.autoSuggest[textboxId].timeout = setTimeout("onmjs.utils.autoSuggest.clear(onmjs.get('#"+textboxId+"'))", tms);
};

onmjs.utils.autoSuggest.stopRKey = function(evt) {
	evt = (evt) ? evt : ((event) ? event : null);

	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);

	if ((evt.keyCode == 13) && (node.type=="text"))  {
		return false;
	}
};

onmjs.utils.autoSuggest.timer = false;

/** @namespace */
onmjs.utils.getBrowserInfo = {};

/**
 * Returns the browsers 2-letter language code. For german this would be 'de'.
 * @function
 * @returns {String} 2-letter language code of the browser.
 * @example var bi = onmjs.utils.getBrowserInfo;
 * if (bi.getLanguage() === 'de') { alert('Hello german knackwurst'); }
 */
onmjs.utils.getBrowserInfo.getLanguage = function() {

	var navLang = navigator.language || navigator.browserLanguage;

	var str = navLang.slice(0,2);

	return str.toLowerCase();

};

/**
 * This is currently only working for IE browsers. But do not rely on only IE specific results, because this will change in upcoming releases.
 * @function
 * @return {Number} Version number of browser.
 * @example var bi = onmjs.utils.getBrowserInfo;
 * if(bi.isIE() && bi.getVersionNumber() <= 7) {
 * 	alert('Update your browser, dude!');
 * }
 */
onmjs.utils.getBrowserInfo.getVersionNumber = function() {
	var v = 0;
	if (this.utils.getBrowserInfo.sIE()) {
		v = parseFloat(navigator.appVersion.split("MSIE")[1]);
	}
	return v;
};

/**
 * Check for Internet Explorer.
 * @function
 * @returns {Boolean} true if browser is some sort of Internet Explorer and false if it is not.
 * @example var bi = onmjs.utils.getBrowserInfo;
 * if (bi.isIE() { alert('Hello, you are using an outdated Browser, please upgrade!'); }
 */
onmjs.utils.getBrowserInfo.isIE = function() {

	if (navigator.appVersion.indexOf("MSIE") != -1) {

		return true;

	}

	return false;

};

/** @namespace */
onmjs.window = {};

/*global onmjs, console */
onmjs.window.open = function (opts) {
	var width = 'width=320',
		height ='height=240',
		resizable ='resizable=0',
		scrollbars = 'scrollbars=0',
		opts2,
		win,
		windowId = '';

	if (!opts.url) {

		console.log('onmjs.window.open(): Configuration object does not contain a key url!');

		return;

	}


	if (opts.id) {

		windowId = opts.id;

	}

	if (opts.scrollbars) {

		scrollbars = 'scrollbars=1';

	}


	if (opts.width) {

		width = 'width=' + opts.width;

	}


	if (opts.height) {

		height = 'height=' + opts.height;

	}


	if (opts.resizable) {

		if (this.internals.booleanChecker()) {

			resizable = 'resizable=' + opts.resizable;

		} else {

			console.log('onmjs.window.open(): Configuration object with key resizable does not contain valid value!');

		}

	}


	opts2 = width + ',' + height + ',' + resizable + ',' + scrollbars;


	win = window.open(opts.url, windowId, opts2);


	if (win.window.focus) {


		win.window.focus();


	}
};

