// @flow
import { ADD_MODEL, MOVE_POSITION} from "../actions"

const modelState = []

export default function addModel(state = modelState, action) {
	switch (action.type) {
	case ADD_MODEL:
		return state.concat(action.model)
	case MOVE_POSITION:
		return state.filter(model => model.id !==  action.model.id).concat(action.model)
	default:
		return state
	}
}
