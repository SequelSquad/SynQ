const functions = {}

functions.setup = (table) => {
	return `var Sequelize = require('sequelize')
  var db = require('../index.js')
  module.exports = db.define(${table})`
}

//Start Table
functions.table = (TableName, TableProperties) => {
	console.log("creating table")
	return `'${TableName}',{  ${TableProperties}\n}`
}
//create column
functions.column = (ColumnName, ColumnProperties) => {
	console.log("creating column")
	return `\n\t${ColumnName}:{\n${ColumnProperties}}`
}
//column properties: Sequelize.TYPE
functions.type = (type) =>{
	console.log("creating type")
	return `\t\ttype: Sequelize.${type},`
}
//Column properties: Boolean value property (etc allowNull, isEmail, isURL)
functions.boolean = (property, bool) => {
	console.log("creating allowNull")
	return `\n\t\t${property}: ${bool}`
}
//Column properties: VALIDATE
functions.validate = (validationStr) =>{
	console.log("Creating validation")
	return `,\n\t\tvalidate: {\t${validationStr}}`
}

functions.associations = (source, target, association) => {
	return `${source}.${association}(${target})\n`
}

functions.requireModel = (name) =>{
	let fileName = name.toLowerCase()
	return `const ${name} = require('./${fileName}')\n`
}

functions.exportModels = (modelArr) => {
	let modelList = modelArr.join(", \n")
	return `\nmodule.export = {\n${modelList}\n}`
}
//functions.indexSetup = ()

export default functions
