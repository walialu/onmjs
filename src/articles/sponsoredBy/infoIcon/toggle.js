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
		wlocation = window.location.href,
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