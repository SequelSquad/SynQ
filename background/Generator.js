import functions from "./TextFunctions"
import fs from "fs"
import Promise from "bluebird"

export default (state) => {
	const gState = state
	if (!fs.existsSync(gState.path)) {
		console.log("creating folder")
		fs.mkdir(gState.path, () => {
			modelCreator(gState)
			indexCreator(gState)
			seedCreator(gState)
		})
	}
	else {
		modelCreator(gState)
		indexCreator(gState)
		seedCreator(gState)
	}
}

const modelCreator = (state) => {
	state.models.forEach(model => {
		//initiates array of columns to join at the end
		let columnArr = []

		//for each column in our DB, aka 'model.dataValue'
		model.dataValues.forEach(data => {

			//Store the validation strings
			let validateStr = " "
			//Store the boolean strings
			let booleanArr= []

			//if it has validation elements
			if (data.validate){
				let validateArr = []
				data.validate.forEach( validation => {
					let val = functions.boolean(validation[1], validation[2])
					validateArr.push(val)
				})
				let validateJoin = validateArr.join("")
				if(validateJoin === ""){
					validateStr = " "
				}
				else {
					validateStr = functions.validate(validateJoin)
				}
			}

			//Store the type string
			const type = functions.type(data.type)
			let defaultValue = ""
			if(data.defaultValue){
				defaultValue = functions.defaultValues(data.defaultValue)
			}


			//Join everything together!
			const booleanStr = booleanArr.join("")
			let parameters = ""
			if (validateStr !== " "){
				parameters = type.concat(defaultValue, booleanStr, validateStr)
			}
			else {
				parameters = type.concat(defaultValue, booleanStr)
			}

			//create the column string
			const column = functions.column(data.name,parameters)

			//push the column string to the column array
			columnArr.push(column)
		})

		//Join all the columns into a single string
		const allMyData = columnArr.join()

		//pass the columns string into the table
		const table = functions.table(model.name, allMyData)

		//pass the table in the setup function
		const finalFile = functions.setup(table)

		fs.writeFile(state.path + `/${model.name}.js`, finalFile, (err) => {
			if (err) {
				console.log("Where's the input?", err)
			}
			else {
				console.log("wrote file")
			}
		})
		return "done"
	})

	// }
}

const indexCreator = (state) => {
	let assoArr = []
	let modelsArr = []
	let tablesArr = []

	if(state.lines.length){
		state.lines.forEach(line => {
			let source = ""
			let target = ""
			state.models.forEach(model => {
				if(line.Table1 === model.id){
					source = model.name
				}
			})
			state.models.forEach(model => {
				if(line.Table2 === model.id){
					target = model.name
				}
			})
			let str = functions.associations(source, target, "belongsTo")
			assoArr.push(str)
		})
	}

	state.models.map(model => {
		modelsArr.push(model.name)
	})

	modelsArr.forEach(model => {
		let modelRequire = functions.requireModel(model)
		tablesArr.push(modelRequire)
	})

	let exportString = functions.exportModels(modelsArr)

	let modelsRequireStatement = tablesArr.join("")
	let fileContent = assoArr.join("")
	let finalFile = modelsRequireStatement.concat(fileContent, exportString)

	fs.writeFile(state.path + "/index.js", finalFile, (err) => {
		if (err) {
			console.log("Where's the input?")
		}
		else {
			console.log("wrote file")
		}
	})
}



const seedCreator = (state) => {
	const generateOrder = (state) => {
		let result = []

		const reorder = (arr, b, a) => {
			let indexA = arr.indexOf(a)
			let indexB = arr.indexOf(b)
			let temp = arr[indexB]
			arr.splice(indexB, 1)
			arr.splice(indexA, 0, temp)
		}

		state.models.forEach((model) => {
			result.push(model.id)
		})

		let associations = state.lines

		associations.forEach((association) => {
			switch (association.Relationship) {
			case "hasOne": {
				if (result.indexOf(association.Table1) > result.indexOf(association.Table2)) {
					reorder(result, association.Table1, association.Table2)
				}
				break
			}
			case "hasMany": {
				if (result.indexOf(association.Table1) > result.indexOf(association.Table2)) {
					reorder(result, association.Table1, association.Table2)
				}
				break
			}
			case "belongsTo": {
				if (result.indexOf(association.Table1) < result.indexOf(association.Table2)) {
					reorder(result, association.Table1, association.Table2)
				}
				break
			}
			case "belongsToMany":
			}

		})

		return result
	}
	let seedFileStr = functions.setupSeed(state)
	state.models.forEach((model) => {
		seedFileStr += functions.columnArrays(model) + "\n" + functions.seedColumns(model) + "\n" + functions.createModelPromises(model)
	})

	seedFileStr += functions.resolvePromises(generateOrder(state), state)


	fs.writeFile(state.path + "/seed.js", seedFileStr, (err) => {
		if (err) {
			console.log("Where's the input?")
		}
		else {
			console.log("wrote file")
		}
	})

}
