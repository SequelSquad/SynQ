import { SUBMIT_INFO } from "../actions/homednd"

const modelsArr = []

export default function models(state = modelsArr, action) {
	switch (action.type) {
	case SUBMIT_INFO:
		return state.concat(action.model)
	default:
		return state
	}
}
