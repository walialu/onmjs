/**
 * <p>Some function for the used for showing wallpaper ads.</p>
 *
 * <p>I just changed the syntax a bit, but the original src was supplied
 * by Oliver Kuhn and possibly written by Carina Vier</p>
 * @function
 * @param options Configuration object
 * @param {String} options.color A background color style like #ff0000.
 * @param {String} options.imgURL Image URL to a background image.
 * @param {String} options.imgRepeat CSS-Style definitions for background-repeat.
 * @param {String} options.imgPosition CSS-Style definitions for background-position.
 * @param {String} options.link Click url.
 * @author Carina Vier (carina.vier@gofeminin.de)
 */
onmjs.ads.wallpaper = function( options ) {

	var IE7 = false ;
	var bgColorStyle,bgImageStyle,bgCursorStyle = '';
	var posX,posY = 0;

	if ( navigator.userAgent.indexOf('MSIE 7.0') != -1 ||
		( navigator.userAgent.indexOf('MSIE 8.0') != -1 &&
		document.documentMode == '7' ) ) {

		IE7 = true ;

	}

	if ( options.color ) {

		bgColorStyle = 'background-color:' + options.color + ';' ;

	}

	if ( options.imgURL ) {

		bgImageStyle = 'background-image:url(' + options.imgURL + ');' ;

		if ( options.imgRepeat ) {

			bgImageStyle += 'background-repeat:'  + options.imgRepeat + ';' ;

		}

		if ( options.imgPosition ) {

			var pos_einzeln = options.imgPosition.split(' ') ;

			posX = parseInt( pos_einzeln[0], 10 ) ;

			posY = parseInt( pos_einzeln[1], 10 ) ;

		}

		if (IE7) {

			posX = posX += 800 ;

		}

		bgImageStyle += 'background-position:' + posX + 'px ' + posY + 'px;';

	} else {

		bgImageStyle = '';

	}

	if (options.link) {

		bgCursorStyle = 'cursor:pointer;';

	}

	var styles = '#WALLPAPER {' + bgCursorStyle + bgColorStyle + bgImageStyle + '}';

	var htmlHead = document.getElementsByTagName('head')[0];

	var styleElement = document.createElement('style');

	styleElement.setAttribute('type', 'text/css');


	if (styleElement.styleSheet) { // IE < 9

		styleElement.styleSheet.cssText = styles;

	} else {

		styleElement.appendChild(document.createTextNode(styles));

	}

	htmlHead.appendChild(styleElement);

	/**
	* @TODO: This overwrites any existing window.onload events
	* Talk to someone if we can/should change this
	* /marco
	*/

	if(options.link) {

		window.onload = function() {

			//quickfix
			//onmjs.get('#WALLPAPER').style.height = onmjs.get('#WEBSEITE').offsetHeight + 'px';

			document.getElementById('WALLPAPER').onclick = function() {

				window.open(options.link);

			};

		};

	}

};