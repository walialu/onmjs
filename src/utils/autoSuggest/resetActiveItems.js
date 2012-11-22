onmjs.utils.autoSuggest.resetActiveItems = function(textfield) {

	var list = textfield.nextSibling;

	var items = textfield.children;

	for (var i=0;items.length;i++) {

		items[i].className='';

	}

	onmjs.utils.autoSuggest.activeItem = null;

};