onmjs.box.facts.next = function(anchor,ds) {

	var newIndex = ds.currentIndex+1;

	if (newIndex >= ds.length) {

		newIndex = 0;

	}

	var pageNumber = newIndex+1;

	var textNode = anchor.parentNode.parentNode.firstChild;

	textNode.innerHTML = ds[newIndex].text;

	var pageNumNode = anchor.parentNode.previousSibling;

	var currentOfTotal = onmjs.getTranslation(null,'factbox->currentOfTotal').replace('[current]',pageNumber).replace('[total]',ds.length);

	pageNumNode.innerHTML = currentOfTotal;

	ds.currentIndex = newIndex;

};