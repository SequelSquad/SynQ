// @flow
import { ADD_COMPONENT } from "../actions/homednd"

const componentState = []

export default function counter(state = componentState, action) {
	switch (action.type) {
	case ADD_COMPONENT:
		// return Object.assign({}, state, action.component)
		return state.concat(action.component)
	default:
		return state
	}
}
