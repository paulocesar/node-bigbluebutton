var assert = require('assert')
  , parser = require('../../lib/parser');

/**
 * Obs: We assume xml2json methods're correct
 */

describe("parser", function (){


  describe("toUrl", function () {
    it("should return GET params",function(){
      data = {
        "name": "paulo cesar",
        "number": 2934 
      };
      assert.equal(parser.toUrl(data),"name=paulo+cesar&number=2934");
    });
  });

});