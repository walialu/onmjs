/*global onmjs, console */
onmjs.window.open = function (opts) {
	var width = 'width=320',
		height ='height=240',
		resizable ='resizable=0',
		scrollbars = 'scrollbars=0',
		opts2,
		win,
		windowId = '';

	if (!opts.url) {

		console.log('onmjs.window.open(): Configuration object does not contain a key url!');

		return;

	}


	if (opts.id) {

		windowId = opts.id;

	}

	if (opts.scrollbars) {

		scrollbars = 'scrollbars=1';

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


	opts2 = width + ',' + height + ',' + resizable + ',' + scrollbars;


	win = window.open(opts.url, windowId, opts2);


	if (win.window.focus) {


		win.window.focus();


	}
};