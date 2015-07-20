var assert = require('assert')
  , utils = require('../../lib/utils');

describe("Utils", function (){



    describe("addSlashIfNeed", function () {

        it("should add slash at the end",function (){
            var link = "http://sample.com";
            assert.equal("http://sample.com/",utils.addSlashIfNeed(link));
        });

        it("shouldn't add slash at the end",function (){
            var link = "http://sample.com/";
            assert.equal("http://sample.com/",utils.addSlashIfNeed(link));
        });

    });

     describe("getPortAndHost",function () {

        it("should get host, port and path", function () {
            var link = "http://sample:10/hello/world",
                data = utils.hostData(link);

            data.host.should.eql('sample');
            data.port.should.eql('10');
            data.path.should.eql('/hello/world');
        });

    });

});
