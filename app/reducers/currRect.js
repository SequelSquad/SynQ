import { SET_CURR_RECT } from "../actions"
const selectedRect = 0

export default (state = selectedRect, action) => {
	switch(action.type){
	case SET_CURR_RECT:
		return action.id
	default:
		return state
	}
}
