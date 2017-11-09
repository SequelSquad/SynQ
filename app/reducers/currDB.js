import { SET_CURR_DB } from "../actions"
const selectedDB = null

export default (state = selectedDB, action) => {
	switch(action.type){
	case SET_CURR_DB:
		return action.id
	default:
		return state
	}
}
