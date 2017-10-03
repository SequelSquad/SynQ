// @flow
import { combineReducers } from "redux"
import { routerReducer as router } from "react-router-redux"
import counter from "./counter"
import homednd from "./homednd"
import currentModal from "./modals"
import models from "./models"

const rootReducer = combineReducers({
	counter,
	router,
	homednd,
	models,
	currentModal
})

export default rootReducer
