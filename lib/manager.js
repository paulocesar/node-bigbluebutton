var bigbluebutton = require('./bigbluebutton');


/**
 * manager with a map fo servers
 */

module.exports = manager = { _servers: {}, _rooms: {} };


/**
 * Add server
 * add a server to the manager
 */

manager.addServer = function (options) {

  var bbb = Object.create(bigbluebutton);

  bbb.url = options.url || bbb.url;
  bbb.salt = options.salt || bbb.salt;

  if(this._servers[bbb.url]) 
    return false;

  this._servers[bbb.url] = bbb;
  return true;
}


/**
 * Get server
 * get one server with a specific link
 */

manager.getServer = function (url) {
  return this._servers[url] ? this._servers[url] : null;
}


/**
 * Delete server
 * disconnect all rooms (TODO) and delete server
 */

manager.removeServer = function (url) {
  if(!this._servers[url]) 
    return false;
  delete this._servers[url];

  //TODO disconnect all rooms

  return true;
}


/**
 * Emptiest Room
 *
 */
manager.getEmptiestRoom = function () {
  for (first in this._servers) break;
  return first;
}

/**
 * Add room
 *
 */

manager.addRoom = function (room) {
  if(this._rooms[room])
    return false;

  this._rooms[room] = this.getEmptiestRoom();
  return true;
}