var crypto = require('crypto')
  , parser = require('./parser')
  , validation = require('./validation')
  , utils = require('./utils')
  , http = require('http');

/**
 * bigbluebutton prototype 
 */

var bigbluebutton = module.exports = {};


/**
 * BigBlueButton base URL
 * get this URL running 'bbb-conf --salt' command in the BBB server
 */

bigbluebutton.url = 'http://localhost/bigbluebutton';
  


/**
 * BigBlueButton salt string
 * get this salt running 'bbb-conf --salt' command in the BBB server
 */

bigbluebutton.salt = null;  



/**
 * Link
 * returns a link using the URL and Salt data.
 * it adds the correct checksum in the end
 * for more information visit: https://code.google.com/p/bigbluebutton/wiki/API
 */

bigbluebutton.link = function (data) {
  var url = this.url
    , salt = this.salt;

  var result = validation.bbb(data);

  if (!result.success) {
    throw new Error(result.message);
  }

  url = utils.addSlashIfNeed(url) + 'api/' + data.action;
  urlParams = parser.toUrl(data.params);

  //append checksum to url if salt is set
  if(salt) {
    var sha1 = crypto.createHash('sha1');
    var key = sha1.update(data.action+urlParams+salt);
    if(urlParams !== '')
     urlParams += '&';
    urlParams += 'checksum=' + key.digest('hex');
  }

  //append params to url if it exists
  if(urlParams !== '')
    urlParams = '?' + urlParams;
  url+=urlParams;

  return url;
};



/**
 * Request
 * create GET and POST requests for a BigBlueButton server and returns the response
 */
 
bigbluebutton.request = function (data,cb) {

  //validates params and create the bigbluebutton url with checksum
  this.link(data,function (er,url){
    if(er) return cb(er,null);
    doRequest(url);
  });

  //creates request options (method,header,body...) and do the request
  function doRequest(url) {
    options = utils.getHostPathPort(url);
    
    body = null;
    if(data.body) {
      body = '<?xml version="1.0" encoding="UTF-8"?>'+parser.toXml(data.body);

      options.method = 'POST';
      options.headers = {
        'Content-Length' : body.length
      };
    }

    //deals with the node.js response data
    function response(res) {
      var str = '';
      res.on('data',function (chunk) {
        str += chunk;
      });
      res.on('end',function () {
        cb(null,JSON.parse(parser.toJson(str)));
      });
    }

    var req = http.request(options, response);
    req.on('error',function (er){
      cb(er,null);
    });

    if(body)
      req.write(body);
    req.end();
  }
};
