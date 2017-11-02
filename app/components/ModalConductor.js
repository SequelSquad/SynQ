import React from "react"
import Form from "./Form"
import DBForm from "./DBForm"
import QueryForm from "./QueryForm"
import {connect} from "react-redux"


const ModalConductor = props => {
	switch (props.currentModal) {
	case "POP_UP":
		return <Form {...props} />
	case "DB_HOME":
		return <DBForm {...props} />
	case "QUERY_FORM":
		return <QueryForm {...props} />
	default:
		return null
	}
}

export default connect(state => state)(ModalConductor)
