import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel} from "../actions/modelAction"
import update from "react-addons-update"

class PopUp extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			name: "",
			dataValues: [{
				name: "",
				properties:{
					type: ""
				}
			}]
		}
		this.onHandleChange = this.onHandleChange.bind(this)
	}

	onHandleChange(evt){
		let newState = {}
    newState[evt.target.name] = evt.target.value

    const newData = update(this.state, {
      name:
      dataValues: {name: {$set:}}
    })
		this.setState(newState)
  }


	render() {
		console.log(this.state)
		return (
			<Modal className="signInModal" bsSize="small" show = {true} onHide = {() => {
				this.props.handleRemoveModal()}} >
				<Modal.Header closeButton>
					<Modal.Title>Create Model</Modal.Title>
				</Modal.Header>
				<Form horizontal onSubmit = {() => {
					this.props.handleSubmit(this.state)}}>
					<Modal.Body>
						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
						Name
							</Col>
							<Col sm={10}>
								<FormControl type="email" placeholder="Email" name = "modelname" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalPassword">
							<Col componentClass={ControlLabel} sm={2}>
						Properties
							</Col>
							<Col sm={10}>
								<FormControl type="properties" placeholder="properties" name = "columnName" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
						Type
							</Col>
							<Col sm={10}>
								<FormControl type="email" placeholder="data type" name = "columnType" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button type="submit">
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
