_ = require('lodash');

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
module.exports.toUrl =  function (data) {
  var urlVars = '';

  if (!data) {
    return '';
  }

  if (!_.isObject(data)) {
    throw new Error('Data must be empty or object');
  }

  _.each(data, function (value, param) {
    if (urlVars) {
      urlVars += '&';
    }

    value = value.toString ? value.toString().replace(/ /g,'+') : '';

    urlVars += param.replace(/ /g,'+') + '=' + value;
  });

  return urlVars;
};
