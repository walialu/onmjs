/**
 * Encodes or decodes a string from or to ROT13.
 * @param {String} v The String to encode or decode.
 * @returns {String} ROT13 encoded or decoded string.
 */
onmjs.utils.rot13 = function(v) {
	return v.replace(/[a-zA-Z]/g, function(c){
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
	});
};
