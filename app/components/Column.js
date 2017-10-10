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
		let newValidate = this.state.validations
		//this.props.addDataValue()
		newValidate.push("val")
		this.setState({
			validations: newValidate
		})
		//console.log("adding to the validation array")
	}

	render() {
		//console.log("column state", this.props.dataValue)
		return (
			<div>
				{/* <span> */}
				<FormGroup>
					<Row>
						<Col componentClass={ControlLabel} sm={6}>
							New Column
						</Col>
						<Col componentClass={ControlLabel} smOffset={4} sm={2}>
							<Button onClick={this.props.handleDelete} bsSize="xsmall">x</Button>
						</Col>
					</Row>
					<Col sm={12}>
						{/* <h2>{this.state.id}</h2> */}
						<FormControl type="column" placeholder="Enter column name" name="name" defaultValue={this.state.name} onChange = {this.props.onHandleCols(this.state.id)} />
						{/* <FormControl type="column" placeholder="Enter column type" name="type" defaultValue={this.state.type} onChange = {this.props.onHandleCols(this.state.id)} /> */}
						<select onChange = {this.props.onHandleCols(this.state.id)} defaultValue={this.state.type} name="type">
							<option value="Choose Type">Choose Type</option>
							<option value="STRING">STRING</option>
							<option value="TEXT">TEXT</option>
							<option value="INTEGER">INTEGER</option>
							<option value="REAL">REAL</option>
							<option value="DOUBLE">DOUBLE</option>
							<option value="DECIMAL">DECIMAL</option>
							<option value="DATE">DATE</option>
							<option value="BOOLEAN">BOOLEAN</option>
							<option value="JSON">JSON</option>
							<option value="BLOB">BLOB</option>
							<option value="FLOAT">FLOAT</option>
							<option value="RANGE">RANGE</option>
							<option value="ARRAY">ARRAY</option>
							<option value="GEOMETRY">GEOMETRY</option>
						</select>
						{/* <DropdownButton title = {this.state.type} onSelect = {this.props.onHandleCols(this.state.id)} name = "Relationship" >
								<MenuItem eventKey="STRING">STRING</MenuItem>
								<MenuItem eventKey="TEXT">TEXT</MenuItem>
								<MenuItem eventKey="INTEGER">INTEGER</MenuItem>
								<MenuItem eventKey="INTEGER">INTEGER</MenuItem>
							</DropdownButton> */}
					</Col>
				</FormGroup>
				{
					this.props.validations && this.props.validations.map((val, index) => {
						console.log("COLUMN 75", val)
						return <Properties id= {index} columnId={this.state.id} handleValidate={this.props.handleValidate} values={val}/>
					})
				}
				{this.state.validations.length && this.state.validations.map((val, index) => {
					return <Properties id= {this.props.validations ?  this.props.validations.length + index : index} columnId={this.state.id} handleValidate={this.props.handleValidate}/>
				})}
				<Col sm={10} smOffset={8}>
					<Button onClick={this.addValidate}>Add Validation</Button>
				</Col>
				{/* </span> */}
			</div>
		)
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		//id: state.currRect,
// 		// dataValues: ownProps.dataValues,
// 		// onHandleCols: ownProps.onHandleCols
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onSave(state) {
// 			console.log("^^^^^^^^^^^^^^",state)
// 			dispatch(addColumn(state))
// 		}
// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Column)
