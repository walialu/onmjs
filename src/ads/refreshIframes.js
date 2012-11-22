/**
 * Refresh the iframe we might be using in the near future to deliver epic advertisments!
 * @param  {String} fids String of Numbers seperated by commata.
 * @example
 * onmjs.ads.refreshIframes('17438');
 * @return {undefined}
 */
onmjs.ads.refreshIframes = function(fids) {

	var fid,f,c,a=fids.split(/,/),i=0;

	try {

		for ( ;i<a.length;i++ ) {

			fid=a[i];
			f=document.getElementById('af_adrefresh_ifr_'+fid);

			if (!f) {

				c=document.getElementById('af_adrefresh_container_'+fid);

			}

			if (c) {

				f = document.createElement('iframe'); f.setAttribute('id', 'af_adrefresh_ifr_'+fid);
				f.setAttribute('scrolling', 'no'); f.setAttribute('frameborder', 0);
				f.setAttribute('width', 0); f.setAttribute('height', 0);
				c.innerHTML=''; c.appendChild(f);

			}

		}

		if (f && afAd.pageid && afAd.target) {

			f.setAttribute('src', '/service/ifr_adrefresh.php?' +
			'pubf='+fid +
			'&pubp='+afAd.pageid +
			'&pubt='+escape(afAd.target) +
			'&ts='+Math.floor(Math.random()*100000));

		}

	} catch(e) {}

};