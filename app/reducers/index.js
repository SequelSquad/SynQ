// @flow
import { combineReducers } from "redux"
import { routerReducer as router } from "react-router-redux"
import counter from "./counter"
import homednd from "./homednd"

const rootReducer = combineReducers({
	counter,
	router,
	homednd
})

export default rootReducer
