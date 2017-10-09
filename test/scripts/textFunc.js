const chai = require("chai")
const should = chai.should()
const functions = require("../../background/TextFunctions")


describe("Tests for text functions", function(){
	//PASS
	describe("the setup function", function(){
		it("should take in table input name and return a string that requires Sequelize and exports the table using input name", function(){
			functions.setup("Puppies").should.equal("var Sequelize = require('sequelize')\n  var db = require('../index.js')\n  module.exports = db.define(Puppies)")
		})
	})
	//CHECK
	describe("the table function", function(){
		it("should take in a table name and table properties object and return a comma separated string with table name and a table properties object, appended with a new line", function(){
			functions.table("Owner", "TableProperties").should.equal("Puppies, {TableProperties}\n")
		})
	})
	//PASS
	describe("the column function", function(){
		it("should take in a column name and column properties array and return a string starting with a new line and new tab, followed by the column name and colon character, followed by a column properties object that is on a new line", function(){
			functions.column("Owner", ["\t\ttype: Sequelize.INTEGER,", "\n\t\tallowNull: false", ",\n\t\tvalidate: {\t\n\t\tisAlphanumeric: true}"]).should.equal("\n\tOwner:{\n\t\ttype: Sequelize.INTEGER,,\n\t\tallowNull: false,,\n\t\tvalidate: {\t\n\t\tisAlphanumeric: true}}")
		})
	})
	//PASS
	describe("the type function", function(){
		it("should take in a column property type and return a string starting with two tabs, followed by the word type, a colon, and a Sequelize defined type", function(){
			functions.type("INTEGER").should.equal("\t\ttype: Sequelize.INTEGER,")
		})
	})
	//PASS
	describe("the boolean function", function(){
		it("should take in a validation property and a boolean value property and return a string starting with a new line and two tabs, followed by property input and a colon, followed by the boolean input", function(){
			functions.boolean("isEmail", true).should.equal("\n\t\tisEmail: true")
		})
	})
	//PASS
	describe("the validate function", function(){
		it("should take in a validation string and return a string that begins with a comma, new line, and two tabs, followed by the word validate and a colon, followed by a validation string object", function(){
			functions.validate(["\n\t\tisEmail: true", "\n\t\tallowNull: false", "\n\t\tisAlphanumeric: true"]).should.equal(",\n\t\tvalidate: {\t\n\t\tisEmail: true,\n\t\tallowNull: false,\n\t\tisAlphanumeric: true}")
		})
	})
	//PASS
	describe("the associations function", function(){
		it("should take in a source, target, and association, and return a Sequelize string that joins the source and target based on the association input, followed by a new line", function(){
			functions.associations("Puppies", "Owner", "belongsTo").should.equal("Puppies.belongsTo(Owner)\n")
		})
	})
	//PASS
	describe("the requireModel function", function(){
		it("should take in a name input and return a string that declares a require statement from the name input file and assigns the statement to a constant variable that is named the name input, followed by a new tab", function(){
			functions.requireModel("Puppies").should.equal("const Puppies = require('./puppies')\n")
		})

		it("should convert the name input to all lowercase letters", function(){
			let namePath = functions.requireModel("PuPPiEs")
			let newNamePath = namePath.split("/")[1].slice(0, -3)
			newNamePath.should.equal("puppies")
		})
	})
	//PASS
	describe("the exportModels function", function(){
		it("should take in an array of models and return a string that exports the models in an object", function(){
			functions.exportModels(["Puppies", "Owner", "Home"]).should.equal("\nmodule.export = {\nPuppies, \nOwner, \nHome\n}")
		})

		it("should take in an array of models and convert it into a string joined by a comma and a new line", function(){
			let modelExports = functions.exportModels(["Puppies", "Owner", "Home"])
			let modelList = modelExports.slice(19, -2)
			modelList.should.equal("Puppies, \nOwner, \nHome")
		})
	})
})
