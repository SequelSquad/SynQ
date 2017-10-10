
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
	}


	render(){
		let id = this.props.id
		let model = this.props.models.length ? this.props.models.filter((model) => {
			return parseInt(model.id) === parseInt(id)
		})[0] : ""
		const {isDragging, connectDragSource} = this.props

		const theme = this.props.theme
		let tableTheme = `table-${theme}`
		return connectDragSource(
			<div className={`table ${tableTheme}`} onClick={ () => {
				this.props.handleClick("POP_UP", this.props.id)}} id={this.props.id} style = {{top:`${this.props.top}`, left:`${this.props.left}`, position:"absolute"}}>
				<h2>{model ? model.name ? model.name : "unnamed model" : "drag new model"}</h2>
				<ul>
					{model ? model.dataValues ?
						model.dataValues.map(column => {
							return <li>{column.name}</li>
						}) : <div></div> : <div></div>
					}
				</ul>
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



const rectangleWrapper = connect(state => state, mapDispatchToProps)(Rectangle)
export default DragSource(Type.RECTANGLE, rectangleSource, collect)(rectangleWrapper)
