// @flow
import { combineReducers } from "redux"
import { routerReducer as router } from "react-router-redux"
import counter from "./counter"
import homednd from "./homednd"
import currentModal from "./modals"
import models from "./models"
import lines from "./lines"

const rootReducer = combineReducers({
	counter,
	router,
	homednd,
	models,
	currentModal,
	lines
})

export default rootReducer
