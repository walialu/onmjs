/**
 * Sets the body style font size. Default value is 101.
 * Possible values in percent are: 81, 87, 93, 101, 110, 120, 130.
 * @function
 * @param {String} mode '+' or '-' will increase or decrease the fontsize
 * @example onmjs.style.font.size.set('+'); // fontsize now 110%
 * onmjs.style.font.size.set('+'); // fontsie now 120%
 */
onmjs.style.font.size.set = function(mode) {

	var ds =  onmjs.internals.dataStores.style.font;

	var sizes = new Array('81','87','93','101','110','120','130');

	var intialsize = onmjs.style.font.size.cookie.get();


	if(intialsize === false) {

		intialsize = 101;

	}

	if (mode == '+') {

		for (i=0; i< sizes.length; i++) {

			if (sizes[i] == intialsize){

				if (i < sizes.length-1) {

					document.getElementsByTagName('body')[0].style.fontSize = sizes[i+1] + '%';

					onmjs.style.font.size.cookie.set(sizes[i+1]);

					ds.initSize = sizes[i+1];

					break;

				}

			}

		}

	} else if(mode == '-') { // decrement mode

		for (i=sizes.length-1; i>=0; i--) {

			if (sizes[i] == intialsize) {

				if (i > 0) {

					document.getElementsByTagName('body')[0].style.fontSize = sizes[i-1] + '%';

					onmjs.style.font.size.cookie.set(sizes[i-1]);

					ds.initSize = sizes[i-1];

					break;

				}

			}

		}

	} else {

		bodyFS = sizes[1] + '%';

		onm_fontsize.setCookie(sizes[1]);

		ds.initSize = sizes[1];
	}

};