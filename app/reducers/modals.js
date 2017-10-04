import { SET_MODAL, REMOVE_MODAL, SET_CURR_RECT } from "../actions"
const Modal = ""

export default (state = Modal, action) => {
	switch(action.type){
	case SET_MODAL:
		return action.modal
	case REMOVE_MODAL:
		return ""
	default:
		return state
	}
}

