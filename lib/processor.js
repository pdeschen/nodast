var config = require('./proxy.js').config;

var DEFAULT_CONTEXT = {
	'$network_script' : '',
	'$request' : 'agi://localhost:9090/',
	'$channel' : 'unknown',
	'$language' : 'en',
	'$type' : 'SIP',
	'$uniqueid' : '1306070695.16532',
	'$version' : '1.6.2.6',
	'$callerid' : 'unknown',
	'$calleridname' : 'unknown',
	'$callingpres' : '0',
	'$callingani2' : '0',
	'$callington' : '0',
	'$callingtns' : '0',
	'$dnid' : 'unknown',
	'$rdnis' : 'unknown',
	'$context' : 'default',
	'$extension' : '',
	'$priority' : '1',
	'$enhanced' : '0.0',
	'$accountcode' : 'unknown',
	'$threadid' : '-1392870496'
};

var routes = function() {
	var routes = config.routes;
	var regexps = {};
	// compile the location's regexp and map;
	for ( var location in routes) {
		new RegExp(location);
		regexps[location] = routes[location];
	}
	return regexps;
}();

var resolv = function(url, context) {

	if (context === undefined) {
		context = DEFAULT_CONTEXT;
	}
	for ( var route in routes) {

		if (new RegExp(route).test(url)) {

			var groups = url.match(route);
			var resolved = routes[route];

			if (typeof resolved === 'function') {
				for ( var index = 0; index < groups.length; index++) {
					var group = groups[index];
					context['$' + index] = group;
				}
				resolved = routes[route].call(context);
			}
			console.log(route + " => " + resolved);
			return resolved;
		}
	}
	return '';
};

var lookup = function(url, context) {

	var resolved = resolv(url, context);

	var upstreams = config.upstreams;
	var orUpstreams = [];
	for ( var upstream in upstreams) {
		orUpstreams.push(upstream);
	}
	
	var upstreamRegexp = new RegExp('^agi:\/\/(' + orUpstreams.join('|') + ')?\/(.*)$');

	if (upstreamRegexp.test(resolved)) {
		var match = upstreamRegexp.exec(resolved);
		var upstream = upstreams[match[1]].split(':');
		return ( {
			port : upstream[1],
			hostname : upstream[0]
		});
	} else {
		var regexp = /^agi:\/\/(.*)(:([0-9]*))?\/(.*)$/g;
		var match = regexp.exec(resolved);

		var destination = {
			port : match[3],
			hostname : match[1]
		};

		return (destination);
	}

	// return ( {
	// port : config.$.port,
	// hostname : config.$.hostname
	// });
};

var parse = function(request) {
	var context = DEFAULT_CONTEXT;
	var params = request.split(/\n/);
	for ( var int = 0; int < params.length; int++) {
		var param = params[int];
		var keyValue = param.split(': ');
		context['$' + keyValue[0].replace('agi_', '')] = keyValue[1];
	}
	return context;
};

var process = function(request) {

	var context = parse(request);

	var destination = lookup(context.$request);

	return destination;
};

exports.process = process;
exports.test = lookup;