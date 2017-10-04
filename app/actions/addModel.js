//ACTION TYPE
export const ADD_MODEL = "ADD_MODEL"
export const MOVE_POSITION = "MOVE_POSITION"


//ACTION CREATOR
export const addModel = model => ({type: ADD_MODEL, model})
export const movePosition = model => ({type: MOVE_POSITION, model})
