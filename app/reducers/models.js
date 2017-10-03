import { SET_MODEL } from "../actions/modelAction"

const modelsArr = []

export default function models(state = modelsArr, action) {
	switch (action.type) {
	case SET_MODEL:
		return state.concat([action.model])
	default:
		return state
	}
}
