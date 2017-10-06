import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal} from "react-bootstrap"

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
		console.log("CHANGE", evt.target.value)
		this.setState({[evt.target.name]: evt.target.value})
	}

	render() {
		console.log("COLUMNS PROPS ID I WANT", this.props.id)
		//console.log("DATAVALUES ON THE COLUMN", this.props.dataValue)
		return (
			<div>
				<span>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
						New Column
						</Col>
						<Col sm={10}>
							<FormControl type="column" placeholder="Enter column name" name="name" defaultValue={this.state.name} onChange = {this.props.onHandleCols(this.state.id)} />
							<FormControl type="column" placeholder="Enter column type" name="type" defaultValue={this.state.type} onChange = {this.props.onHandleCols(this.state.id)} />
						</Col>
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
