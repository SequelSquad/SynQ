import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {addLine} from "../actions/lines"
import {setModel} from "../actions"
import update from "react-addons-update"
import ToggleCol from "./ToggleCol"
import Relationship from "./Relationship"

class PopUp extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			relationships: [],
			//[{Table1: , Table2: , Relationship: }, {Table1: , }]
			// name: "H",
			// dataValues: [{
			// 	name: "",
			// 	properties:{
			// 		type: ""
			// 	}
			// }]
			id: this.props.id,
			name: "H"

		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.onHandleChangeDvName = this.onHandleChangeDvName.bind(this)
		this.onHandleSubmit = this.onHandleSubmit.bind(this)
		this.handleLineCreate = this.handleLineCreate.bind(this)
		this.handleRelationshipSelect = this.handleRelationshipSelect.bind(this)
		this.handleTableSelect = this.handleTableSelect.bind(this)
		this.addRelationship = this.addRelationship.bind(this)
		this.handleChangeRelationshipWrapper = this.handleChangeRelationshipWrapper.bind(this)
		this.handleChangeTableWrapper = this.handleChangeTableWrapper.bind(this)
	}

	addRelationship(evt){
		evt.preventDefault()
		this.setState({
			relationships: [...this.state.relationships, {Table1: this.props.id, Table2: 0, Relationship: ""}]
		})
	}

	handleChangeRelationshipWrapper(jdx){
		const thisVar = this
		return function (evt) {
			const relationships = thisVar.state.relationships.map((relationship, idx) => {
				if (jdx === idx){
					return Object.assign({}, relationship, {Relationship: evt})
				} else return relationship
			})
			thisVar.setState({relationships})
		}
	}

	handleChangeTableWrapper(jdx){
		const thisVar = this
		return function (evt) {
			const tableId = thisVar.props.models.filter((model) => {
				return model.name === evt
			})[0].id
			const relationships = thisVar.state.relationships.map((relationship, idx) => {
				if (jdx === idx){
					return Object.assign({}, relationship, {Table2: tableId})
				} else return relationship
			})
			thisVar.setState({relationships})
		}
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

	onHandleSubmit(){
		this.props.handleSubmit(this.state, this.props.key)
	}

	handleTableSelect(evt){
		this.setState({TargetTable: evt})
	}

	handleRelationshipSelect(evt){
		this.setState({Relationship: evt})
	}

	handleLineCreate(){
		// this.props.lineCreate({
		// 	Table1: this.props.id,
		// 	Table2: this.props.models.filter((model) => {
		// 		return model.name === this.state.Table2
		// 	})[0].id,
		// 	Relationship: this.state.Relationship
		// })
		this.props.lineCreate(this.state.relationships)
	}

	render() {
		// console.log("HOMEDNDPROP", this.props.homednd)
		// console.log("PROPS", this.state)
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
								<FormControl type="email" placeholder="name" name = "name" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>


						{/* <FormGroup>
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
						</FormGroup> */}
						{/* <FormGroup controlId="formHorizontalPassword">
							<Col componentClass={ControlLabel} sm={2}>
						Table1
							</Col>
							<Col sm={10}>
								<FormControl type="properties" placeholder="properties" name = "Table1" onChange =  {this.onHandleChange} />
							</Col>
						</FormGroup> */}

						{/* <FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
						Table2
							</Col>
							<Col sm={10}>
								<FormControl type="email" placeholder="data type" name = "Table2" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup> */}
						<Col sm = {5}>
							<Button onClick={this.addRelationship}>Add Relationship
				    </Button>
							{this.props.associations.filter((association) => {
								return (
									association.Table1 === this.props.id
								)
							}).map((currAssoc, idx) => {
								return(
									<Relationship key = {idx} Table2 = {this.props.models.filter((model) => {
										return(
											model.id === currAssoc.Table2
										)

									})[0].name} Relationship = {currAssoc.Relationship}
									handleChangeRelationship = {this.handleChangeRelationshipWrapper}
									handleChangeTable = {
										this.handleChangeTableWrapper
									}
									idx = {idx} />
								)
							})}

							{this.state.relationships.map((relationship, idx) => {
								return (
									<Relationship key = {idx}
										relationship = {relationship}
										handleChangeRelationship = {this.handleChangeRelationshipWrapper}
										handleChangeTable = {
											this.handleChangeTableWrapper
										}
										idx = {idx} />
								)})
							}
							{/* <ToggleRelationships parentState = {this.state} handleChangeRelationship = {this.handleChangeRelationshipWrapper}
              addRelationship = {this.addRelationship} /> */}
						</Col>
						<Col sm = {5}>
							<ToggleCol />
						</Col>

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
								<Button onClick={() => {
									this.handleLineCreate()
									this.props.handleRemoveModal()}}>
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
		associations: state.lines
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
