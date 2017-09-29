
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { DragSource } from "react-dnd"
import Type from "./Type"


const rectangleSource = {


	beginDrag(props, monitor, component) {
		// Return the data describing the dragged item
		console.log("SOURCEmonitor!!!", monitor.getItem())
		const str = ""
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
		console.log("PROPS", this.props)
		const {isDragging, connectDragSource} = this.props

		return connectDragSource(
			<div id = "rect">
        I am a draggable card number
			</div>
		)
	}
}

export default DragSource(Type.RECTANGLE, rectangleSource, collect)(Rectangle)

/* <svg width = "100%" height = "100%">
<rect width = "100%" height = "100%"/>
</svg> */
