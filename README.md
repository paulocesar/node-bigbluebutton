node-bigbluebutton
==================

Integration between BigBlueButton server and Node.js Applications. Read the Wiki to learn more (<https://code.google.com/p/bigbluebutton/wiki/API>)

###Install

    npm install bigbluebutton
    
###Usage

First, you have to setup the server configuration. Run `bbb-conf --salt` on server to get the **salt** and **url**, then put in your node.js application

```javascript
var BigBlueButton = require('bigbluebutton')
  , url = 'http://localhost/bigbluebutton'
  , secret = '99999999999999999999999'
  , bbb = new BigBlueButton(url, secret);
```

Now you can access the BigBlueButton API easely. You can see some example bellow.

###Examples

Generate a join link:

```javascript
data = {
  action: 'join',
  params: {
    fullName: 'Test Meeting',
    meetingID: 'exampleaew',
    password: 'WWoon2G8'
  }
}

var link = bbb.link(data);
```

GET meeting list request:

```javascript
data = {
  action: 'getMeetings',
}

bbb.request(data, function (err, data) {
  console(err, data);
});
```
    
POST meeting creation request with a presentation. You can use [Q](https://github.com/kriskowal/q) with `requestQ`:

```javascript
data = {
  action: 'create',
  params: { 
    meetingID: 'exampleaew',
    meetingName: 'Example Aew',
    moderatorPW: 'exemplo123asd'
  },
  body: {
    modules: {
      module: [
        {
          name:'presentation',
          document:{url:'http://www.samplepdf.com/sample.pdf'}
        }
      ]
    }
  }
}

bbb.requestQ(data)
  .then(function (response) { console.log(response); })
  .fail(function (err) { console.log(err); });
```
    
POST or GET response example:

```javascript
{
  "response":
  {
    "returncode":"SUCCESS",
    "meetings":{},
    "messageKey":"noMeetings",
    "message":"no meetings were found on this server"
  }
}
```
    
###Other BigBlueButton API methods
<https://code.google.com/p/bigbluebutton/wiki/API#API_Calls>

###Contributors

* Paulo César (<pauloc062@gmail.com>)

###Thanks

* <https://github.com/buglabs/node-xml2json>
* <http://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request>
