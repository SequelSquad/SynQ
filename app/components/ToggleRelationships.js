import React from "react"
import {Button} from "react-bootstrap"
import Relationship from "./Relationship"
import {connect} from "react-redux"


class ToggleCol extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			relationships: []
		}

		// This binding is necessary to make `this` work in the callback
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	handleAdd() {
		let newRelationship = this.state.relationships
		newRelationship.push("rel")
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn,
			relationships: newRelationship
		}))
	}

	handleDelete() {
		let newRelationship = this.state.relationships.slice(0, -1)
		this.setState({
			relationships: newRelationship
		})
	}

	render() {
		return (
			<div>
				{this.state.relationships.map((column, i) => <span key={i}>
					<Relationship parentState = {this.props.parentState} handleTableSelect = {this.props.handleTableSelect} handleRelationshipSelect = {this.props.handleRelationshipSelect}/><Button onClick={this.handleDelete}>-</Button></span>)}
				<Button onClick={this.handleAdd}>Add Relationship
				</Button>
			</div>
		)
	}
}



const mapStateToProps = (state) => {
	return {
		id: state.currRect,
		models: state.models,
		associations: state.lines
	}
}



export default connect(mapStateToProps)(ToggleCol)
