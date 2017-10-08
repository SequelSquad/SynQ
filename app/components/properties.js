import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, DropdownButton, ControlLabel, MenuItem, Modal} from "react-bootstrap"
import Properties from "./properties"


export default class Column extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			validations: [],
			id: this.props.id,
			name: this.props.dataValue ? this.props.dataValue.name : "",
			type: this.props.dataValue ? this.props.dataValue.type : ""
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.addValidate = this.addValidate.bind(this)
		// this.handleSubmit = this.handleSubmit.bind(this)
	}

	onHandleChange(evt) {
		//console.log("CHANGE", evt.target.value)
		this.setState({[evt.target.name]: evt.target.value})
	}

	addValidate() {
		//console.log("adding a new column", this.state.columns.length)
		let newValidate = this.state.validations
		this.props.addDataValue()
		newValidate.push("val")
		this.setState({
			validations: newValidate
		})
		//console.log("handleAdd Toggle26 clicked New State", this.state)
	}

	render() {
		return (
			<div>
				<span>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
						New Column
						</Col>
						<Col sm={10}>
							<h2>{this.state.id}</h2>

							{/* <FormControl type="column" placeholder="Enter column type" name="type" defaultValue={this.state.type} onChange = {this.props.onHandleCols(this.state.id)} /> */}
							<select name="validateType" onChange={this.props.handleValidate(this.props.columnId, this.props.id)}>
								<option value="is">Property:</option>
								<option value="is">is</option>
								<option value="not">not</option>
								<option value="isEmail">isEmail</option>
								<option value="isUrl">isUrl</option>
								<option value="isIP">isIP</option>
								<option value="isIPv4">isIPv4</option>
								<option value="isIPv6">isIPv6</option>
								<option value="isAlpha">isAlpha</option>
								<option value="isAlphanumeric">isAlphanumeric</option>
								<option value="isNumeric">isNumeric</option>
								<option value="isInt">isInt</option>
								<option value="isFloat">isFloat</option>
								<option value="isDecimal">isDecimal</option>
								<option value="isLowercase">isLowercase</option>
								<option value="isUppercase">isUppercase</option>
								<option value="notNull">notNull</option>
								<option value="isNull">isNull</option>
								<option value="notEmpty">notEmpty</option>
								<option value="equals">equals</option>
								<option value="contains">contains</option>
								<option value="notIn">notIn</option>
								<option value="isIn">isIn</option>
								<option value="notContains">notContains</option>
								<option value="len">len</option>
								<option value="isUUID">isUUID</option>
								<option value="isDate">isDate</option>
								<option value="isAfter">isAfter</option>
								<option value="isBefore">isBefore</option>
								<option value="max">max</option>
								<option value="min">min</option>
								<option value="isCreditCard">isCreditCard</option>
							</select>
							{/* <DropdownButton title = {this.state.type} onSelect = {this.props.onHandleCols(this.state.id)} name = "Relationship" >
								<MenuItem eventKey="STRING">STRING</MenuItem>
								<MenuItem eventKey="TEXT">TEXT</MenuItem>
								<MenuItem eventKey="INTEGER">INTEGER</MenuItem>
								<MenuItem eventKey="INTEGER">INTEGER</MenuItem>
							</DropdownButton> */}
							<FormControl type="text" placeholder="validation" name="validateValue" onChange={this.props.handleValidate(this.props.columnId, this.props.id)}/>
						</Col>
					</FormGroup>
					)}
				</span>
			</div>
		)
	}
}
