
//TODO documentation
module.exports = require('xml2json');

//TODO documentation
module.exports.toUrl =  function parseParams (data) {
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
