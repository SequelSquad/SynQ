//ACTION TYPE
export const SET_MODEL = "SET_MODEL"
export const ADD_TABLE = "ADD_TABLE"
// export const REMOVE_MODEL = "REMOVE_MODEL"

//ACTION CREATOR
export const setModel = model => ({type: SET_MODEL, model})
export const addTable = table => ({type: ADD_TABLE, table})
// export const removeModal = () => ({type: REMOVE_MODAL})
