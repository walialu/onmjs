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