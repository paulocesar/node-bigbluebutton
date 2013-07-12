var crypto = require('crypto');


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
  }
}
