import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, DropdownButton, ControlLabel, MenuItem, Modal} from "react-bootstrap"
import Properties from "./properties"


export default class Column extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			validations: [],
			id: this.props.id,
			validationType: this.props.values ? this.props.values[0] : "",
			validationValue: this.props.values ? this.props.values[1] : ""
		}
	}

	render() {
		console.log("PROPERTIES PROPS", this.props)
		console.log("PROPERTY STATE", this.state)
		return (
			<div>
				<span>
					<FormGroup>
						<Col componentClass={ControlLabel} smOffset={1} sm={6}>
						New Validation
						</Col>
						<Col smOffset={1}sm={11}>
            	{/* <h2>{this.state.id}</h2> */}
							{/* <FormControl type="column" placeholder="Enter column type" name="type" defaultValue={this.state.type} onChange = {this.props.onHandleCols(this.state.id)} /> */}
							<DropdownButton title={this.state.validationType ? this.state.validationType : "Choose Validation"} onSelect={this.props.handleValidate(this.props.columnId, this.props.id)} defaultValue={this.state.validationType}>
								<MenuItem eventKey="is">Property:</MenuItem>
								<MenuItem eventKey="is">is</MenuItem>
								<MenuItem eventKey="not">not</MenuItem>
								<MenuItem eventKey="isEmail">isEmail</MenuItem>
								<MenuItem eventKey="isUrl">isUrl</MenuItem>
								<MenuItem eventKey="isIP">isIP</MenuItem>
								<MenuItem eventKey="isIPv4">isIPv4</MenuItem>
								<MenuItem eventKey="isIPv6">isIPv6</MenuItem>
								<MenuItem eventKey="isAlpha">isAlpha</MenuItem>
								<MenuItem eventKey="isAlphanumeric">isAlphanumeric</MenuItem>
								<MenuItem eventKey="isNumeric">isNumeric</MenuItem>
								<MenuItem eventKey="isInt">isInt</MenuItem>
								<MenuItem eventKey="isFloat">isFloat</MenuItem>
								<MenuItem eventKey="isDecimal">isDecimal</MenuItem>
								<MenuItem eventKey="isLowercase">isLowercase</MenuItem>
								<MenuItem eventKey="isUppercase">isUppercase</MenuItem>
								<MenuItem eventKey="notNull">notNull</MenuItem>
								<MenuItem eventKey="isNull">isNull</MenuItem>
								<MenuItem eventKey="notEmpty">notEmpty</MenuItem>
								<MenuItem eventKey="equals">equals</MenuItem>
								<MenuItem eventKey="contains">contains</MenuItem>
								<MenuItem eventKey="notIn">notIn</MenuItem>
								<MenuItem eventKey="isIn">isIn</MenuItem>
								<MenuItem eventKey="notContains">notContains</MenuItem>
								<MenuItem eventKey="len">len</MenuItem>
								<MenuItem eventKey="isUUID">isUUID</MenuItem>
								<MenuItem eventKey="isDate">isDate</MenuItem>
								<MenuItem eventKey="isAfter">isAfter</MenuItem>
								<MenuItem eventKey="isBefore">isBefore</MenuItem>
								<MenuItem eventKey="max">max</MenuItem>
								<MenuItem eventKey="min">min</MenuItem>
								<MenuItem eventKey="isCreditCard">isCreditCard</MenuItem>
							</DropdownButton>
							<FormControl type="text" placeholder="Enter validation value" name="validateValue" onChange={this.props.handleValidate(this.props.columnId, this.props.id)} defaultValue={this.state.validationValue}/>
						</Col>
					</FormGroup>
				</span>
			</div>
		)
	}
}
