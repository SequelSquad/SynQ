//ACTION TYPE
export const SET_MODAL = "SET_MODAL"
export const REMOVE_MODAL = "REMOVE_MODAL"
export const SET_CURR_RECT = "SET_CURR_RECT"

//ACTION CREATOR
export const setModal = modal => ({type: SET_MODAL, modal})
export const removeModal = () => ({type: REMOVE_MODAL})
export const setCurrRect = id => ({type: SET_CURR_RECT, id})

