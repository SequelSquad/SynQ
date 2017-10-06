import React from "react"
import {Button} from "react-bootstrap"
import Column from "./Column"

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
		let newColumns = this.state.columns
		this.props.addDataValue()
		newColumns.push("col")
		this.setState({
			columns: newColumns
		})
		// console.log("clicked New State", this.state)
	}

	handleDelete() {
		let newColumns = this.state.columns.slice(0, -1)
		this.setState({
			columns: newColumns
		})
	}

	render() {
		// console.log(this.props, "TOGGLE COL PROPS")
		// console.log("STATE", this.state)
		// console.log("selectedModel", this.state.selectedModel)
		return (
			<div>

				{this.state.selectedModel.dataValues && this.state.selectedModel.dataValues.map((values, index) => <Column dataValue={values} id={index} onHandleCols={this.props.onHandleCols}/>)}

				{this.state.columns.map((column, index) => <span key={index}><Column id={index} onHandleCols={this.props.onHandleCols} />

					<Button onClick={this.handleDelete}>-</Button></span>)}
				<Button onClick={this.handleAdd}>+</Button>
			</div>
		)
	}
}
