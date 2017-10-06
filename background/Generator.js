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
		})
	}
	else {
		modelCreator(gState)
		indexCreator(gState)
	}
}

const modelCreator = (state) => {
	// if (err) {
	//   console.log("failed to create dir", err)

	// } else {
	state.models.forEach(model => {
		//initiates array of columns to join at the end
		let columnArr = []

		//for each column in our DB, aka 'model.dataValue'
		model.dataValues.forEach(data => {

			//Store the validation strings
			let validateStr = " "
			//Store the boolean strings
			let booleanArr= []

			//if it has boolean elements
			if (data.boolean){
				data.boolean.forEach( bool => {
					let val = functions.boolean(bool[0], bool[1])
					booleanArr.push(val)
				})
			}

			//if it has validation elements
			if (data.validate){
				let validateArr = []
				data.validate.forEach( validation => {
					let val = functions.boolean(validation[0], validation[1])
					validateArr.push(val)
				})
				let validateJoin = validateArr.join()
				validateStr = functions.validate(validateJoin)
			}

			//Store the type string
			const type = functions.type(data.type)

			//Join everything together!
			const booleanStr = booleanArr.join()
			const parameters = type.concat(booleanStr, validateStr)

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
	console.log("state at index creator", state)
	if (state.lines.length){
		let assoArr = []
		let modelsArr = []
		let tablesArr = []

		state.lines.forEach(line => {
			let source = ""
			let target = ""
			state.models.forEach(model => {
				//console.log("SOURCE lineID", line.Table1, "modelId", model.id)
				if(line.Table1 === model.id){
					//console.log("WHAT I AM PUSHING SOURCE", model.name)
					source = model.name
				}
			})
			state.models.forEach(model => {
				//console.log("TARGET lineID", line.Table2, "modelId", model.id)
				if(line.Table2 === model.id){
					//console.log("WHAT I AM PUSHING TARGET", model.name)
					target = model.name
				}
			})
			console.log("source", source, "target", target)
			let str = functions.associations(source, target, "belongsTo")
			assoArr.push(str)
		})

		state.models.map(model => {
			modelsArr.push(model.name)
		})

		modelsArr.forEach(model => {
			let modelRequire = functions.requireModel(model)
			tablesArr.push(modelRequire)
		})
		console.log("modelsArr ", modelsArr)
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
}
