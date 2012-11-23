/**
 * This function create an instance of an autoSuggest box.<br/>
 * The box will send an ajax request after a brief delay to fetch <br/>
 * results based on the input,<br/>
 * then it'll render the fetched results in a list under the input field.<br/>
 * You can select the suggested results from the list by <br/>
 * navigating with the up and down keys and pressing enter.<br/>
 * The server needs to respond with a valid json like so:<br/>
 * <code>{success: true, items: [{displayText: "&ltstrong&gt;moo&lt;/strong&gt; 2", value: "moo 2"},{displayText: "&lt;strong&gt;moo&lt;/strong&gt; 3", value: "moo 3"}]}</code><br/>
 * or if no matching elements could be found:<br/>
 * <code>{success:false}</code><br/>
 * The autoSuggest textfield needs to be inside a form element,<br/>
 * because a keypress enter event without a selected element from<br/>
 * the autoSuggest list will bubble up until it finds a form and then<br/>
 * submit it.
 * @function
 * @param {Object} opts Configuration object.
 * @param {String} opts.id Id of the textfield where you want the autoSuggest box being bound to.
 * @param {Number} [opts.delay=500] Time in Milliseconds after last keypress before the request is sent to the server.
 * @param {String} opts.method POST or GET.
 * @param {String} opts.url The URL to query. The [AUTOSUGGEST] part will be automatically replaced by the value of the textfield.
 * @param {String} opts.responseType json or xml.
 * @param {Object} opts.styleConfig Style Configuration object.
 * @param {String} opts.styleConfig.ulClassName The CSS classname that should be appended to the generated ul tag.
 * @example
 * onmjs.utils.autoSuggest.init({
 * 	id: 'SCHNELLSUCHE_WERT',
 * 	method: 'GET',
 * 	url: '/suche/search_service.php?action='
 * 		+ 'suggest&resultType=json&q=[AUTOSUGGEST]',
 * 	delay: 500,
 * 	responseType: 'json',
 * 	styleConfig: {
 * 		ulClassName: 'autosuggest'
 * 	}
 * });
 */
onmjs.utils.autoSuggest.init = function(opts) {

	var textfield = onmjs.get('#' + opts.id);

	// init dataStore
	onmjs.internals.dataStores.utils.autoSuggest[opts.id] = {};
	onmjs.internals.dataStores.utils.autoSuggest[opts.id] = opts;

	if (opts.timeout) {

		onmjs.internals.dataStores.utils.autoSuggest[opts.id].timeoutInMilliseconds = opts.timeout;

	}

	// disable autocomplete
	textfield.autocomplete = 'off';

	textfield.onblur = function() {

		// maybe we need to hide the box here
		//onmjs.utils.autoSuggest.clear(this);

	};

	textfield.onkeypress = onmjs.utils.autoSuggest.stopRKey;

	textfield.onkeydown = function(evt) {

		if (!evt) {
			evt = window.event;
		}

		// if not navigating with key arrow up or down
		if (!onmjs.utils.autoSuggest.keyNavigation(evt,this)) {

			// setting default delay
			var delay = 500;

			// getting custom delay
			if (typeof opts.delay != 'undefined') {

				delay = opts.delay;

			}

			clearTimeout(onmjs.utils.autoSuggest.timer);

			onmjs.utils.autoSuggest.timer = false;

			onmjs.utils.autoSuggest.timer = setTimeout(function(){onmjs.utils.autoSuggest.createList(opts);},delay);

		}

	};
};