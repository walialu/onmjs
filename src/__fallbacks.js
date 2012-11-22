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