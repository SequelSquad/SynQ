
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { DragSource } from "react-dnd"
import Type from "./Type"
import Form from "./Form"
import {connect} from "react-redux"
import {setModal} from "../actions/modalAction"


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
	}

	render(){
		const {isDragging, connectDragSource} = this.props

		return connectDragSource(
			<span className="table" onClick={ () => {
				this.props.handleClick("POP_UP")}} id={this.props.id} style = {{top:`${this.props.top}`, left:`${this.props.left}`, position:"absolute"}}>▢</span>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleClick (modalType) {
			dispatch(setModal(modalType))
		}
	}
}

const rectangleWrapper = connect(state => state, mapDispatchToProps)(Rectangle)
export default DragSource(Type.RECTANGLE, rectangleSource, collect)(rectangleWrapper)
