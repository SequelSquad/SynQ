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
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	onHandleChange(evt) {
		this.setState({[evt.target.name]: evt.target.value})
	}

	handleSubmit(){
		console.log("SAVE STATE", this.state)
		this.props.onSave(this.state)
	}

	render() {
		return (
			// <div>
			// 	<span>
			// 		<form>
			// 			<input type="text" name="name" onChange={this.onHandleChange}></input>
			// 			<input type="text" name="type" onChange={this.onHandleChange}></input>
			// 			<Button type="button" onClick={this.handleSubmit}>Save</Button>
			// 		</form>
			// 	</span>
			// </div>
			<div>
				<span>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
						New Column
						</Col>
						<Col sm={10}>
							<FormControl type="column" placeholder="Add Column" name = "name" onChange = {this.onHandleChange} />
							<FormControl type="column" placeholder="Add Column" name = "type" onChange = {this.onHandleChange} />
							<Button bsStyle="info" type="button" onClick={this.handleSubmit}>Save</Button>
						</Col>
					</FormGroup>
				</span>
			</div>
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
			console.log("^^^^^^^^^^^^^^",state)
			dispatch(addColumn(state))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)
