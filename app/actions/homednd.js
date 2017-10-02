//ACTION TYPE
export const ADD_COMPONENT = "ADD_COMPONENT"
export const MOVE_POSITION = "MOVE_POSITION"
export const SUBMIT_INFO = "SUBMIT_INFO"


//ACTION CREATOR
export const addComponent = component => ({type: ADD_COMPONENT, component})
export const movePosition = component => ({type: MOVE_POSITION, component})
export const submitInfo = model =>({type: SUBMIT_INFO, model})
