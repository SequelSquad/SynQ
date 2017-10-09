// @flow
import {ADD_LINE} from "../actions/lines"
import {REMOVE_LINE, SELECT_LINE} from "../actions/lines"
const linesState = []

export default function line(state = linesState, action) {
	switch (action.type) {
	case ADD_LINE:{
		let existingAssoc = action.line.map((assoc) => assoc.id)
		let newState = state.filter((assoc) => !existingAssoc.includes(assoc.id))
		return newState.concat(action.line)
	}
	case REMOVE_LINE:
		return state.filter((assoc) => assoc.id !== action.id)
	case SELECT_LINE:{
		return state.filter((assoc) => {
			return (action.lines.includes(assoc.Table1) || action.lines.includes(assoc.Table2))
		})
	}
	default:
		return state
	}
}
