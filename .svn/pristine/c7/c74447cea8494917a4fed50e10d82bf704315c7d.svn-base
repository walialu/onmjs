onmjs.utils.autoSuggest.createList = function(opts) {
	// reference node
	var rNode = onmjs.get('#' + opts.id);

	var value =  rNode.value;

	if (value === '') {

		// clear results
		onmjs.utils.autoSuggest.clear(rNode);

		return;

	}


	// position info
	var positionInfo = onmjs.utils.getPosition(rNode);


	// new node
	var nNode = document.createElement('ul');

	nNode.id = 'as_'+opts.id;

	if (opts.styleConfig &&
		opts.styleConfig.ulClassName) {

		nNode.className = opts.styleConfig.ulClassName;

	}


	nNode.style.position = 'absolute';

	nNode.style.zIndex = '9999';

	nNode.style.top = positionInfo.top+12+'px';

	nNode.style.left = positionInfo.left+'px';


	// parent node
	var pNode = onmjs.get('#' + opts.id).parentNode;

	// replace placeholder
	var qurl = opts.url.replace("[AUTOSUGGEST]", onmjs.utils.utf8_encode(value));

	onmjs.connection.request({

		method: opts.method,

		url: qurl,

		params: opts.param,

		success: function(r) {

			var json = onmjs.decode.json(r);

			onmjs.utils.autoSuggest.timer = false;

			for (var i=0;i<json.items.length;i++) {

				// append new node items
				var lNode = document.createElement('li');

				lNode['data-value'] = json.items[i].value;

				lNode.innerHTML = json.items[i].displayText;

				/** @ignore */
				lNode.onclick = function() {

					rNode.value = this['data-value'];

					onmjs.utils.autoSuggest.clear(rNode);

					onmjs.utils.autoSuggest.timer = false;

					rNode.focus();

				};


				nNode.appendChild(lNode);

				// set new timeout
				onmjs.utils.autoSuggest.setTimeout(rNode.id);

			}


			// clear results
			onmjs.utils.autoSuggest.clear(rNode);

			// add new results
			document.body.appendChild(nNode);

		},

		failure: function(r) {

			var json = onmjs.decode.json(r);

			onmjs.utils.autoSuggest.timer = false;

			if (json.message &&
				json.message == 'No matching items found!') {

				// clear results
				onmjs.utils.autoSuggest.clear(rNode);

			}

		}

	});
};