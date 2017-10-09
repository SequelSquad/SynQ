// @flow
import { ADD_MODEL, MOVE_POSITION, REMOVE_REC} from "../actions"

const modelState = []

export default function addModel(state = modelState, action) {
	switch (action.type) {
	case ADD_MODEL:
		return state.concat(action.model)
	case MOVE_POSITION:
		return state.filter(model => model.id !==  action.model.id).concat(action.model)
	case REMOVE_REC:{
		const newArr = state.filter(model => parseInt(model.id) !== parseInt(action.modelID))
		return newArr
	}
	default:
		return state
	}
}
