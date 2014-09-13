var assert = require('assert')
  , bbb = require('../lib/bigbluebutton')
  , conf = require('./config');

describe("bigbluebutton",function() {

  bbb.salt = conf.secret;
  bbb.url = conf.url;
  
  /**
   * testing Link
   */
  describe("link",function () {

    it("should return a valid link",function (done) {
      data = {
        action: 'join',
        params: {
          fullName: 'Test Meeting',
          meetingID: 'exampleaew',
          password: 'WWoon2G8'
        }
      };

      bbb.link(data,function(err,url){
        if(err) done(err);
        assert.equal(url,"http://104.131.6.90/bigbluebutton/api/join?fullName=Test+Meeting&meetingID=exampleaew&password=WWoon2G8&checksum=2f0023bf9093a5acc6e619e47aa1e2bd90af3fbc");
        done();
      });
    });

  });

  /**
   * testing Request
   */

   describe("request",function () {

    //TODO

   });

});


//samples for tests

//create meeting with a presentation and list meetings
// data = {
//   action: 'create',
//   params: { 
//     meetingID: 'exampleaew',
//     meetingName: 'Example Aew',
//     moderatorPW: 'exemplo123asd'
//   },
//   body: {
//     modules: {
//       module: [
//         {
//           name:'presentation',
//           document:{url:'http://www.samplepdf.com/sample.pdf'}
//         }
//       ]
//     }
//   }
// }
// bbb.request(data,function (response){
//   console.log(response + "\n");

//   data = {
//     action: 'getMeetings',
//   }
//   bbb.request(data,function (err,response){
//     console.log(response);
//   });
// });


// //remove specific meeting and list meetings
// data = {
//   action: 'end',
//   params: {
//     meetingID: 'exampleaew',
//     password: "exemplo123asd"
//   }
// }
// bbb.request(data,function (err,response){
//   console.log(response);

//   data = {
//     action: 'getMeetings',
//   }
//   bbb.get(data,function (err,response){
//     console.log(response);
//   });
// });
