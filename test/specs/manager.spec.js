var manager = require('../lib/manager')
  , bigbluebutton = require('../lib/bigbluebutton')
  , assert = require('assert')
  , conf = require('./config');


describe("Manager",function () {



  var url = conf.secret;
  var salt = conf.url;


  bigbluebutton.url = url;
  bigbluebutton.salt = salt;




  describe("addServer",function () {

    it("should add server",function () {
      manager.addServer({url: url, salt:salt});
      assert.equal( true, typeof manager._servers[url] !== 'undefined');
    });

    it("shouldn't add a server with the same url",function () {
      assert.equal( false, manager.addServer({url: url, salt:salt}));
    });

  });





  describe("getServer",function () {
    
    it("should return a valid server",function (done) {
      data = {
        action: "join",
        params: {
          fullName: "Test Meeting",
          meetingID: "exampleaew",
          password: "WWoon2G8"
        }
      };

      manager.getServer(url).link(data,function(er,link) {
        if(er) done(er);
        assert.equal(link,"http://192.168.1.2/bigbluebutton/api/join?fullName=Test+Meeting&meetingID=exampleaew&password=WWoon2G8&checksum=b62bd20653930a9607050871891ac37017f1a156");
        done();
      });
    });
    
  });





  describe("removeServer", function () {

    it("should return false if server doesnt exists", function () {
      assert.equal( false, manager.removeServer("http://fakeserver/"));
    });

    it("should remove the server", function () {
      var serverUrl = "http://realserver/";
      //check if doesn't exists
      assert.equal( true, manager.getServer(serverUrl) === null);
      //add server
      manager.addServer({url: serverUrl, salt:"123salt"});
      //check if exists
      assert.equal( true, manager.getServer(serverUrl) !== null);
      //remove server
      assert.equal( true, manager.removeServer(serverUrl));
      //check if doesn't exists
      assert.equal( null, manager.getServer(serverUrl));
    });

    it("should remove all meeting when the server ir removed", function () {

      /*
       * TODO
       */

    });

  });





  describe("getEmptiestServer",function() {

    it("should return the most empty server", function () {
      /**
       * TODO
       */
    });
  });




  describe("addMeeting",function () {

    var nameMeeting = "SampleMeeting";

    it("shouldn't create a meeting",function (done) {
      manager.addMeeting(nameMeeting,function(er,response){
        if(er) throw Error("create meeting");
        done();
      });
    });

    it("shouldn't create a duplicated meeting", function (done) {
      manager.addMeeting(nameMeeting,function(er,response){
        if(!er) throw Error("duplicated meeting");
        done();
      });
    });

    it("should be associated to one meeting", function () {
      server = manager._meetings[nameMeeting].server;
      assert.equal( true, typeof manager._servers[server] !== "undefined"); 
    });

    it("should generate random passowords", function () {
      /**
       * TODO
       */
    });

    it("should add a meeting in the bigblue button server", function (done) {
      bigbluebutton.request({action: "getMeetings"},function (er, res) {
        if(er) throw er;
        assert.equal("SUCCESS",res.response.returncode);
        assert.equal(1,Object.keys(res.response.meetings).length);
        done();
      });
    });

  });




  describe("removeMeeting", function () {

    var nameMeeting = "RemoveMeeting";

    it("should remove meeting if exists", function () {
      manager.addMeeting(nameMeeting);
      assert.equal( true, manager.removeMeeting(nameMeeting));
      assert.equal( false, manager.removeMeeting(nameMeeting));
    });

  });




  describe("joinMeeting", function () {
    var nameMeeting = "SampleMeeting";
    var nameAttendee = "MyName";

    it("should get the link to add user to meeting", function (done) {
      manager.joinMeeting(nameMeeting,nameAttendee,function (er,url) {
        if(er) throw er;
        done();
      });
    });

  });


});