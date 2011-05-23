# nodast

 nodast is (for now) an Asterisk FastAGI reverse proxy on [node](http://nodejs.org).

## Features

  * Basic config definition with location and upstream
  * Syslog
  * Daemon init mode

## Installation

Install from npm:

    $ npm install nodast

## Todo

  * Add load balancing support between upstream
  * Add failover
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