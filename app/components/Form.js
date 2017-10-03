import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel} from "../actions"
import update from "react-addons-update"
import Column from "./Column"

class PopUp extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			name: "H",
			dataValues: [{
				name: "",
				properties:{
					type: ""
				}
			}]
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.onHandleSubmit = this.onHandleSubmit.bind(this)
	}

	onHandleChange(evt){
		console.log(this.state)
	  // let newState = {}
		// newState[evt.target.name] = evt.target.value
		// console.log(newState)
		this.setState(update(this.state, {
			name: {$set: evt.target.value}
		}))
		this.setState(update(this.state, {
			dataValues: {
				[0]: {
					name: {$set: evt.target.value}
				}
			}
		}))
		this.setState(update(this.state, {
			dataValues: {
				[0]: {
					properties: {
						type: {$set: evt.target.value}
					}
				}
			}
		}))
		// const newData = update(this.state, {
		// 	name: {$set: evt.target.modelname.value},
		// 	dataValues: {
		// 		[0]: {
		// 			name: {$set: evt.target.columnName.value},
		// 			properties: {
		// 				type: {$set: evt.target.columnType.value}
		// 			}
		// 		}
		// 	}
		// })
		// this.setState(newData)
	}

	onHandleSubmit(){
		console.log("SUBMIT??")
		this.props.handleSubmit(this.state)
	}

	render() {
		console.log(this.state)
		return (
			<Modal className="signInModal" bsSize="small" show = {true} onHide = {() => {
				this.props.handleRemoveModal()}} >
				<Modal.Header closeButton>
					<Modal.Title>Create Model</Modal.Title>
				</Modal.Header>
				<Form horizontal>
					<Modal.Body>
						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
						Name
							</Col>
							<Col sm={10}>
								<FormControl type="email" placeholder="Email" name = "modelname" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<Column />

					</Modal.Body>
					<Modal.Footer>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button type="submit" onClick={this.onHandleSubmit}>
							Submit
								</Button>
							</Col>
						</FormGroup>
					</Modal.Footer>
				</Form>
			</Modal>

		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		},
		handleSubmit(state) {
			console.log("****************", state)
			dispatch(setModel(state))
		}
	}
}

export default connect(state => state, mapDispatchToProps)(PopUp)
