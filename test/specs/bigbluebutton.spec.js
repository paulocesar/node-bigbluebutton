var assert = require('assert')
  , BigBlueButton = require('../../lib/bigbluebutton')
  , conf = require('../config')
  , mockConf = require('../config.template')
  , util = require('util');


var testBbb = new BigBlueButton(conf.url, conf.secret)
  , mockConf = new BigBlueButton(mockConf.url, mockConf.secret)
  , linkData = {
      action: 'join',
      params: {
        fullName: 'Test Meeting',
        meetingID: 'exampleaew',
        password: 'WWoon2G8'
      }
    }
  , linkResult = "http://localhost/bigbluebutton/" + 
      "api/join?fullName=Test+Meeting&meetingID=exampleaew"+
      "&password=WWoon2G8&checksum=129a9704cc9d7234aea53ae53f9c9c895aa55a49";


describe("bigbluebutton",function() {  
  /**
   * testing Link
   */
  describe("link",function () {

    it("should return a valid link",function () {
      mockConf.link(linkData).should.eql(linkResult);
    });

  });

  /**
   * testing Request
   */

  describe("request",function () {

    it("should create a meeting", function (done) {

      testBbb.requestQ({
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
          return testBbb.requestQ({ action: 'getMeetings' })
        })
        .then(function (r) {
          r.response.returncode.should.eql('SUCCESS');
          r.response.meetings.should.an.object

          done();
        })
        .fail(done);
    });


    it("should destroy a meeting", function (done) {

      testBbb
        .requestQ({
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

