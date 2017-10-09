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
			columnID: 0
		}

		// This binding is necessary to make `this` work in the callback
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.createColID = this.createColID.bind(this)
	}

	handleAdd() {
		const newId = this.createColID()
		console.log("ADDING A COLUMN")
		//console.log("adding a new column", this.state.columns.length)
		let newColumns = this.state.columns
		this.props.addDataValue(newId)
		newColumns.push({id: newId})
		this.setState({
			columns: newColumns,
		})
		console.log("handleAdd Toggle26 clicked New State", this.state)
	}

	handleDelete(id) {
		this.props.handleDeleteColumn(id)
		// let newColumns = this.state.columns.slice(0, -1)
		// this.setState({
		// 	columns: newColumns
		// })
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

				{this.state.selectedModel.dataValues && this.state.selectedModel.dataValues.map((values) => <div><Column dataValue={values} id={values.id} onHandleCols={this.props.onHandleCols} handleValidate={this.props.handleValidate} validations={values.validate}/>
					<Button onClick={() => this.props.handleDeleteColumn(values.id)}>Remove</Button></div>)}


				{this.state.columns.map((column) => {
					return <span key={column.id}><Column id={column.id} onHandleCols={this.props.onHandleCols} handleValidate={this.props.handleValidate}/>
						<Button onClick={() => this.props.handleDeleteColumn(column.id)}>Remove</Button></span>})
				}
				<Button onClick={this.handleAdd}>Add Column</Button>
			</div>
		)
	}
}
