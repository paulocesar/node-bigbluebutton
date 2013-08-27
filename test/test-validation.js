var assert = require('assert')
  , validation = require('../lib/validation');

/**
 * Obs: We assume xml2json methods're correct
 */

describe("validation", function (){

  // TODO
  describe("data",function () {
    it("should throw a error on null data",function (done) {
      data = null;
      validation(data,function(er){
        if(!er) throw Error("Should have an error");
        done()
      })
    })

  })

  describe("action",function () {

    it("should throw without an action",function (done) {
      data = {}
      validation(data,function(er){
        if(!er) throw Error("Should have an error");
        done()
      })
    })

    it("should have only letters, numbers, _ and -",function (done) {
      data = {action: "sample_23-1"};
      validation(data,function(er){
        if(er) throw er;
      })
      data = {action: "sample_23-1*&!@#"};
      validation(data,function(er){
        if(!er) throw Error("Should have an error");
        done();
      })
    })

  })

})