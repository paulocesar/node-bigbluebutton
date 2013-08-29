var bigbluebutton = require('./bigbluebutton');


/**
 * manager with a map fo servers
 */

module.exports = manager = { _servers: {} };


/**
 * Add
 * add a server to the manager
 */

manager.add = function (options) {

  var bbb = Object.create(bigbluebutton);

  bbb.url = options.url || bbb.url;
  bbb.salt = options.salt || bbb.salt;

  if(this._servers[bbb.url]) 
    return false;

  this._servers[bbb.url] = bbb;
  return true;
}


/**
 * Get
 * get one server with a specific link
 */

manager.get = function (url) {
  return this._servers[url] ? this._servers[url] : null;
}