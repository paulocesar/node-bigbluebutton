var manager = require('../lib/manager')
  , assert = require('assert');


describe("Manager",function () {



  var url = "http://192.168.1.2/bigbluebutton";
  var salt = "e4e99cb3b2989d597f2549db2e41ea9e";




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
      assert.equal( true, manager.getServer(serverUrl) == null);
      //add server
      manager.addServer({url: serverUrl, salt:"123salt"});
      //check if exists
      assert.equal( true, manager.getServer(serverUrl) != null);
      //remove server
      assert.equal( true, manager.removeServer(serverUrl));
      //check if doesn't exists
      assert.equal( null, manager.getServer(serverUrl));
    });

    it("should remove all rooms when the server ir removed", function () {

      /*
       * TODO
       */

    })

  });




  describe("getEmptiestServer",function() {
    /**
     * TODO test
     */
  })




  describe("addMeeting",function () {

    var nameMeeting = "SampleMeeting";

    it("shouldn't create a meeting",function () {
      assert.equal( true, manager.addMeeting(nameMeeting));
    });

    it("shouldn't create a duplicated meeting", function () {
      assert.equal( false, manager.addMeeting(nameMeeting));
    });

    it("should be associated to one meeting", function () {
      server = manager._meetings[nameMeeting].server;
      assert.equal( true, typeof manager._servers[server] !== "undefined"); 
    });

  });


});