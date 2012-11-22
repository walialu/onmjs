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