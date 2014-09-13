var _ = require('lodash');

/**
 * regex that get last group of slashs
 */
var rgxAllLastSlashs = /[\/]+$/;

/**
 * utils obejct
 */
utils = {};

/**
 * addSlashIfNeed
 * it adds a slash at the end if doesn't exists
 */
utils.addSlashIfNeed = function (url) {
  return url.replace(rgxAllLastSlashs, '') + '/';
};

/**
 * getHostPathPort
 * It returns an object with the host, path and port if exists
 */
utils.hostData = function (fullUrl) {
  var host = null
    , port = null
    , path = null;

  fullUrl = fullUrl.split('://');

  if (fullUrl.length > 1) {
    fullUrl = fullUrl[1];
  }

  fullUrl = fullUrl.split(':');
  
  if (fullUrl.length > 1) {
    restUrl = _.rest(fullUrl).join(':');
    restUrl = restUrl.split('/');
    host = fullUrl[0];
    port = restUrl[0];
    path = '/' + _.rest(restUrl).join('/');

    return {
      host: host,
      port: port,
      path: path
    };
  }

  fullUrl = fullUrl[0].split('/');

  var data = {
    host: fullUrl[0]
  };

  if (fullUrl.length > 1) {
    data.path = '/' + _.rest(fullUrl).join('/');
  }

  return data;

};

module.exports = utils;