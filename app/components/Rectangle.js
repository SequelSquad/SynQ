
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { DragSource } from "react-dnd"
import Type from "./Type"


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
			<span id={this.props.id} style = {{top:`${this.props.top}`, left:`${this.props.left}`, position:"absolute"}}>▢</span>
		)
	}
}

export default DragSource(Type.RECTANGLE, rectangleSource, collect)(Rectangle)
