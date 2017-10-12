import React from "react"
import {Form, FormGroup, Col, Row, FormControl, Button, Checkbox, DropdownButton, ControlLabel, MenuItem, Modal} from "react-bootstrap"
import Properties from "./properties"

export default class Column extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			validations: [],
			id: this.props.id,
			name: this.props.dataValue ? this.props.dataValue.name : "",
			type: this.props.dataValue ? this.props.dataValue.type : "Choose type",
			defaultValue: this.props.dataValue ? this.props.dataValue.defaultValue : ""
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.addValidate = this.addValidate.bind(this)
	}

	onHandleChange(evt) {
		this.setState({[evt.target.name]: evt.target.value})
	}

	addValidate() {
		const newId = this.createValID()
		let newValidate = this.state.validations
		this.props.addNewValidate(this.state.id, newId)
		this.setState({
			validations: newValidate
		})
	}

	createValID(){
		const newValId = Date.parse(new Date)
		return newValId
	}

	render() {
		return (
			<div>
				<span>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={6}>New Column</Col>
						<Col smOffset={4} sm={2}>
							<Button className="delete-button" bsSize="small" onClick={() => this.props.handleDelete(this.state.id)}>X</Button>
						</Col>
						<Col sm={12}>
							<FormControl type="column" placeholder="Enter column name" name="name" defaultValue={this.state.name} onChange = {this.props.onHandleCols(this.state.id)} />
						</Col>
						<Col sm={12}>
							<FormControl type="defaultValue" placeholder="Enter default Values" name="defaultValue" defaultValue={this.state.defaultValue} onChange = {this.props.onHandleCols(this.state.id)} />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col sm={10}>
							<DropdownButton title={ this.props.dataValue ? this.props.dataValue.type : "Choose Type"} onSelect = {this.props.onHandleColType(this.props.id)} name="type">
								<MenuItem eventKey="STRING">STRING</MenuItem>
								<MenuItem eventKey="TEXT">TEXT</MenuItem>
								<MenuItem eventKey="INTEGER">INTEGER</MenuItem>
								<MenuItem eventKey="INTEGER">INTEGER</MenuItem>
								<MenuItem eventKey="REAL">REAL</MenuItem>
								<MenuItem eventKey="DOUBLE">DOUBLE</MenuItem>
								<MenuItem eventKey="DECIMAL">DECIMAL</MenuItem>
								<MenuItem eventKey="DATE">DATE</MenuItem>
								<MenuItem eventKey="BOOLEAN">BOOLEAN</MenuItem>
								<MenuItem eventKey="JSON">JSON</MenuItem>
								<MenuItem eventKey="BLOB">BLOB</MenuItem>
								<MenuItem eventKey="FLOAT">FLOAT</MenuItem>
								<MenuItem eventKey="RANGE">RANGE</MenuItem>
								<MenuItem eventKey="ARRAY">ARRAY</MenuItem>
								<MenuItem eventKey="GEOMETRY">GEOMETRY</MenuItem>
							</DropdownButton>
						</Col>
					</FormGroup>
					{
						this.props.validations.length ? this.props.validations.map((val) => {
							return <Properties id= {val[0]} columnId={this.state.id} handleValidate={this.props.handleValidate} onHandleValType={this.props.onHandleValType} values={val[1]} input={val[2]} handleDeleteValidation={this.props.handleDeleteValidation}/>
						}) : <div></div>
					}
					{this.state.validations.length ? this.state.validations.map((val) => {
						return <Properties key={val.id} id= {val.id} columnId={this.state.id} handleValidate={this.props.handleValidate} onHandleValType={this.props.onHandleValType} handleDeleteValidation={this.props.handleDeleteValidation}/>
					}) : <div></div>}
					<Row>
						<Col smOffset={8}>
							<Button onClick={this.addValidate}>+ Add Validation</Button>
						</Col>
					</Row>
				</span>
			</div>
		)
	}
}
