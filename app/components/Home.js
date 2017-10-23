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

function createModelID(){
	const newModelId = Date.parse(new Date)
	return newModelId
}

const canvasTarget = {

	drop(props, monitor, component) {
		const modelId = createModelID()
		if (!monitor.getItem().id && monitor.getItem().id !== 0) {
			props.allProps.handleAddModel({id: modelId, top: monitor.getSourceClientOffset().y - 60, left: monitor.getSourceClientOffset().x - (window.innerWidth/4)})
			props.allProps.handleAddTable({id: modelId})
		} else {
			props.allProps.handleMovePosition({id: monitor.getItem().id, top: monitor.getSourceClientOffset().y - 60, left: monitor.getSourceClientOffset().x - (window.innerWidth/4)})
		}
	}
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
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
		//this.handleChange = this.handleChange.bind(this)
		this.renderBox = this.renderBox.bind(this)
	}

	movePosition(x, y){
		this.setState({top: x, left: y})
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
			let relationshipHash = {}

			return this.props.allProps.lines.map((line, idx) => {
				if (!(line.Table1 in relationshipHash)){
					relationshipHash[line.Table1] = [line.Table2]
				} else {
					relationshipHash[line.Table1].push(line.Table2)
				}
				let targetYArr = []

				let sourceYArr = []

				Object.keys(relationshipHash).forEach((key) => {
					if (relationshipHash[key].includes(line.Table2)) {
						targetYArr.push(line.Table2)
					}})

				Object.keys(relationshipHash).forEach((key) => {
					if (relationshipHash[key].includes(line.Table1)) {
						sourceYArr.push(line.Table1)
					}})

				let y1test = this.props.allProps.model.filter((model) => {
					return model.id === parseInt(line.Table1)
				})[0].top + ((sourceYArr.filter((table) => table === line.Table1).length + (relationshipHash[line.Table1] ? relationshipHash[line.Table1].length - 1 : 0))
								*40)

				let y1reg = this.props.allProps.model.filter((model) => {
					return model.id === parseInt(line.Table1)
				})[0].top

				let y2test = this.props.allProps.model.filter((model) => {
					return model.id === parseInt(line.Table2)
				})[0].top + ((targetYArr.filter((table) => table === line.Table2).length -1 + (relationshipHash[line.Table2] ? relationshipHash[line.Table2].length : 0))
								*40)

				let y2reg = this.props.allProps.model.filter((model) => {
					return model.id === parseInt(line.Table2)
				})[0].top

				let y2final = y2test > y2reg ? y2test : y2reg
				let y1final = y1test > y1reg ? y1test : y1reg
				return (
					<Line
						key = {idx}
						idx = {idx}
						relationship = {line}
						x1 = {this.props.allProps.model.filter((model) => {
							return model.id === parseInt(line.Table1)
						})[0].left}
						x2 = {this.props.allProps.model.filter((model) => {
							return model.id === parseInt(line.Table2)
						})[0].left}
						y1 = {y1final}
						y2 = {y2final}
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
