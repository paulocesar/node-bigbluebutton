var _ = require('lodash')
  , Q = require('q')
  , crypto = require('crypto')
  , parser = require('./parser')
  , validation = require('./validation')
  , http = require('http');

/**
 * bigbluebutton class
 */

var BigBlueButton = module.exports = function (url, secret) {
  this.url = url || 'http://localhost/';
  this.secret = secret || '';
};

/**
 * Link
 * returns a link using the URL and secret data.
 * it adds the correct checksum in the end
 * for more information visit: https://code.google.com/p/bigbluebutton/wiki/API
 */

BigBlueButton.prototype.link = function (data) {
  var url = this.url
    , secret = this.secret
    , result = validation.bbb(data)
    , action = null
    , params = null;

  if (!result.success) {
    throw new Error(result.message);
  }

  action = data.action;
  params = data.params;

  return parser.toBbbUrl(url, action, params, secret);
};



/**
 * Request
 * create GET and POST requests for a BigBlueButton server and returns the response
 */
 
BigBlueButton.prototype.request = function (data) {
  var link  = this.link(data)
    , d = Q.defer();

  //creates request options (method,header,body...) and do the request
  options = utils.hostData(link);
  options.method = 'GET';
  
  body = null;
  if(data.body) {
    body = '<?xml version="1.0" encoding="UTF-8"?>' + parser.toXml(data.body);

    options.method = 'POST';
    options.headers = {
      'Content-Length' : body.length
    };
  }

  var req = http.request(options, function (res) {
      var str = '';

      res.on('data',function (chunk) {
        str += chunk;
      });

      res.on('end',function () {
        d.resolve(JSON.parse(parser.toJson(str)));
      });
  });

  req.on('error',function (err){
    d.reject(err);
  });

  if(body)
    req.write(body);

  req.end();

  return d.promise;
};