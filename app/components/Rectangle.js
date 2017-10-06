
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { DragSource } from "react-dnd"
import Type from "./Type"
import Form from "./Form"
import {connect} from "react-redux"
import {setModal, setCurrRect} from "../actions"


const rectangleSource = {

	beginDrag(props, monitor, component) {
		// Return the data describing the dragged item
		return {id: props.id}
	},

	isDragging(props, monitor){

	},

	endDrag(props,monitor,component){
		return {component}
	}
}


const collect = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Rectangle extends Component {
	constructor (props){
		super(props)
		this.state = {
			id: this.props.id,
			model: {}
		}
	}

	componentWillReceiveProps() {
		this.props.models.forEach(model => {
			if(model.id === this.props.id){
				this.setState({model: model})
			}
		})
	}

	render(){
		const {isDragging, connectDragSource} = this.props
		console.log("MODELSSSSS", this.props.models)

		let tableTheme = this.props.theme ? "" : "table-light"
		return connectDragSource(
			<div className={`table ${tableTheme}`} onClick={ () => {
				this.props.handleClick("POP_UP", this.props.id)}} id={this.props.id} style={{top:`${this.props.top}`, left:`${this.props.left}`, position:"fixed"}}>
				<h2>{this.state.model.id}</h2><br />
				<h4>{this.state.model.name}</h4>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleClick (modalType, id) {
			dispatch(setModal(modalType))
			dispatch(setCurrRect(id))
		}
	}
}

const mapStateToProps = (state) => {
	return {
		models: state.models,
		theme: state.theme
	}
}

const rectangleWrapper = connect(state => state, mapDispatchToProps)(Rectangle)
export default DragSource(Type.RECTANGLE, rectangleSource, collect)(rectangleWrapper)
