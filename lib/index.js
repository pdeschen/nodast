var sys = require('sys'), fs = require('fs'), path = require('path'), util = require('util');
var cli = require('cli').enable('daemon');
var $proxy = require('./proxy.js');
var color = require("ansi-color").set;

/**
 * Parse the command line arguments and daemonize as necessary;
 * 
 * @api public
 */
exports.parse = function() {

	cli.enable('version');

	cli.setApp($proxy.name, $proxy.version);

	var options = cli.parse( {
		test : [ 't', 'Test location', 'string' ]
	});

	// console.log(require('util').inspect(options, true, null));
	if (options.test) {
		var destination = require('./processor.js').test(options.test);
		console.log(color('\t' + destination.hostname + ":" + destination.port,
				"green"));
	} else {
		cli.main(function(args, options) {
			$proxy.start();
		});
	}
};

exports.start = $proxy.start;
