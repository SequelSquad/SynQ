// @flow
import { combineReducers } from "redux"
import { routerReducer as router } from "react-router-redux"
import counter from "./counter"
import addModel from "./addModel"
import currentModal from "./modals"
import models from "./models"
import currRect from "./currRect"

const rootReducer = combineReducers({
	counter,
	router,
	addModel,
	models,
	currentModal,
	currRect
})

export default rootReducer
