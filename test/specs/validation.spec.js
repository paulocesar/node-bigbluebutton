var assert = require('assert')
  , validation = require('../../lib/validation');

describe("validation", function (){

  describe("data",function () {
    it("should throw a error on null data",function () {
      var result = validation.bbb(null);
      result.success.should.eql(false);
      result.message.should.eql("Undefined params");
    });

  });

  describe("action",function () {

    it("should throw without an action",function () {
      var result = validation.bbb({});
      result.success.should.eql(false);
      result.message.should.eql("Cannot recognized action");
    });

    it("should have only letters, numbers, _ and -",function () {
      var result = validation.bbb({action: "sample_23-1"});
      result.success.should.eql(false);
      result.message.should.eql("Cannot recognized action");
    });

  });

});