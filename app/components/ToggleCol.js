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
		newColumns.push("col")
		this.setState({
			columns: newColumns
		})
		console.log("clicked New State", this.state)
	}

	handleDelete() {
		let newColumns = this.state.columns.slice(0, -1)
		this.setState({
			columns: newColumns
		})
	}

	render() {
		console.log(this.state, "TOGGLE COL STATE")
		return (
			<div>
				{this.state.selectedModel.dataValues && this.state.selectedModel.dataValues.map((values) => <Column dataValue={values} />)}
				{this.state.columns.map((column, i) => <span key={i}><Column /><Button onClick={this.handleDelete}>-</Button></span>)}
				<Button onClick={this.handleAdd}>+</Button>
			</div>
		)
	}
}
