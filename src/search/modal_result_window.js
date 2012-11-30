onmjs.search.modal_result_window = function (opts) {
	var txtfield = onmjs.get('#SCHNELLSUCHE_WERT'),
		val = txtfield.value,
		response = null,
		div = document.createElement('div');

	if (onmjs.utils.autoSuggest.listIsVisible(txtfield)) {
		onmjs.utils.autoSuggest.clear(txtfield);
	}

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

			onmjs.tracker.ivw.track({
				tag: '0-3299'
			});
			onmjs.tracker.googleAnalytics.track({
				gaCode: '/suche-kompakt/?q=' + escape(val)
			});
		},
		failure: function (r) {

		}
	});

	return false;
};