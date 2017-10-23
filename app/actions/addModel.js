//ACTION TYPE
import {loadTables, loadColumns} from "../utils/connectDb"
import {setModel} from "./modelAction"
export const ADD_MODEL = "ADD_MODEL"
export const MOVE_POSITION = "MOVE_POSITION"
export const REMOVE_REC = "REMOVE_REC"
const _ = require("lodash")


//ACTION CREATOR
export const addModel = model => ({type: ADD_MODEL, model})
export const movePosition = model => ({type: MOVE_POSITION, model})
export const removeRec = modelID => ({type: REMOVE_REC, modelID})

//thunk

export const addModelThunk = (db) =>
	dispatch => {
		loadTables(db)
			.then((response) => {

				const id =  Date.parse(new Date)

				let rectArr = response.map((table, i) => {
					return {id: id + i, top: 50*i, left: 50*i }
				})

				dispatch(addModel(rectArr))

				let modelArr = response.map((table, i) => {
					return {id:id + i, name: table, dataValues:[]}
				})

				let promises = response.map((table, i) => {
					return loadColumns({db, table, id: id + i})
				})

				let mergedArr = []
				Promise.all(promises)
					.then((result) => {
						mergedArr = _(modelArr)
							.concat(result)
							.groupBy("id")
							.map(_.spread(_.merge))
							.value()
						mergedArr.forEach((model) => {
							dispatch(setModel(model))
						})
					})

			})
			.catch(err => console.log(err))
	}
