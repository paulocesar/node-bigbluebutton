node-bigbluebutton
==================

Integration between BigBlueButton server and Node.js Applications. Read the Wiki to learn more (<https://code.google.com/p/bigbluebutton/wiki/API>)

###Install

    npm install bigbluebutton
    
###Usage

First, you have to setup the server configuration. Run `bbb-conf --salt` on server to get the **salt** and **url**, then put in your node.js application

    var bbb = require('bigbluebutton);
    
    bbb.salt = '99999999999999999999999';
    bbb.url = 'http://localhost/bigbluebutton';
    
Now you can access the BigBlueButton API easely. You can see some example bellow.

###Examples

Generate a join link:

    data = {
      action: 'join',
      params: {
        fullName: 'Test Meeting',
        meetingID: 'exampleaew',
        password: 'WWoon2G8'
      }
    }
    
    link = bbb.link(data);

GET meeting list request:

    data = {
      action: 'getMeetings',
    }
    
    bbb.get(data,function (response){
      console.log(response);
    });
    
POST meeting creation request with a presentation:

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
    
    bbb.post(data,function (response){
      console.log(response);
    }); 
    
POST or GET response example:

    {
      "response":
      {
        "returncode":"SUCCESS",
        "meetings":{},
        "messageKey":"noMeetings",
        "message":"no meetings were found on this server"
      }
    }
    
###Other BigBlueButton API methods
<https://code.google.com/p/bigbluebutton/wiki/API#API_Calls>

###Contributors

* Paulo César (<pauloc062@gmail.com>)

###Thanks

* <https://github.com/buglabs/node-xml2json>
* <http://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request>
