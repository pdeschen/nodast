var sys = require('sys'), fs = require('fs'), path = require('path'), util = require('util');
var cli = require('cli').enable('daemon'), color = require("ansi-color").set;
var $proxy = require('./proxy.js');

/**
 * Parse the command line arguments and daemonize as necessary;
 * 
 * @api public
 */
exports.parse = function () {

  cli.enable('version');

  cli.setApp($proxy.name, $proxy.version);

  var options = cli.parse( {
    test : [ 't', 'Test location', 'string' ],
    install : [ 'i', 'Install config file and init.d script' ]
  });

  if (options.test) {
    var destination = require('./processor.js').test(options.test);
    console.log(color('\t' + destination.hostname + ":" + destination.port, "green"));
  } else if (options.install) {
    console.log(color('\tinstalling...', "green"));
    var installer = require('./installer.js');
    installer.install(function (error) {
      if (error) {
        console.log(color('\t' + error, "red"));
      }
      console.log(color('\tdone', "green"));
    });
  } else {
    process.title = "nodast";
    cli.main(function (args, options) {
      $proxy.start();
    });
  }
};

exports.start = $proxy.start;
