/**
 * Reverts a string
 * @param {String} str String to be reverted.
 * @returns {String} Reverted string.
 */
onmjs.utils.string_reverse = function(str) {
	return str.split("").reverse().join("");
};
