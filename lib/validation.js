var _ = require('lodash');

var rgxAction = /^[a-zA-Z0-9\._-]+ $/;

/**
 * configure an error validation
 */
var setError = function (validation, message) {
  _.extend(validation, {
    success: false,
    message: message
  });

  return validation;
};

/**
 * It validates any param that is called by the methods 'link' and 'request'
 * in the bigbluebutton.js
 */
module.exports = {

  bbb: function (data) {
    var v = { succcess: true, message: null };

    if (!data) {
      return setError(v, "Undefined params");
    }

    if (!rgxAction.test(data.action)) {
      return setError(v, "Cannot recognized action");
    }

    if(data.params && !_.isObject(data.params)) {
      return setError(v, "'params' must be an object or undefined");
    }

    if (!_.isObject(data.body) && !_.isString(data.body)) {
      return setError(v, "'body' must be an object or a string");
    }

    return v;
  }

};