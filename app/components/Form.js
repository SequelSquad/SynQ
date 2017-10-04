import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {addLine} from "../actions/lines"
import {setModel} from "../actions"
import update from "react-addons-update"
import Column from "./Column"

class PopUp extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			Table1: 0,
			Table2: 0,
			// name: "H",
			// dataValues: [{
			// 	name: "",
			// 	properties:{
			// 		type: ""
			// 	}
			// }]
			id: this.props.id,
			name: "H",
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.onHandleChangeDvName = this.onHandleChangeDvName.bind(this)
		this.onHandleSubmit = this.onHandleSubmit.bind(this)
		this.handleLineCreate = this.handleLineCreate.bind(this)
	}

	onHandleChange(evt){
		let newState = {}
		newState[evt.target.name] = evt.target.value
		this.setState(newState)
		// console.log(this.state)

		// let newState = update(this.state, {
		// 	name: {$set: evt.target.value}
		// })
		// this.setState(newState)
	}

	onHandleChangeDvName(evt){
		let newState = update(this.state, {
			dataValues:{
				[0]: {
					name: {$set: evt.target.value}}
			}
		})
		this.setState(newState)
	  // let newState = {}
		// newState[evt.target.name] = evt.target.value
		// console.log(newState)
		this.setState(update(this.state, {
			name: {$set: evt.target.value}
		}))
		// this.setState(update(this.state, {
		// 	dataValues: {
		// 		[0]: {
		// 			name: {$set: evt.target.value}
		// 		}
		// 	}
		// }))
		// this.setState(update(this.state, {
		// 	dataValues: {
		// 		[0]: {
		// 			properties: {
		// 				type: {$set: evt.target.value}
		// 			}
		// 		}
		// 	}
		// }))
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


	// this.setState(update(this.state, {
	// 	name: {$set: evt.target.value}
	// }))
	// this.setState(update(this.state, {
	// 	dataValues: {
	// 		[0]: {
	// 			name: {$set: evt.target.value}
	// 		}
	// 	}
	// }))
	// this.setState(update(this.state, {
	// 	dataValues: {
	// 		[0]: {
	// 			properties: {
	// 				type: {$set: evt.target.value}
	// 			}
	// 		}
	// 	}
	// }))
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


	onHandleSubmit(){
		console.log("SUBMIT??")
		this.props.handleSubmit(this.state, this.props.key)
	}

	handleLineCreate(evt){
		console.log("EVTTARGET!", evt.target)
		this.props.lineCreate(this.state)
	}

	render() {
		// console.log("HOMEDNDPROP", this.props.homednd)
		// console.log("PROPS", this.state)
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
								<FormControl type="email" placeholder="Email" name = "name" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalPassword">
							<Col componentClass={ControlLabel} sm={2}>
						Table1
							</Col>
							<Col sm={10}>
								<FormControl type="properties" placeholder="properties" name = "Table1" onChange =  {this.onHandleChange} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
						Table2
							</Col>
							<Col sm={10}>
								<FormControl type="email" placeholder="data type" name = "Table2" onChange = {this.onHandleChange} />
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
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button onClick={this.handleLineCreate}>
							CreateLines
								</Button>
							</Col>
						</FormGroup>
					</Modal.Footer>
				</Form>
			</Modal>

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
		handleRemoveModal() {
			dispatch(removeModal())
		},
		handleSubmit(state) {
			console.log("****************", state)
			dispatch(setModel(state))
		},
		lineCreate(line){
			dispatch(addLine(line))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)
