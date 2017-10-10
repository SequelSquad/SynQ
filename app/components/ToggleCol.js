import React from "react"
import {Button} from "react-bootstrap"
import Column from "./Column"
import Properties from "./properties"

export default class ToggleCol extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [],
			selectedModel: this.props.selectedModel,
		}

		// This binding is necessary to make `this` work in the callback
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.createColID = this.createColID.bind(this)
	}

	handleAdd() {
		const newId = this.createColID()
		let newColumns = this.state.columns
		this.props.addDataValue(newId)
		newColumns.push({id: newId})
		this.setState({
			columns: newColumns,
		})
		console.log("******************* datavalue added", newId)
	}

	handleDelete(id) {
		console.log("TOTALLY RESETTING THE STATE")
		this.props.handleDeleteColumn(id)
		this.setState({})
	}

	createColID(){
		const newId = Date.parse(new Date)
		return newId
	}

	render() {
		//console.log("Selected Model", this.state.selectedModel)

		return (
			<div>
				{/* {this.state.selectedModel.dataValues && this.state.selectedModel.dataValues.map((values, index) => {
					return (<Column dataValue={values} id={index} onHandleCols={this.props.onHandleCols}/>
					{values.validate.map((validation, index) => {
						return <Properties dataValue={validation} id={index}/>})
					})}
					)} */}

				{this.state.selectedModel.dataValues && this.state.selectedModel.dataValues.map((values) => <div><Column dataValue={values} id={values.id} onHandleCols={this.props.onHandleCols} handleValidate={this.props.handleValidate} validations={values.validate} addNewValidate={this.props.addNewValidate}/>
					<Button onClick={() => this.handleDelete(values.id)}>Remove</Button></div>)}


				{this.state.columns.map((column) => {
					return <span key={column.id}><Column id={column.id} onHandleCols={this.props.onHandleCols} handleValidate={this.props.handleValidate} addNewValidate={this.props.addNewValidate}/>
						<Button onClick={() => this.handleDelete(column.id)}>Remove</Button></span>})
				}
				<Button onClick={this.handleAdd}>Add Column</Button>
			</div>
		)
	}
}
