// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"
import styles from "./Home.css"
import fs from "fs"
import { findDOMNode } from "react-dom"
import ReactDOM from "react-dom"
import { DropTarget } from "react-dnd"
import Type from "./Type"
import Rectangle from "./Rectangle"


const canvasTarget = {
	hover(props, monitor, component) {
		console.log("HOVERPROPS", props)
	},
	drop(props, monitor, component) {
		// You can disallow drop based on props or item
		props.allProps.handleAddComponent(monitor.getItem().component)


	},
}


/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
	return {
		// Call this function inside render()
		// to let React DnD handle the drag events:
		connectDropTarget: connect.dropTarget(),
		// You can ask the monitor about the current drag state:
		isOver: monitor.isOver(),
		isOverCurrent: monitor.isOver({ shallow: true }),
		canDrop: monitor.canDrop(),
		itemType: monitor.getItemType(),
		onDrop: canvasTarget.drop
	}
}


class Home extends Component {
	constructor(props) {
		super(props)
		this.state = { input: "", components: [] }
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit(event) {
		event.preventDefault()
		fs.mkdir("/Users/dorischeng/electron-react-boilerplate/db", (err) => {
			if (err) {
				console.log("failed to create dir", err)
			} else {
				fs.writeFile("/Users/dorischeng/electron-react-boilerplate/db" + "/test.js", this.state.input, (err) => {
					if (err) {
						console.log("Where's the input?")
					}
					else {
						console.log("wrote file")
					}
				})
			}
		})
	}

	renderBox(){
		if (this.props.allProps.component.length){
			return this.props.allProps.component.map((component) => {
				return (
					<Rectangle />
				)

			})
		}	else {
			return
		}
	}

	render() {
		const newBox = this.renderBox()
		console.log("COMPONENT", this.props.allProps.component)
  	// These props are injected by React DnD,
		// as defined by your `collect` function above:
		// const {testProp} = this.props
		const { isOver, canDrop, connectDropTarget } = this.props
		return connectDropTarget(
			<div id = "canvaschild">
				{newBox}
			</div>)
	}
}

export default DropTarget(Type.RECTANGLE, canvasTarget, collect)(Home)
