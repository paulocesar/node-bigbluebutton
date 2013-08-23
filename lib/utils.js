

module.exports.addSlashIfNeed = function (url) { 
  return url+((url.slice(-1) != '/') ? '/' : ''); 
}

module.exports.getHostPathPort = function (url) {
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