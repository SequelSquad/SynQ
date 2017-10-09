//ACTION TYPE
export const ADD_MODEL = "ADD_MODEL"
export const MOVE_POSITION = "MOVE_POSITION"
export const REMOVE_REC = "REMOVE_REC"


//ACTION CREATOR
export const addModel = model => ({type: ADD_MODEL, model})
export const movePosition = model => ({type: MOVE_POSITION, model})
export const removeRec = modelID => ({type: REMOVE_REC, modelID})
