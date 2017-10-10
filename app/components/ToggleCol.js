import React from "react"
import {Button, Col} from "react-bootstrap"
import Column from "./Column"
import Properties from "./properties"

export default class ToggleCol extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [],
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
	}

	createColID(){
		const newId = Date.parse(new Date)
		return newId
	}

	render() {
		console.log("datavalues", this.props.dataValues)

		return (
			<div>
				{this.props.dataValues && this.props.dataValues.map((values) => <div><Column dataValue={values} id={values.id} onHandleColType={this.props.onHandleColType} onHandleCols={this.props.onHandleCols} handleValidate={this.props.handleValidate} validations={values.validate} handleDelete={this.props.handleDeleteColumn}/>
				</div>)}
				<Col smOffset={4}>
					<Button className="add-button" onClick={this.handleAdd}>+ Add Column</Button>
				</Col>
			</div>
		// {this.state.columns.map((column) => {
		//   return <span key={column.id}><Column id={column.id} onHandleCols={this.props.onHandleCols} onHandleColType={this.props.onHandleColType} handleValidate={this.props.handleValidate} handleDelete={this.props.handleDeleteColumn}/>
		//     {/* <Button className="delete-button" onClick={() => this.props.handleDeleteColumn(column.id)}>X</Button> */}
		//   </span>})
		// }
		)
	}
}
