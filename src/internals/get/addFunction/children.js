onmjs.internals.get.addFunction.children = function(index) {

	if (typeof index != 'undefined') {

		return this.childNodes[index];

	} else {

		return this.childNodes;

	}

};