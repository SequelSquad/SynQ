// @flow
import {ADD_LINE} from "../actions/lines"

const linesState = []

export default function line(state = linesState, action) {
	switch (action.type) {
	case ADD_LINE:
		return state.concat(action.line)
	default:
		return state
	}
}
