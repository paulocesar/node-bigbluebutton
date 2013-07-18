node-bigbluebutton
==================

Integration between BigBlueButton and Node.js Applications.

###Install

    npm install node-bigbluebutton
    
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

Get meeting list request:

    data = {
      action: 'getMeetings',
    }
    
    bbb.get(data,function (response){
      console.log(response);
    });
    
Post meeting creation request with a presentation:

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
    
###Other BigBlueButton API methods
<https://code.google.com/p/bigbluebutton/wiki/API#API_Calls>

###Contributors

* Paulo César (<pauloc062@gmail.com>)

###Thanks

* <https://github.com/buglabs/node-xml2json>
* <http://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request>