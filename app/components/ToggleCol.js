import React from "react"
import {Button} from "react-bootstrap"
import Column from "./Column"

export default class ToggleCol extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: []
		}

		// This binding is necessary to make `this` work in the callback
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	handleAdd() {
		let newColumns = this.state.columns
		newColumns.push("col")
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn,
			columns: newColumns
		}))
	}

	handleDelete() {
		let newColumns = this.state.columns.slice(0, -1)
		this.setState({
			columns: newColumns
		})
	}

	render() {
		return (
			<div>
				{this.state.columns.map((column, i) => <span key={i}><Column /><button onClick={this.handleDelete}>-</button></span>)}
				<button onClick={this.handleAdd}>+
				</button>
			</div>
		)
	}
}
