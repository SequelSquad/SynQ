import React from "react"
import {Button, Col} from "react-bootstrap"
import Column from "./Column"
import Properties from "./properties"

export default class ToggleCol extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [],
			selectedModel: this.props.selectedModel
		}

		// This binding is necessary to make `this` work in the callback
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	handleAdd() {
		//console.log("adding a new column", this.state.columns.length)
		let newColumns = this.state.columns
		this.props.addDataValue()
		newColumns.push("col")
		this.setState({
			columns: newColumns
		})
		//console.log("handleAdd Toggle26 clicked New State", this.state)
	}

	handleDelete() {
		let newColumns = this.state.columns.slice(0, -1)
		this.setState({
			columns: newColumns
		})
	}

	render() {
		//console.log("Selected Model", this.state.selectedModel)
		return (
			<div>
				{this.state.selectedModel.dataValues && this.state.selectedModel.dataValues.map((values, index) => <Column dataValue={values} id={index} onHandleCols={this.props.onHandleCols} handleValidate={this.props.handleValidate} validations={values.validate}/>)}

				{this.state.columns.map((column, index) => <span key={index}><Column id={this.state.selectedModel.dataValues ?  this.state.selectedModel.dataValues.length + index : index} onHandleCols={this.props.onHandleCols} handleValidate={this.props.handleValidate}/>
					{/* <Button onClick={this.handleDelete}>X</Button> */}
				</span>)}
				<Col sm={10}>
					<Button onClick={this.handleAdd}>Add Column</Button>
				</Col>
			</div>

		)
	}
}
