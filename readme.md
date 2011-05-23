# nodast

 nodast is (for now) an Asterisk FastAGI reverse proxy on [node](http://nodejs.org).

## How It Works

 nodast receives FastAGI requests from asterisk (or other nodast as a matter of fact), inspect incoming stream for AGI request details.
 Looking more specifically at the agi_request parameter, the AGI URL is then matched against the config route definitions, where route definitions
 values are either static or dynamic. Dynamic values are simply JavaScript closure blocks, with /this/ pointing to a variable context 
 containing all request parameters along with regexp match group items. The dynamic function is simply rewriting the AGI URL, changing
 the destination hostname and port as necessary. The resulting route is NOT re-injected into   
 
 Once route has been resolved, nodast then look for upstream definitions and replace logical name with upstream equivalent.
 
## Context Variables

The follow list all available context variable for dynamic route definition.

    $network_script
    $request
    $channel
    $language
    $type
    $uniqueid
    $version
    $callerid
    $calleridname
    $callingpres
    $callingani2
    $callington
    $callingtns
    $dnid
    $rdnis
    $context
    $extension 
    $priority
    $enhanced
    $accountcode
    $threadid
 
## Sample Configuration

     var config = {
        listen : 9090,
        upstreams : {
            test : 'localhost:4573',
            foobar : 'foobar.com:4573'
        },
        routes : {
            'agi://(.*):([0-9]*)/(.*)' : function() {
                if (this.$callerid === 'unknown') {
                    return ('agi://foobar/script/' + this.$3);
                } else {
                    return ('agi://foobar/script/' + this.$3 + '?callerid' + this.$callerid);
                }
            },
            '.*' : function() {
                return ('agi://test/');
            },
            'agi://192.168.129.170:9090/' : 'agi://test/'
        }
     };

 exports.config = config; 

## Features

  * Basic config definition with location and upstream
  * Syslog
  * Daemon init mode

## Installation

Install from npm:

    $ npm install nodast

## Todo

  * Add to npm repository
  * Add load balancing support between upstreams
  * Add failover/backup upstream
  * Add SSL/TLS support between node (asterisk -> node -> ssl -> node -> fastagi server
  * Add support for AMI
  * Scriptable?
  
## Contributors

  * Pascal Deschenes

## License 

(The MIT License)

Copyright (c) 2011 Pascal Deschenes

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.