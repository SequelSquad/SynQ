import { SET_MODEL, ADD_COLUMN, ADD_TABLE, REMOVE_MODEL } from "../actions"

const modelsArr = []

export default function models(state = modelsArr, action) {
	switch (action.type) {
	case ADD_TABLE: {
		return state.concat(action.table)
	}
	case SET_MODEL: {
		const newArr = state.filter(model => parseInt(model.id) !== parseInt(action.model.id))
		const model = state.filter(model => parseInt(model.id) === parseInt(action.model.id))[0]
		const updatedModel = Object.assign({}, model, action.model)
		return newArr.concat(updatedModel)
	}
	case ADD_COLUMN: {
		const model = state.filter(model => parseInt(model.id) === parseInt(action.column.id))[0]
		const newArr = state.filter(model => parseInt(model.id) !== parseInt(action.column.id))
		if (!model.dataValues) {
			model.dataValues = []
		}
		model.dataValues.push(action.column)
		return newArr.concat([model])
	}
	case REMOVE_MODEL: {
		const newArr = state.filter(model => parseInt(model.id) !== parseInt(action.modelID))
		return newArr
	}
	default:
		return state
	}
}
