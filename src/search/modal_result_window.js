onmjs.search.modal_result_window = function (opts) {
	var val = onmjs.get('#SCHNELLSUCHE_WERT').value,
		response = null,
		div = document.createElement('div');

	onmjs.connection.request({
		method: 'POST',
		url: '/suche/ajax_compact.php',
		oldPost: true,
		params: 'q=' + escape( val ),
		success: function (r) {
			response = onmjs.decode.json(r);
			if (onmjs.get('#KOMPAKTSUCHE') !== null) {
				onmjs.get('#KOMPAKTSUCHE').parentNode.removeChild(onmjs.get('#KOMPAKTSUCHE'));
			}
			div.innerHTML = response.data;
			document.body.appendChild(div);

			// hacky hacky
			div = onmjs.get('#KOMPAKTSUCHE').cloneNode(true);
			onmjs.get('#KOMPAKTSUCHE').parentNode.parentNode.removeChild(onmjs.get('#KOMPAKTSUCHE').parentNode);

			document.body.appendChild(div);
		},
		failure: function (r) {

		}
	});

	return false;
};