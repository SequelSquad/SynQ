// @flow
import { SET_THEME } from "../actions"

const DarkOrLight = true

export default function addModel(state = DarkOrLight, action) {
	switch (action.type) {
	case SET_THEME:
		state = !state
		return state
	default:
		return state
	}
}
