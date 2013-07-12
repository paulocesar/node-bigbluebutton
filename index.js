var bbb = module.exports = require('./lib/bigbluebutton');

bbb.salt = '639259d4-9dd8-4b25-bf01-95f9567eaf4b';
link = bbb.link('create',{
  'name': 'Test Meeting',
  'meetingID': 'abc123',
  'attendeePW': '111222',
  'moderatorPW': '333444'
});

console.log(link);