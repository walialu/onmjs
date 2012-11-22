/**
 * Will send a request to Google Analytics
 *
 * Usage:
 *
 * onmjs.tracker.googleAnalytics.track({
 *	"gaCode": "galleries/moo.html",
 *	"gaAccount": "UA-115586-14" // onmeda.es default account
 * })
 */
onmjs.tracker.googleAnalytics.track = function (opts) {

	var ds = onmjs.internals.dataStores.tracker.googleAnalytics;
	var ga = onmjs.tracker.googleAnalytics;

	if(!opts.gaCode) return;

	var gaCode = opts.gaCode;

	if (typeof ds.pageTracker == 'undefined') {


		if (typeof opts.gaAccount == 'undefined') { // fallback


			if (typeof ga.getAccount() == 'undefined') {


				ga.setAccount('UA-115586-6');

			}


		} else {


			ga.setAccount( opts.gaAccount );

		}

		ds.pageTracker = _gat._getTracker( ga.getAccount() );

	}


	ds.pageTracker._trackPageview(gaCode);

};