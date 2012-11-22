onmjs.style.font.size.cookie.set = function(fontsize) {
	//	seconds minutes hours days years
	var dateT = new Date();

	dateT.setTime(dateT.getTime()+(3600*1000*24*365*1));

	// cookie will expire in 1 year
	var expires = 'expires='+dateT.toGMTString();

	document.cookie = 'onmfontsize=' + fontsize + ';' + expires+';path=/';

};