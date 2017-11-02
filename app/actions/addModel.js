//ACTION TYPE
import {loadTables, loadColumns, loadTableForeignKeys} from "../utils/connectDb"
import {setModel} from "./modelAction"
import {addLine} from "./lines"
export const ADD_MODEL = "ADD_MODEL"
export const MOVE_POSITION = "MOVE_POSITION"
export const REMOVE_REC = "REMOVE_REC"
export const REMOVE_ALL_RECS = "REMOVE_ALL"
const _ = require("lodash")


//ACTION CREATOR
export const addModel = model => ({type: ADD_MODEL, model})
export const movePosition = model => ({type: MOVE_POSITION, model})
export const removeRec = modelID => ({type: REMOVE_REC, modelID})
export const removeAllRecs = () => ({type: REMOVE_ALL_RECS})

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

						return mergedArr
					})
					.then((mergedArr) => {
						let foreignKeyPromises = response.map((table, i) => {
							return loadTableForeignKeys({db, table, id: id + i })
						})

						Promise.all(foreignKeyPromises)
							.then((result) => {
								let relationshipsArr = result.filter((arr) => arr.length > 0)[0]
								let refinedRelationshipArr = relationshipsArr.map((relationshipObj) => {
									return Object.assign(relationshipObj, {Table2: mergedArr.filter((obj) => obj.name === relationshipObj.Table2)[0].id})
								})
								dispatch(addLine(refinedRelationshipArr))
							})
					})
			})
			.catch(err => console.log(err))
	}
