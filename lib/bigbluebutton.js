var crypto = require('crypto');
var parser = require('xml2json');
var http = require('http');

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
    urlVars += name.replace(/ /g,'+') + '=' + data[name].replace(/ /g,'+');
  }
  return urlVars;
}

function getHostAndPath (url) {
  url = url.replace(/.*:\/\//,'').split(/\//);
  path = '';
  for(var i = 1; i < url.length; i++)
    path += '/' + url[i];
  return {
    host: url[0],
    path: path
  };
}

module.exports = {
  
  url : 'http://localhost/bigbluebutton/api',
  
  salt : null,

  link : function (action,params) {
    var self = this;
    if(!isValidAction(action))
      throw new Error("Action's pattern is not recognized");

    url = addSlashIfNeed(self.url) + action;
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

  get : function (action,params,callback) {
    var self = this;
    link = self.link(action,params);

    options = getHostAndPath(self.url);
    options.path += '/' + action;

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

  post : function (action,params,body,callback) {
    var self = this;
    link = self.link(action,params);

    options = getHostAndPath(self.url);
    options.path += '/' + action;
    options['method'] = 'POST';

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
    req.write(parser.toXml(body));
    req.end();
  }
}
