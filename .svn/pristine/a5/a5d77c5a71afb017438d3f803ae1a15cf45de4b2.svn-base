onmjs.style.font.size.init = function() {
	var ds =  onmjs.internals.dataStores.style.font;

	var bodyFS = document.getElementsByTagName('body')[0].style.fontSize;

	var cookieSize = onmjs.style.font.size.cookie.get();

	if (cookieSize !== false) {

		ds.initSize = cookieSize;

	}

	document.getElementsByTagName('body')[0].style.fontSize = ds.initSize + '%';

};