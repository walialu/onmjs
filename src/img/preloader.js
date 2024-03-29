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