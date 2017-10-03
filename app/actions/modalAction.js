//ACTION TYPE
export const SET_MODAL = "SET_MODAL"
export const REMOVE_MODAL = "REMOVE_MODAL"

//ACTION CREATOR
export const setModal = modal => ({type: SET_MODAL, modal})
export const removeModal = () => ({type: REMOVE_MODAL})
