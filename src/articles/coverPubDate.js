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