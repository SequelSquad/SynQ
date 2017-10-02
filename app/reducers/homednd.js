// @flow
import { ADD_COMPONENT, MOVE_POSITION} from "../actions/homednd"

const componentState = []

export default function homednd(state = componentState, action) {
	switch (action.type) {
	case ADD_COMPONENT:
		return state.concat(action.component)
	case MOVE_POSITION:
		return state.filter(component => component.id !==  action.component.id).concat(action.component)
	default:
		return state
	}
}
