import React from "react"
import {Button, Col} from "react-bootstrap"
import Column from "./Column"
import Properties from "./properties"

export default class ToggleCol extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [],
			// selectedModel: this.props.selectedModel,
			// columnID: 0
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
	}

	handleDelete(id) {
		this.props.handleDeleteColumn(id)
		this.setState({})
	}

	createColID(){
		const newId = Date.parse(new Date)
		return newId
	}

	render() {

		return (
			<div>
				{this.props.dataValues && this.props.dataValues.map((values) => <div><Column dataValue={values} id={values.id} onHandleColType={this.props.onHandleColType} onHandleCols={this.props.onHandleCols} handleValidate={this.props.handleValidate} validations={values.validate} handleDelete={this.props.handleDeleteColumn} addNewValidate={this.props.addNewValidate} onHandleValType={this.props.onHandleValType} handleDeleteValidation={this.props.handleDeleteValidation}/>
				</div>)}
				<Col smOffset={4}>
					<Button className="add-button" onClick={this.handleAdd}>+ Add Column</Button>
				</Col>
			</div>

		)
	}
}
