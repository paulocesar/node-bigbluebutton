var bbb = module.exports = require('./lib/bigbluebutton');

bbb.salt = '639259d4-9dd8-4b25-bf01-95f9567eaf4b';
bbb.url = 'http://www.reddit.com';

// data = {
//   action: 'create',
//   params: {
//     name: 'Test Meeting',
//     meetingID: 'abc123',
//     attendeePW: '111222',
//     moderatorPW: '333444'
//   }
// }
// link = bbb.link(data);
// console.log(link + "\n");

// data = {
//   action: 'search/.xml',
//   params: { q: 10 }
// }
// bbb.get(data,function (response){
//   console.log(bbb.toJson(response));
// });

data = {
  action: 'search.xml',
  params: { q: 10 },
  body: {
    modules: {
      module: [
        {
          name:'presentation',
          document:{url:'example.pdf'}
        }
      ]
    }
  }
}
bbb.post(data,function (response){
  console.log(response + "\n");
});

// https://npmjs.org/package/xml2json
// https://github.com/buglabs/node-xml2json
// http://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request
