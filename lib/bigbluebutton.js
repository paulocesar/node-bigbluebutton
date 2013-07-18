var crypto = require('crypto');
var parser = require('xml2json');
var http = require('http');

function validatesParams(data) {
  if(data === 'undefined' || data == null)
    throw new Error('Parameters are undefined');

  if(typeof(data.action) === 'undefined' || data.action == null)
    throw new Error('define your action');
  if(typeof(data.action) !== 'string' || !/[a-zA-Z0-9\._-]*/.test(data.action))
    throw new Error("action's pattern is not recognized");

  if(typeof(data.params) !== 'object' && typeof(data.params) !== 'undefined')
    throw new Error("param's pattern is wrong");

  if(typeof(data.body) !== 'object' && typeof(data.body) !== 'string' && typeof(data.body) !== 'undefined')
    throw new Error("body's pattern is wrong");

}

function addSlashIfNeed (url) { 
  return url+((url.slice(-1) != '/') ? '/' : ''); 
}

function isValidAction (item) {
  if(typeof(item) === 'string' && /[a-zA-Z0-9_-]*/.test(item))
    return true;
  return false;
}

function parseParams (data) {
  if(typeof(data) === 'undefined')
    return '';
  if(typeof(data) !== 'object')
    throw new Error('Invalid params')

  var urlVars = '';

  for (var name in data) {
    if(urlVars != '')
      urlVars += '&';

    urlVars += name.replace(/ /g,'+') + '=' + data[name].toString().replace(/ /g,'+');
  }
  return urlVars;
}

function getHostPathPort (url) {
  url = url.replace(/.*:\/\//,'').split(/\//);
  
  path = '';
  for(var i = 1; i < url.length; i++)
    if(url[i] != '')
      path += '/' + url[i];
  
  options = { host: url[0], path: path };
  
  if(url[0].split(':').length > 1)
    options['port'] = url[0].split(':')[1];

  return options
}

module.exports = {
  url: 'http://localhost/bigbluebutton',
  
  salt: null,

  // toXml: function (str) {
  //   return parser.toXml(str);
  // },

  // toJson: function (str) {
  //   return parser.toJson(str);
  // },

  link: function (data) {
    validatesParams(data);
    action = data.action;
    params = data.params;

    var self = this;
    url = addSlashIfNeed(self.url) + 'api/' + action;
    urlParams = parseParams(params);

    //append checksum to url if salt is set
    if(self.salt) {
      sha1 = crypto.createHash('sha1');
      key = sha1.update(action+urlParams+self.salt);
      if(urlParams != '')
       urlParams += '&';
      urlParams += 'checksum=' + key.digest('hex');
    }

    if(urlParams != '')
      urlParams = '?' + urlParams;
    url+=urlParams;

    return url;
  },

  get: function (data,callback) {
    validatesParams(data);
    action = data.action;
    params = data.params;
    
    var self = this;
    link = self.link(data);
    options = getHostPathPort(link);
    console.log(link);

    cb = function (response) {
      var str = '';
      response.on('data',function (chunk) {
        str += chunk;
      });
      response.on('end',function () {
        callback(parser.toJson(str));
      });
    }

    http.request(options, cb).end();
  },

  post: function (data,callback) {
    validatesParams(data);
    action = data.action;
    params = data.params;
    body = data.body;
    body = '<?xml version="1.0" encoding="UTF-8"?>'+parser.toXml(body);

    if(typeof(body) !== 'object' && typeof(body) !== 'string')
      throw new Error('undefined body data');
    
    var self = this;
    link = self.link(data);
    options = getHostPathPort(link);
    options['method'] = 'POST';
    options['headers'] = {
      'Content-Length' : body.length
    };

    console.log(link);

    cb = function (response) {
      var str = '';
      response.on('data',function (chunk) {
        str += chunk;
      });
      response.on('end',function () {
        callback(parser.toJson(str));
      });
    }

    var req = http.request(options, cb);
    req.write(body);
    req.end();
  }
}
