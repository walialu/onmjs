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