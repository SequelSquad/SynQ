// @flow
import React, { Component } from "react"
import Home from "../components/Home"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import HTML5Backend from "react-dnd-html5-backend"
import { DragDropContext } from "react-dnd"
import {addModel, movePosition, setModel, addTable} from "../actions"
import {connect} from "react-redux"

class HomePage extends Component {

	constructor (props){
		super(props)
	}

	render(props) {
		const theme = this.props.theme
		let wrapperTheme = theme ? "" : "wrapper-light"
		let sidebarTheme = theme ? "" : "sidebar-wrapper-light"
		let canvasTheme = theme ? "" : "canvas-light"
		return (

			<div className={`wrapper ${wrapperTheme}`}>
				<div className="main-navbar">
					<Navbar />
				</div>
				<div className={`col-xs-3 sidebar-wrapper ${sidebarTheme}`}>
					<Sidebar />
				</div>
				<div className={`col-xs-9 ${canvasTheme}`}>
					<Home allProps={this.props} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		component: state.homednd,
		lines: state.lines,
		model: state.addModel,
		models: state.models,
		theme: state.theme
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleAddModel: (model) => {
			return dispatch(addModel(model))
		},
		handleMovePosition: (model) => {
			return dispatch(movePosition(model))
		},
		handleSetModel: (model) => {
			return dispatch(setModel(model))
		},
		handleAddTable: (table) => {
			return dispatch(addTable(table))
		}
	}
}

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default  DragDropContext(HTML5Backend)(HomeWrapper)
