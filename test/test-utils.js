var assert = require('assert')
  , utils = require('../lib/utils');

describe("Utils", function (){



  describe("addSlashIfNeed", function () {

    it("should add slash at the end",function (){
      link = "http://sample.com";
      assert.equal("http://sample.com/",utils.addSlashIfNeed(link));
    });

    it("shouldn't add slash at the end",function (){
      link = "http://sample.com/";
      assert.equal("http://sample.com/",utils.addSlashIfNeed(link));
    });

  });


  describe("getPortAndHost",function () {

    //TODO

  })

});