var _ = require('lodash')
  , crypto = require('crypto')
  , utils = require('./utils');

/**
 * Xml2json - https://github.com/buglabs/node-xml2json
 * this parser extends from xml2json 
 */
module.exports = require('xml2json');

/**
 * toBbbUrl
 * it transforms the json data into url variables
 * 'space' becomes 'plus'
 *
 * TODO: it doesn't transform special characters =/
 *
 */
module.exports.toBbbUrl =  function (url, action, params, secret) {
  var urlParams = ''
    , sha1 = crypto.createHash('sha1')
    , key = null;

  params = params || {};

  if (!_.isObject(params)) {
    throw new Error('Data must be empty or object');
  }

  _.each(params, function (value, param) {
    if (urlParams) {
      urlParams += '&';
    }

    value = value.toString ? value.toString().replace(/ /g,'+') : '';

    urlParams += param.replace(/ /g,'+') + '=' + value;
  });

  key = sha1.update(action+urlParams+secret);

  if(urlParams !== '') {
    urlParams += '&';
  }
  urlParams += 'checksum=' + key.digest('hex');

  return utils.addSlashIfNeed(url) + 'api/' + action + '?' + urlParams;
};
