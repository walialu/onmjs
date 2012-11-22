onmjs.box.facts.prev = function(anchor,ds) {

	var newIndex = ds.currentIndex-1;

	if (newIndex < 0) {

		newIndex = ds.length-1;

	}

	var pageNumber = newIndex+1;

	var textNode = anchor.parentNode.parentNode.firstChild;

	textNode.innerHTML = ds[newIndex].text;

	var pageNumNode = anchor.parentNode.previousSibling;

	var currentOfTotal = onmjs.getTranslation(null,'factbox->currentOfTotal').replace('[current]',pageNumber).replace('[total]',ds.length);

	pageNumNode.innerHTML = currentOfTotal;

	ds.currentIndex = newIndex;

};