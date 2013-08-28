
/**
 * Xml2json - https://github.com/buglabs/node-xml2json
 * this parser is a copy of the xml2json with the toUrl method appended 
 */
module.exports = require('xml2json');

/**
 * toUrl
 * it transforms the json data into url variables
 * 'space' becomes 'plus'
 *
 * TODO: it doesn't transform special characters =/
 *
 */
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
