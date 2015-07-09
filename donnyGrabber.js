var fetch = require('fetch-ponyfill')();

function status(response) {
	if (response.status === 200) {
		return response;
	}
	throw new Error(response.statusText);
}

var loadComponent = function(resourceName, require, callback, config) {

	console.log('fetching donny component: ' + resourceName);

	fetch('donny/' + resourceName)
		.then(status)
		.then(function(response) {
			return response.text();
		})
		.then(function(componentObj) {
			componentObj = JSON.parse(componentObj);
			addCss(componentObj.css)
			callback(componentObj.html);
		})
		.catch(function(err) {
			console.error(err + 'fetch for donny failed!');
			callback(err.text());
		});
};

function addCss(css) {
	var head = document.getElementsByTagName('head')[0];
	var s = document.createElement('style');
	s.setAttribute('type', 'text/css');
	if (s.styleSheet) { // IE
		s.styleSheet.cssText = css;
	} else { // the world
		s.appendChild(document.createTextNode(css));
	}
	head.appendChild(s);
}

module.exports = {
	load: loadComponent
};