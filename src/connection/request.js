/**
 * This method establishes an ajax request.
 * @function
 * @param cfg the Configuration object.
 * @param {String} cfg.method The request method. POST or GET.
 * @param {String} cfg.url The url to query.
 * @param {Function} cfg.success A callback function that is executed on success.
 * @param {Function} cfg.failure A callback function that is executed on failure.
 * @param {String} cfg.params Parameters which are sent when using POST as request method. Example: cfg.params: 'id=7&title=moo'
 * @return {undefined}
 */
onmjs.connection.request = function(cfg) {

	var xmlHttp = null;

	try {

		xmlHttp = new XMLHttpRequest();

	} catch(e) {

		try {

			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

		} catch(e) {

			try {

				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");

			} catch(e) {

				xmlHttp = null;

			}

		}

	}

	if (xmlHttp) {

		cfg.method = cfg.method.toUpperCase();

		xmlHttp.open(cfg.method, cfg.url, true);

		if (cfg.oldPost) {
			xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		xmlHttp.onreadystatechange = function () {

			if (xmlHttp.readyState == 4) {

				var json = onmjs.decode.json(xmlHttp.responseText);

				if(json.success) {

					if (typeof(cfg.success) == 'function') {

						cfg.success(xmlHttp.responseText);

					}

				} else {

					if (typeof(cfg.failure) == 'function') {

						cfg.failure(xmlHttp.responseText);

					}

				}

			}

		};

		if (cfg.method == 'POST' && typeof(cfg.params) != 'undefined') {

			xmlHttp.send(cfg.params);

		} else {

			xmlHttp.send(null);

		}

	}

};