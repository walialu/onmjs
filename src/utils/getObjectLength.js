/**
 * Returns the length of an object
 * @function
 * @param {Object} obj Any object.
 * @example
 * var obj = {
 * 	title: "moo2",
 * 	description: "test blubb",
 * 	items: [{title: "test 1"},{title: "test 2"}]
 * };
 * console.log('obj length is ' + onmjs.utils.getObjectLength(obj));
 */
onmjs.utils.getObjectLength = function(obj) {
	var count = 0;

	for(var prop in obj) {

		if(obj.hasOwnProperty(prop)) count = count + 1;

	}

	return count;
};