var bbb = require('../lib/bigbluebutton');


bbb.salt = 'e4e99cb3b2989d597f2549db2e41ea9e';
bbb.url = 'http://192.168.1.2/bigbluebutton';


//Link generation
// data = {
//   action: 'join',
//   params: {
//     fullName: 'Test Meeting',
//     meetingID: 'exampleaew',
//     password: 'WWoon2G8'
//   }
// }
// link = bbb.link(data,function(er,link){
//   console.log(link + "\n");  
// });



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
