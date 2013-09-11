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
};


/**
 * Get server
 * get one server with a specific link
 */

manager.getServer = function (url) {
  return this._servers[url] ? this._servers[url] : null;
};


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
};


/**
 * Emptiest Meeting
 * TODO: it's only returning the first....
 */

manager.getEmptiestServer = function () {
  for (var first in this._servers) break;
  return first;
};


/**
 * Join meeting
 *
 */

manager.joinMeeting = function (meeting,fullName,cb) {
  var room = this._meetings[meeting];
  if(!room)
    return cb(new Error("meeting alread exists"));

  data = {
    action: "join",
    params: {
      fullName: fullName,
      meetingID: meeting,
      password: room.attendeePW
    }
  };

  this._servers[room.server].link(data,cb);
};

/**
 * Add meeting
 * add a new meeting and return true if it doesn`t exists
 */

manager.addMeeting = function (meeting,cb) {
  if(this._meetings[meeting])
    return cb(new Error("meeting alread exists"));

  var server = this.getEmptiestServer();
  var room = {server: server, meetingID: meeting, meetingName: meeting, moderatorPW: "sampleWP", attendeePW: "samplePW2"};

  data = {
    action: 'create',
    params: { 
      meetingID: room.meetingID,
      meetingName: room.meetingName,
      moderatorPW: room.moderatorPW,
      attendeePW: room.attendeePW
    }
  };

  this._meetings[meeting] = room;

  this._servers[room.server].request(data,cb);
};


/**
 * Remove meeting
 * remove one meeting if it exists
 */

manager.removeMeeting = function (meeting) {
  if(!this._meetings[meeting]) return false;
  delete this._meetings[meeting];
  return true;
};


