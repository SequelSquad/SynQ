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
		console.log("RELATIONSHIP PROPS", this.props)
		let currentTable = this.props.models.filter((model) => {
			return model.id === this.props.id
		})[0].name
		console.log("currentTable", this.props.models.filter((model) => {
			return model.id === this.props.id
		})[0])
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
						<DropdownButton title = {this.props.relationship ? this.props.relationship.relationship : this.props.Relationship} onSelect = {this.props.handleChangeRelationship(this.props.idx)} name = "Relationship" >
							<MenuItem eventKey="hasOne">hasOne</MenuItem>
							<MenuItem eventKey="hasMany">hasMany</MenuItem>
							<MenuItem eventKey="belongsTo">belongsTo</MenuItem>
							<MenuItem eventKey="belongsToMany">belongsToMany</MenuItem>
						</DropdownButton>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={2} sm={10}>
						<DropdownButton title = {this.props.relationship ? this.props.relationship.Table2 : this.props.Table2}  onSelect = {this.props.handleChangeTable(this.props.idx)}>
							{this.props.models.map((model, i) => {
								return (
									<MenuItem eventKey = {model.name}>{model.name}</MenuItem>
								)
							})}
						</DropdownButton>
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
