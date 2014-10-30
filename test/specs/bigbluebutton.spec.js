var assert = require('assert')
  , bbb = require('../../lib/bigbluebutton')
  , conf = require('../config.js')
  , util = require('util');

  bbb.url = conf.url;
  bbb.salt = conf.secret;

var linkData = {
      action: 'join',
      params: {
        fullName: 'Test Meeting',
        meetingID: 'exampleaew',
        password: 'WWoon2G8'
      }
    }
  , linkResult = conf.url + 
      "api/join?fullName=Test+Meeting&meetingID=exampleaew"+
      "&password=WWoon2G8&checksum=45bfd4a3049593fdc71df23d38fd5d357f82148b"; // Remember to manually generate your expected SHA1 checksum to test against your program


describe("bigbluebutton",function() {  
  /**
   * testing Link
   */
  describe("link",function () {

    it("should return a valid link",function () {
      bbb.link(linkData).should.eql(linkResult);
    });

  });

  /**
   * testing Request
   */

  describe("request",function () {

    it("should create a meeting", function (done) {

      bbb.request({
          action: 'create',
          params: {
            meetingID: 'nodesample333',
            meetingName: 'Node Sample',
            moderatorPW: 'exemplo123asd'
          },
          body: {
            modules: {
              module: [
                {
                  name:'presentation',
                  document:{url:'http://www.tcpdf.org/examples/example_001.pdf'}
                }
              ]
            }
          }
        })
        .then(function (r) {
          r.response.returncode.should.eql('SUCCESS');
          r.response.meetingID.should.eql('nodesample333');
          return bbb.request({ action: 'getMeetings' });
        })
        .then(function (r) {
          r.response.returncode.should.eql('SUCCESS');
          r.response.meetings.should.have.property('meeting');

          done();
        })
        .fail(done);
    });


    it("should destroy a meeting", function (done) {

      bbb
        .request({
          action: 'end',
          params: {
            meetingID: 'nodesample333',
            password: "exemplo123asd"
          }
        })
        .then(function (r) {
          r.response.returncode.should.eql('SUCCESS');
          r.response.messageKey.should.eql('sentEndMeetingRequest');
          
          done();
        })
        .fail(done);

    });

  });

});

