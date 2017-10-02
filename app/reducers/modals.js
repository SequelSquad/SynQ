import { SET_MODAL, REMOVE_MODAL } from "../actions/modalAction"
const currentModal = ""

export default (state = currentModal, action) => {
	switch(action.type){
	case SET_MODAL:
		return action.modal
	case REMOVE_MODAL:
		return ""
	default:
		return state
	}
}

