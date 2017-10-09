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
		this.state = {
			relationships: []
		}
	}

	render(props) {
		// if (this.props.theme) {
		// 	const themeButton = document.getElementById("theme-button")
		// 	const body = document.getElementById("body")
		// 	const sidebar = document.getElementById("main")
		// 	const canvas = document.getElementById("canvas")
		// 	const table = document.getElementsByClassName("table")

		// 	console.log("TRYING TO CHANGE THEMES!!!_!_!_!_!")
		// 	body.style.color = "black"
		// 	body.style["background-color"] = "#9DCAD6"
		// 	sidebar.style["background-color"] = "#F3F3F3"
		// 	canvas.style["background-color"] = "#FFFFFF"
		// 	table.style.border = "1px solid #8B8989"
		// 	table.style["background-color"] = "#B4DAE5"
		// 	table.style["box-shadow"] = "0 8px 6px -5x #757272"
		// 	themeButton.style["background-color"] = ""
		// 	themeButton.style.color = ""
		// }

		// else {
		// 	DarkOrLight = !DarkOrLight

		// 	body.style.("color", "#6e8798")
		// 	body.style.("background-color", "#1f2732")
		// 	sidebar.style.("background-color", "#1f2732")
		// 	table.style.("border", "1px solid #3b4752")
		// 	table.style.("background-color","#8A7DA0")
		// 	table.style.("box-shadow", "0 8px 6px -5px #615475")
		// }r
		const theme = this.props.theme
		let wrapperTheme = this.props.theme ? "" : "wrapper-light"
		let sidebarTheme = this.props.theme ? "" : "sidebar-wrapper-light"
		let canvasTheme = this.props.theme ? "" : "canvas-light"
		return (

			<div className={`wrapper ${wrapperTheme}`}>
				<div className="main-navbar">
					<Navbar />
				</div>
				<div className={`col-xs-3 sidebar-wrapper ${sidebarTheme}`}>
					<Sidebar />
				</div>
				<div className={`col-xs-9 ${canvasTheme}`}>
					<Home allProps={this.props}  />
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
