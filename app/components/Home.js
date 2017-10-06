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
import Line from "./Line"
import Generator from "../../background/Generator"

const width = Math.max(document.documentElement.clientWidth, window.innderWidth || 0)
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

// const { w, h } = electron.screen.getPrimaryDisplay().workAreaSize

const canvasTarget = {
	drop(props, monitor, component) {
		console.log("dimensionsWT$@(BG($BG(BG", width, height)
		const delta = monitor.getDifferenceFromInitialOffset()
		// You can disallow drop based on props or item
		if (!monitor.getItem().id && monitor.getItem().id !== 0) {
			props.allProps.handleAddModel({
				id: props.allProps.model.length + 1,
				top: monitor.getSourceClientOffset().y - 40,
				left: monitor.getSourceClientOffset().x
			})
			props.allProps.handleAddTable({id: props.allProps.model.length + 1})
		} else {
			props.allProps.handleMovePosition({
				id: monitor.getItem().id,
				top: monitor.getSourceClientOffset().y - 40,
				left: monitor.getSourceClientOffset().x
			})
		}
	}
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
		this.state = {
			top: "0",
			left: "0"
		}
		this.movePosition = this.movePosition.bind(this)
		// this.state = {
		// 	path: "./db2",
		// 	models: [{
		// 		name: "Puppies",
		// 		dataValue:[
		// 			{
		// 				name: "breed",
		// 				properties: {
		// 					type: "STRING",
		// 					boolean: [
		// 						["allowNull", false],
		// 						["isEmail", false]
		// 					]
		// 				}
		// 			},
		// 			{
		// 				name: "breeders",
		// 				properties: {
		// 					type: "STRING",
		// 					boolean: [
		// 						["allowNull", false],
		// 						["isEmail", false]
		// 					],
		// 					validate: [
		// 						["is", "[\"^[a-z]+$\"]"]
		// 					]
		// 				}
		// 			}
		// 		]
		// 	},
		// 	{
		// 		name: "breeders",
		// 		dataValue:[
		// 			{
		// 				name: "breed",
		// 				properties: {
		// 					type: "STRING",
		// 					boolean: [
		// 						["allowNull", false],
		// 						["isEmail", false]
		// 					]
		// 				}
		// 			},
		// 			{
		// 				name: "breeders",
		// 				properties: {
		// 					type: "STRING",
		// 					boolean: [
		// 						["allowNull", false],
		// 						["isEmail", false]
		// 					],
		// 					validate: [
		// 						["is", "[\"^[a-z]+$\"]"]
		// 					]
		// 				}
		// 			}
		// 		]
		// 	}
		// 	],
		// 	associations: [
		// 		{
		// 			source: "player",
		// 			target: "team",
		// 			relationship: "belongsTo",
		// 		}, {
		// 			source: "player2",
		// 			target: "team2",
		// 			relationship: "belongsTo"
		// 		}]
		// }
		this.handleChange = this.handleChange.bind(this)
		this.renderBox = this.renderBox.bind(this)
		// this.handleSubmit = this.handleSubmit.bind(this)
	}

	movePosition(x, y){
		this.setState({top: x, left: y})
	}

	handleChange(event) {
		//this.setState({ [event.target.name]: event.target.value })
	}

	renderBox(){
		if (this.props.allProps.model.length){
			return this.props.allProps.model.map((model) => {
				return (
					<Rectangle key={model.id} id={model.id} top={model.top} left={model.left} />
				)
			})
		}	else {
			return
		}
	}

	renderLines(){
		if(this.props.allProps.lines){
			return this.props.allProps.lines.map((line) => {
				return (
					<Line
						x1 = {this.props.allProps.model.filter((model) => {
							return model.id === parseInt(line.Table1)
						})[0].left}
						x2 = {this.props.allProps.model.filter((model) => {
							return model.id === parseInt(line.Table2)
						})[0].left}
						y1 = {this.props.allProps.model.filter((model) => {
							return model.id === parseInt(line.Table1)
						})[0].top}
						y2 = {this.props.allProps.model.filter((model) => {
							return model.id === parseInt(line.Table2)
						})[0].top}
					/>
				)
			})
		} else {
			return
		}
	}

	render() {
		const newBox = this.renderBox()
		const newLines = this.renderLines()
  	// These props are injected by React DnD,
		// as defined by your `collect` function above:
		// const {testProp} = this.props
		const { isOver, canDrop, connectDropTarget } = this.props
		return connectDropTarget(

			<div id = "canvaschild">
				{newBox}
				<svg height="1440" width="100%">
					{newLines}
				</svg>

			</div>

		)
	}
}


export default DropTarget(Type.RECTANGLE, canvasTarget, collect)(Home)
