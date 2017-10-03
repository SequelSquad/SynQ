import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel} from "../actions"
import update from "react-addons-update"

class Column extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			name: "",
			type: ""
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		// this.onHandleSubmit = this.onHandleSubmit.bind(this)
	}

	onHandleChange(evt) {
		this.setState({[evt.target.name]: evt.target.value})
	}

	onSave(){

	}

	render() {
		console.log(this.state)
		return (
			<form>
				<span>
					<input type="text" name="name" onChange={this.onHandleChange}></input>
					<input type="text" name="type" onChange={this.onHandleChange}></input>
					<button>Save</button>
				</span>
			</form>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSave(state) {
			console.log("****************", state)
			dispatch(setModel(state))
		}
	}
}

export default connect(state => state, mapDispatchToProps)(Column)
