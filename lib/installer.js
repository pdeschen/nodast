var path = require('path'), fs = require('fs'), util = require('util'), spawn = require('child_process').spawn;

var install = function (callback) {

  var done = false;

  process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    callback(err);
  });

  var handleError = function (error) {
    if (error) {
      callback(error);
    }
  };
  var etc = process.env.npm_package_config_etc || '/etc/nodast/';
  var initd = process.env.npm_package_config_initd || '/etc/init.d/';
  path.exists(etc, function (exists) {
    if (!exists) {
      fs.mkdirSync(etc, 755);
    }
    var inStream = fs.createReadStream('./etc/nodast.js');
    var outStream = fs.createWriteStream(etc + 'nodast.js', {
      flags : 'w',
      encoding : null,
      mode : 644
    });
    util.pump(inStream, outStream, function (error) {
      handleError(error);

      var initdInStream = fs.createReadStream('./scripts/nodast.initd');
      var initdOutStream = fs.createWriteStream(initd + 'nodast', {
        flags : 'w',
        encoding : null,
        mode : 744
      });
      util.pump(initdInStream, initdOutStream, function (error) {
        handleError(error);
        var chkconfig = spawn('chkconfig', [ '--add', 'nodast' ]);
        chkconfig.on('exit', function (code) {
          callback();
        });
      });
    });
  });
};
exports.install = install;