// @flow
import { combineReducers } from "redux"
import { routerReducer as router } from "react-router-redux"
import counter from "./counter"
import homednd from "./homednd"
import currentModal from "./modals"

const rootReducer = combineReducers({
	counter,
	router,
	homednd,
	currentModal
})

export default rootReducer
