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
	return `\n\t${ColumnName}:{\n${ColumnProperties}}`
}
//column properties: Sequelize.TYPE
functions.type = (type) =>{
	return `\t\ttype: Sequelize.${type},`
}
//Column properties: Boolean value property (etc allowNull, isEmail, isURL)
functions.boolean = (property, bool) => {
	return `\n\t\t${property}: ${bool},`
}
//Column properties: VALIDATE
functions.validate = (validationStr) =>{
	return `\n\t\tvalidate: {\t${validationStr}}`
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

functions.columnArrays = (model) => {
	let columnArrStr = `\nlet ${model.name}Promises = []\n`
	model.dataValues.forEach((value) => {
		columnArrStr += `let ${value.name} = []\n`
	})
	return columnArrStr
}

functions.seedColumns = (model) => {
	let columnSeedLoopStr = "for (var i = 0; i < 50; i++) {"
	model.dataValues.forEach((value) => {
		if (value.type === "STRING" ||
				value.type === "TEXT"){
			columnSeedLoopStr += `\n\t${value.name}.push(chance.string())`
		}
		else if (value.type === "INTEGER" ||
				value.type === "REAL" ||
				value.type === "DOUBLE" ||
				value.type === "DECIMAL" ||
				value.type === "FLOAT"){
			columnSeedLoopStr += `\n\t${value.name}.push(chance.integer())`
		}
		else if (value.type === "BOOLEAN"){
			columnSeedLoopStr += `\n\t${value.name}.push(chance.bool())`
		}
		else if (value.type === "DATE"){
			columnSeedLoopStr += `\n\t${value.name}.push(chance.date())`
		}
		else{
			columnSeedLoopStr += `\n\t${value.name}.push(chance.string())`
		}
	})
	columnSeedLoopStr += "\n}"
	return columnSeedLoopStr
}

functions.createModelPromises = (model) => {
	let promisesStr =
				`\n${model.dataValues[0].name}.map((val, idx) => {\n\t${model.name}Promises.push(${model.name}.create({`
	model.dataValues.forEach((value) => {
		promisesStr += `\n\t ${value.name}: ${value.name}[idx],`
	})
	promisesStr += "\n\t}))\n})"
	return promisesStr
}

functions.resolvePromises = (modelsArr, state) => {
	let modelsNameArr = modelsArr.map((id) => {
		return state.models.filter((model) => model.id === id)[0].name
	})

	let resolvePromisesStr = ""

	modelsNameArr.forEach((model) => {
		if (resolvePromisesStr !== ""){
			resolvePromisesStr += `\nPromise.all(${model}Promises))\n\t.then(() => `
		}
		else {
			resolvePromisesStr += `\nPromise.all(${model}Promises)\n\t.then(() => `
		}
	})

	resolvePromisesStr += "{\n\t process.exit(0)\n})"

	return resolvePromisesStr
}

functions.setupSeed = (state) => {
	let setupStr = "const db = require('../db')"

	state.models.forEach(model => {
		setupStr += `\nconst ${model.name} = db.model(${model.name})`
	})

	setupStr += "\nconst Chance = require(chance) \nconst chance = new Chance()\nconst chalk = require(chalk)"

	return setupStr
}
export default functions
