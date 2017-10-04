// @flow
import { SET_PATH } from "../actions"

const pathState = ""

export default function path(state = pathState, action) {
	switch (action.type) {
	case SET_PATH:
		return action.path
	default:
		return state
	}
}
