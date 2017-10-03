import { SET_MODEL, ADD_COLUMN } from "../actions"

const modelsArr = []

export default function models(state = modelsArr, action) {
	switch (action.type) {
	case SET_MODEL:
		return state.concat([action.model])
	case ADD_COLUMN:
	{
		const model = state.filter(model => model.id === action.column.id)
		if (!model.dataValues.length) {
			model.dataValues = []
		}
		model.dataValues.push(action.column)
		return state
	}
	default:
		return state
	}
}
