import React from "react"
import {Form, Button} from "react-bootstrap"

export default class Column extends React.Component {
	constructor (props){
		super(props)
	}

	render() {
		return (
			<div id="input-error">
				<p>Warning: Your table does not have a name. Do you wish to proceed?</p>
				<Button onClick={this.props.onHandleSubmit}>Yes</Button><Button onClick={this.props.closeError}>No</Button>
			</div>
		)
	}
}
