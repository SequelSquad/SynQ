const chai = require("chai")
chai.use(require("chai-fs"))
const assert = chai.assert
const Generator = require("../../background/generator")

describe("Tests for generator function", function(){

  let store = ""
  Generator(store)

	describe("generator function creates a directory", function(){
		it("should take in the store state as an input and create a single directory database folder", function(){
      assert.isDirectory(store.path, ?msg)
		})
  })

  describe("generator function creates a file for each model", function(){
		it("should take in the store state as an input and create files for each model", function(){
      assert.isDirectory(store.path, ?msg)
		})
  })

  describe("generator function creates a file for each model that contains content about the respective model", function(){
		it("should take in the store state as an input and create content about the model for each file", function(){
      expect(store.path).to.be.a.file(?msg).with.content(data, ?msg);
		})
  })

})
