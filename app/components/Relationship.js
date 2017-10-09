import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel} from "../actions"
import update from "react-addons-update"
import {addColumn} from "../actions"

class Relationship extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			TargetTable: "Table",
			Relationship: "Relationship",
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	onHandleChange(evt) {
		this.setState({[evt.target.name]: evt.target.value})
	}

	handleSubmit(){
		this.props.onSave(this.state)
	}

	render() {

		console.log("RELATIONSHIP", this.props.relationship)

		let currentTable = this.props.models.filter((model) => {
			return model.id === this.props.id
		})[0].name
		return (
			<div>

				<FormGroup>
					<Col componentClass={ControlLabel} sm={2}>
						New Relationship
					</Col>
					<Col smOffset={2} sm={10}>
						<FormControl
							type="text"
							value={currentTable}
						/>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={2} sm={10}>
						<DropdownButton title = {this.props.relationship.Relationship} onSelect = {this.props.handleChangeRelationship(this.props.relationship.id)} name = "Relationship" >
							<MenuItem eventKey="hasOne">hasOne</MenuItem>
							<MenuItem eventKey="hasMany">hasMany</MenuItem>
							<MenuItem eventKey="belongsTo">belongsTo</MenuItem>
							<MenuItem eventKey="belongsToMany">belongsToMany</MenuItem>
						</DropdownButton>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={2} sm={10}>
						<DropdownButton title = {this.props.relationship.Table2 === "Table" ?  "Table" : this.props.models.filter((model) => {
							return model.id === this.props.relationship.Table2
						})[0].name}  onSelect = {this.props.handleChangeTable(this.props.relationship.id)}>
							{this.props.models.map((model, i) => {
								return (
									<MenuItem eventKey = {model.name}>{model.name}</MenuItem>
								)
							})}
						</DropdownButton>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={2} sm={10}>
						<Button onClick = {() => {
							this.props.handleRemoveLine(this.props.relationship.id)}}>X</Button>
					</Col>
				</FormGroup>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		id: state.currRect,
		models: state.models
	}
}


export default connect(mapStateToProps)(Relationship)
