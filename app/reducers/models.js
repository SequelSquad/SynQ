import { SET_MODEL, ADD_COLUMN } from "../actions"

const modelsArr = []

export default function models(state = modelsArr, action) {
	switch (action.type) {
	case SET_MODEL: {
		// console.log("##############", action.model)
		const newArr = state.filter(model => model.id === !action.model.id)
		return newArr.concat([action.model])
	}
	case ADD_COLUMN: {
		const model = state.filter(model => model.id === action.column.id)[0]
		const newArr = state.filter(model => model.id !== action.column.id)
		if (!model.dataValues) {
			model.dataValues = []
		}
		model.dataValues.push(action.column)
		return newArr.concat([model])
	}
	default:
		return state
	}
}
