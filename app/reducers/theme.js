// @flow
import { SET_THEME } from "../actions"

const theme = ""

export default function addModel(state = theme, action) {
	switch (action.type) {
	case SET_THEME:
		state = action.theme
		return state
	default:
		return state
	}
}
