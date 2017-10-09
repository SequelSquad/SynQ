const chai = require("chai")
chai.use(require("chai-fs"))
const assert = chai.assert
const Generator = require("../../background/generator")

describe("Tests for generator function", function(){
	//check
	let store ={
		path: "",
		models: [{
			id: 0,
			name: "Puppies",
			dataValues: [{
				name: "Owner",
				type: "STRING",
				boolean: "",
				validate: [{}]
			}]
		}]
	}

	Generator(store)

	describe("generator function creates a directory", function(){
		it("should take in the store state as an input and create a single directory database folder", function(){
			assert.isDirectory(store.path)
		})
	})

	describe("generator function creates a file for each model", function(){
		it("should take in the store state as an input and create files for each model", function(){
			assert.isDirectory(store.path + "/puppies")
		})
	})
})
