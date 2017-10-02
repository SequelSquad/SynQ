//ACTION TYPE
export const ADD_COMPONENT = "ADD_COMPONENT"
export const MOVE_POSITION = "MOVE_POSITION"


//ACTION CREATOR
export const addComponent = component => ({type: ADD_COMPONENT, component})
export const movePosition = component => ({type: MOVE_POSITION, component})
