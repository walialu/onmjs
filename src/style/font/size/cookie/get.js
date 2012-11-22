onmjs.style.font.size.cookie.get = function() {

	var cookieName = 'onmfontsize';

	var theCookie = " " + document.cookie;

	var ind = theCookie.indexOf(" "+cookieName+"=");


	if (ind==-1) {

		ind=theCookie.indexOf(";"+cookieName+"=");

	}


	if (ind==-1 || cookieName==="") {

		return false;

	}

	var ind1 = theCookie.indexOf(";", ind+1);


	if (ind1==-1) {

		ind1=theCookie.length;

	}

	var returnvalue = parseInt(unescape(theCookie.substring(ind+cookieName.length+2,ind1)),10);

	return returnvalue;

};