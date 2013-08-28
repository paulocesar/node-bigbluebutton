
/**
 * It validates any param that is called by the methods 'link' and 'request'
 * in the bigbluebutton.js
 */
module.exports.bbbParams = function (data,cb) {
  if(data === 'undefined' || data == null)
    return cb(new Error('Parameters are undefined'));

  if(typeof(data.action) === 'undefined' || data.action == null)
    return cb(new Error('define your action'));
  if(typeof(data.action) !== 'string' || !/^[a-zA-Z0-9\._-]*$/.test(data.action))
    return cb(new Error("action's pattern is not recognized"));

  if(typeof(data.params) !== 'object' && typeof(data.params) !== 'undefined')
    return cb(new Error("param's pattern is wrong"));

  if(data.body && typeof(data.body) !== 'object' && typeof(data.body) !== 'string')
    return cb(new Error("body's pattern is wrong"));

  return cb(null);
}
