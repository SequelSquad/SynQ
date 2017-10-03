import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel} from "../actions"
import update from "react-addons-update"
import {addColumn} from "../actions"

class Column extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			id: this.props.id,
			name: "",
			type: ""
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		// this.onHandleSubmit = this.onHandleSubmit.bind(this)
	}

	onHandleChange(evt) {
		this.setState({[evt.target.name]: evt.target.value})
	}

	render() {
		console.log(this.state)
		return (
			<form>
				<span>
					<input type="text" name="name" onChange={this.onHandleChange}></input>
					<input type="text" name="type" onChange={this.onHandleChange}></input>
					<button type="button" onClick={this.props.onSave}>Save</button>
				</span>
			</form>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		id: state.currRect
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSave(state) {
			dispatch(addColumn(state))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)
