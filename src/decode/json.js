/**
 * This method will decode a given json string and return a js object.
 * @function
 * @param v JSON string.
 * @returns Object based on the json string passed to it.
 */
onmjs.decode.json = function(v) {
	if (v.indexOf('{') === 0) {

			return eval( "(" + v + ")" );

		} else {

			var returnObj = new Object();

			returnObj.success = false;

			returnObj.msg = escape(v);

			return returnObj;

		}

};