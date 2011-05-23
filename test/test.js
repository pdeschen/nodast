
var request = require('fs').readFileSync(process.cwd() + '/request.txt', 'utf-8');
var destination = require('../lib/processor.js').process(request);

console.log(destination.hostname + " @ " + destination.port);