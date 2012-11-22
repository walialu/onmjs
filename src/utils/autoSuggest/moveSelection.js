onmjs.utils.autoSuggest.moveSelection = function(dir,textfield) {

	var list = onmjs.get('#as_'+textfield.id);

	var items = list.childNodes;

	var length = items.length;


	var activeNode = null;

	var nextActiveNode = null;

	for(var i=0;i<length;i++) {


		if (items[i].className=='active') {

			activeNode = items[i];

			if (dir=='up') {

				if(activeNode.previousSibling !== null) {

					nextActiveNode = items[i].previousSibling;

				} else {

					nextActiveNode = items[length-1];

				}

			} else {

				if (activeNode.nextSibling !== null) {

					nextActiveNode = items[i].nextSibling;

				} else {

					nextActiveNode = items[0];

				}

			}

		}

	}

	if (activeNode !== null && nextActiveNode !== null) {

		activeNode.className='';

		nextActiveNode.className='active';

		onmjs.utils.autoSuggest.activeItem = nextActiveNode;


	// fallback if nothing is selected
	} else {

		onmjs.utils.autoSuggest.resetActiveItems(textfield);

		items[0].className = 'active';

		onmjs.utils.autoSuggest.activeItem = items[0];

	}


};