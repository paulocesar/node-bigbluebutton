
//TODO documentation
module.exports = function (data,cb) {
  if(data === 'undefined' || data == null)
    cb(new Error('Parameters are undefined'));

  if(typeof(data.action) === 'undefined' || data.action == null)
    cb(new Error('define your action'));
  if(typeof(data.action) !== 'string' || !/[a-zA-Z0-9\._-]*/.test(data.action))
    cb(new Error("action's pattern is not recognized"));

  if(typeof(data.params) !== 'object' && typeof(data.params) !== 'undefined')
    cb(new Error("param's pattern is wrong"));

  if(data.body && typeof(data.body) !== 'object' && typeof(data.body) !== 'string')
    cb(new Error("body's pattern is wrong"));

  cb(null);
}
