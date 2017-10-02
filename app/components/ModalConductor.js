import React from "react"
import Form from "./Form"
import {connect} from "react-redux"


const ModalConductor = props => {
	switch (props.currentModal) {
	case "POP_UP":
		return <Form {...props} />
	default:
		return null
	}
}

export default connect(state => state)(ModalConductor)
