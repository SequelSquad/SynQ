import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, DropdownButton, ControlLabel, MenuItem, Modal} from "react-bootstrap"

export default class Column extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			id: this.props.id,
			name: this.props.dataValue ? this.props.dataValue.name : "",
			type: this.props.dataValue ? this.props.dataValue.type : ""
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		// this.handleSubmit = this.handleSubmit.bind(this)
	}

	onHandleChange(evt) {
		//console.log("CHANGE", evt.target.value)
		this.setState({[evt.target.name]: evt.target.value})
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
							<FormControl type="column" placeholder="Enter column name" name="name" defaultValue={this.state.name} onChange = {this.props.onHandleCols(this.state.id)} />
							{/* <FormControl type="column" placeholder="Enter column type" name="type" defaultValue={this.state.type} onChange = {this.props.onHandleCols(this.state.id)} /> */}
							<select onChange = {this.props.onHandleCols(this.state.id)} defaultValue={this.state.type} name="type">
								<option value="STRING">STRING</option>
								<option value="TEXT">TEXT</option>
								<option value="INTEGER">INTEGER</option>
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
						<FormGroup>
						</FormGroup>
					</FormGroup>
				</span>
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
