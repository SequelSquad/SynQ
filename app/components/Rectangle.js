
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { DragSource } from "react-dnd"
import Type from "./Type"


const rectangleSource = {

	beginDrag(props, monitor, component) {
		// Return the data describing the dragged item
		//return props
		return {component}
	},

	isDragging(props,monitor){
		console.log("ISDRAGGING!", monitor.getItem())
	},

	endDrag(props,monitor,component){
		console.log("ENDDRAGMONITOR", monitor.getItem())
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
			<span id={this.props.id} style = {{top:"200", left:"0", position:"absolute"}}>▢</span>
		)
	}
}

export default DragSource(Type.RECTANGLE, rectangleSource, collect)(Rectangle)
