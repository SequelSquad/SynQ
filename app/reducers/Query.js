import {queryData} from "../utils/connectDb"

/**
 * ACTION TYPES
 */
export const QUERIED_RESULT = "QUERIED_RESULT"
export const FILTER = "FILTER"


/**
 * ACTION CREATORS
 */
export const queriedResult = result => ({type: QUERIED_RESULT, result})
export const filterQuery = (x,y) => ({type: FILTER, x, y})

/**
 * THUNK CREATORS
 */
export const fetchQuery = (queryInfo) =>
	dispatch => {
		const result = queryData(queryInfo)
		result
			.then(response => {
				if (!response) return console.log("Query results undefined.")
				dispatch(queriedResult(response))
			})
			.catch(err => console.log(err))
	}

/**
 * REDUCER
 */

export default function (state = [], action) {
	switch (action.type) {
	case QUERIED_RESULT:
		return action.result
	case FILTER: {
		const newArr = state.map((obj) => {
			return Object.assign({}, {x: obj[action.x], y: obj[action.y]})
		})
		return newArr
	}
	default:
		return state
	}
}
