//ACTION TYPE
export const SET_MODEL = "SET_MODEL"
export const ADD_TABLE = "ADD_TABLE"
export const REMOVE_MODEL = "REMOVE_MODEL"
// export const REMOVE_MODEL = "REMOVE_MODEL"

//ACTION CREATOR
export const setModel = model => ({type: SET_MODEL, model})
export const addTable = table => ({type: ADD_TABLE, table})
export const removeModel = modelID => ({type: REMOVE_MODEL, modelID})


export const addModelThunk = (db) =>
	dispatch => {
		loadTables(db)
			.then((response) => {
				let rectArr = response.map((table, i) => {
					return {id: Date.parse(new Date) + i, top: 50*i, left: 50*i }
				})
				dispatch(addModel(rectArr))
			}
			)
			.catch(err => console.log(err))
	}



