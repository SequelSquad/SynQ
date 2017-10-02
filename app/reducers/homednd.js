// @flow
import { ADD_COMPONENT, MOVE_POSITION } from "../actions/homednd"

const componentState = []

export default function counter(state = componentState, action) {
	switch (action.type) {
	case ADD_COMPONENT:
		// return Object.assign({}, state, action.component)
		return state.concat(action.component)
	case MOVE_POSITION:
		return state.filter(component => component.id !==  action.component.id).concat(action.component)
	default:
		return state
	}
}
