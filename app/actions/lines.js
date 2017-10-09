//ACTION TYPE
export const ADD_LINE = "ADD_LINE"
export const REMOVE_LINE = "REMOVE_LINE"
export const SELECT_LINE = "SELECT_LINE"

//ACTION CREATOR
export const addLine = line => ({type: ADD_LINE, line})
export const removeLine = id => ({type: REMOVE_LINE, id})
export const selectLine = lines => ({type: SELECT_LINE, lines})
