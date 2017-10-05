import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {addLine} from "../actions/lines"
import {setModel} from "../actions"
import update from "react-addons-update"
import ToggleCol from "./ToggleCol"

class PopUp extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			TargetTable: "Table",
			Relationship: "Relationship",
			id: this.props.id,
      name: this.props.model ? this.props.model.name : "",
      dataValues: []
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.onHandleCols = this.onHandleCols.bind(this)
		this.onHandleSubmit = this.onHandleSubmit.bind(this)
		this.handleLineCreate = this.handleLineCreate.bind(this)
	}

	onHandleChange(evt){
		let newState = {}
		newState[evt.target.name] = evt.target.value
		this.setState(newState)
	};

	onHandleCols = jdx => evt => {
    const dataValues = this.state.dataValues.map((dataVal, idx) => {
      if(jdx === idx){
        return {[evt.target.name] : evt.target.value}
      } else return dataVal
    })
    console.log("FORM NEWSTATE", this.state)
    this.setState({dataValues: dataValues})
  }

	onHandleSubmit(){
		this.props.handleSubmit(this.state, this.props.key)
	}

	handleLineCreate(evt){
		this.props.lineCreate({
			Table1: this.props.id,
			Table2: this.props.models.filter((model) => {
				return model.name === this.state.TargetTable
			})[0].id,
			Relationship: this.state.Relationship
		})
	}

	render() {
		// console.log("HOMEDNDPROP", this.props.homednd)
		// console.log("PROPS", this.state)
		let selectedModel = this.props.models.filter(model => model.id === this.state.id)[0]
		console.log("SELECTEDMODEL", selectedModel)
		return (
			<Modal className="signInModal" dialogClassName="custom-modal" show = {true} onHide = {() => {
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
								<FormControl type="email" placeholder="Enter table name" name="name" value={this.state.name} onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>


						<FormGroup>
							<Col smOffset={2} sm={10}>
								<DropdownButton title = {this.state.TargetTable} onSelect = {(evt) => {
									this.setState({TargetTable: evt})
								}} >
									{this.props.models.filter((model) => {
										return model.id !== this.props.id
									}).map((model, i) => {
										return (
											<MenuItem eventKey = {model.name}>{model.name}</MenuItem>
										)
									})}
								</DropdownButton>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<DropdownButton title = {this.state.Relationship} onSelect = {(evt) => {
									this.setState({Relationship: evt})}} >
									<MenuItem eventKey="One-to-One">One-to-One</MenuItem>
									<MenuItem eventKey="One-to-Many">One-to-Many</MenuItem>
									<MenuItem eventKey="Many-to-Many">Many-to-Many</MenuItem>
								</DropdownButton>
							</Col>
						</FormGroup>
						{/* <FormGroup controlId="formHorizontalPassword">
							<Col componentClass={ControlLabel} sm={2}>
						Table1
							</Col>
							<Col sm={10}>
								<FormControl type="properties" placeholder="properties" name = "Table1" onChange =  {this.onHandleChange} />
							</Col>
						</FormGroup> */}

						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
						Table2
							</Col>
							<Col sm={10}>
								<FormControl type="email" placeholder="data type" name = "Table2" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<ToggleCol selectedModel={selectedModel} onHandleCols={this.onHandleCols}/>

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
		id: state.currRect,
		models: state.models,
		model: state.models.filter(model => model.id === +state.currRect)[0]
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		},
		handleSubmit(state) {
			dispatch(setModel(state))
		},
		lineCreate(line){
			dispatch(addLine(line))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)
