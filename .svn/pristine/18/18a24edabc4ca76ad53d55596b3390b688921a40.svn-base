/*global onmjs, console */
onmjs.window.open = function (opts) {
	var width,
		height,
		resizable,
		scrollbars,
		opts2,
		win,
		windowId;

	if (!opts.url) {

		console.log('onmjs.window.open(): Configuration object does not contain a key url!');

		return;

	}


	if (opts.id) {

		windowId = opts.id;

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


	opts2 = width + height + resizable;


	win = window.open(opts.url, windowId, opts2);


	if (win.window.focus) {


		win.window.focus();


	}
};