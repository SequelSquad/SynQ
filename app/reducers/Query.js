import {queryData} from "../utils/connectDb"

/**
 * ACTION TYPES
 */
export const QUERIED_RESULT = "QUERIED_RESULT"


/**
 * ACTION CREATORS
 */
export const queriedResult = result => ({type: QUERIED_RESULT, result})

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
	default:
		return state
	}
}
