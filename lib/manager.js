var bigbluebutton = require('./bigbluebutton');


/**
 * manager with a map fo servers
 */

module.exports = manager = { _servers: {}, _meetings: {} };


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
 * disconnect all meetings (TODO) and delete server
 */

manager.removeServer = function (url) {
  if(!this._servers[url]) 
    return false;
  delete this._servers[url];

  //TODO disconnect all meetings

  return true;
}


/**
 * Emptiest Meeting
 * 
 */

manager.getEmptiestServer = function () {
  for (first in this._servers) break;
  return first;
}


/**
 * Add meeting
 * add a new meeting and return true if it doesn`t exists
 */

manager.addMeeting = function (meeting) {
  if(this._meetings[meeting])
    return false;

  var server = this.getEmptiestServer();
  this._meetings[meeting] = {server: server, meetingName: meeting, moderatorPW: "sampleWP", atendeePW: "samplePW2"};

  return true;
}


/**
 * Remove meeting
 * remove one meeting if it exists
 */

manager.removeMeeting = function (meeting) {
  if(!this._meetings[meeting]) return false;
  delete this._meetings[meeting];
  return true;
}


