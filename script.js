// @ts-check

function main() {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    const src = iframe.getAttribute('src')
    const id = youtube(src);
    if (!id) return;
    const url = `https://htc-viewer.netlify.app/?id=${id}`;
    iframe.outerHTML = `<div class="wilhite-safetube"><a target="_blank" href="${url}">Watch Video</a></div>`;
    console.log(`WATCH VIDEO HERE: ${url}`);
  });
}

if (window.location.href.includes('htc-viewer.netlify.app') === false) {
  setInterval(main, 2500);
}


function youtube(str) {
  return stripTrailingSlash(youtube_(str))
}

/**
 * Get the Youtube Video id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function youtube_(str) {
	// shortcode
	var shortcode = /youtube:\/\/|https?:\/\/youtu\.be\/|http:\/\/y2u\.be\//g;

	if (shortcode.test(str)) {
		var shortcodeid = str.split(shortcode)[1];
		return stripParameters(shortcodeid);
	}

	// /v/ or /vi/
	var inlinev = /\/v\/|\/vi\//g;

	if (inlinev.test(str)) {
		var inlineid = str.split(inlinev)[1];
		return stripParameters(inlineid);
	}

	// v= or vi=
	var parameterv = /v=|vi=/g;

	if (parameterv.test(str)) {
		var arr = str.split(parameterv);
		return arr[1].split('&')[0];
	}

	// v= or vi=
	var parameterwebp = /\/an_webp\//g;

	if (parameterwebp.test(str)) {
		var webp = str.split(parameterwebp)[1];
		return stripParameters(webp);
	}

	// embed
	var embedreg = /\/embed\//g;

	if (embedreg.test(str)) {
		var embedid = str.split(embedreg)[1];
		return stripParameters(embedid);
	}

	// ignore /user/username pattern
	var usernamereg = /\/user\/([a-zA-Z0-9]*)$/g;

	if (usernamereg.test(str)) {
		return undefined;
	}

	// user
	var userreg = /\/user\/(?!.*videos)/g;

	if (userreg.test(str)) {
		var elements = str.split('/');
		return stripParameters(elements.pop());
	}

	// attribution_link
	var attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

	if (attrreg.test(str)) {
		return stripTrailingSlash(str.match(attrreg)[1]);
	}
}

function stripTrailingSlash(str) {
  return typeof str === 'string' ? str.replace(/\/$/, '') : str;
}

/**
 * Strip away any parameters following `?` or `/`
 * @param str {string}
 */
function stripParameters(str) {
	// Split parameters or split folder separator
	if (str.indexOf('?') > -1) {
		return str.split('?')[0];
	} else if (str.indexOf('/') > -1) {
		return str.split('/')[0];
	}
	return str;
}
