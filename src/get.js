/**
 * <p>This is inspired by jQuery and grabbed from the gaia.js / h4kr.js.</p>
 *
 * <p>It is a kind of wrapper for getElementById, getElementsByClassName and getElementsByTagName
 * The target param can be an ID (#idMoo123), a className (.thisClassHasAName)
 * or a tagName (h1).</p>
 *
 * <p>If it is a className or a tagName the function will return an arrayset of
 * matching elements.</p>
 *
 *
 * @example var div_with_id_moo2 = onmjs.get('#moo2'); // will return the div with the id moo2
 *
 * console.log(div_with_id_moo2); // just see for yourself
 *
 * @param {String|Object} target Can be a ID like #moo2 or a class name like .moo2 or a object like document.
 *
 * @returns {Object|Array|null} Object or Array if Element(s) exists in scope or null if element could not be found.
 */
onmjs.get = function(target) {

	var ref = document;
	var sa,elems,i2;

	if (typeof target == 'string') {

		if (target.indexOf(' ') !== false) {

			target = target.split(' ') ;

		} else {

			target[0] = target ;

		}

		for (var i=0;i<target.length;i++) {

			if (target[i].indexOf('#') !== false) { // searching for ID

				if (target[i].indexOf('#') === 0) {

					return ref.getElementById( target[i].substring(1) ) ;


				} else {

					sa = target[i].split('#') ;

					elems = ref.getElementsByTagName( sa[0] ) ;

					for ( i2=0 ; i2 < elems.length ; i2++ ) {

						if ( elems[i].id == sa[1] ) {

						   ref = elems[i] ;

						}

					}

				}

			}

			if ( target[i].indexOf('.') !== false ) { // classname

				var container = new Array() ;

				if ( target[i].indexOf('.') === 0 ) {

					ref = ref.getElementsByClassName( target[i].substring(1) ) ;

				} else {

					sa = target[i].split('.') ;

					elems = ref.getElementsByClassName( sa[1] ) ;

					for ( i2=0 ; i2 < elems.length ; i2++ ) {

						container.push( elems[i] ) ;

					}

					ref = container ;

				}

			}

			if ( i == target.length-1 ) {

				return ref ;

			}


		}

		} else if ( typeof target == 'object' ) {

			return target ;

		}

		return null;

};