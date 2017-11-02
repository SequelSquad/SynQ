// @flow
import React, { Component } from "react"
import Home from "../components/Home"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import HTML5Backend from "react-dnd-html5-backend"
import { DragDropContext } from "react-dnd"
import {removeModal} from "../actions/modalAction"
import {addModel, movePosition, setModel, addTable, addModelThunk} from "../actions"
import {connect} from "react-redux"

class HomePage extends Component {

	constructor (props){
		super(props)
		this.state = {
			relationships: []
		}
	}

	componentDidMount() {
		let db = this.props.match.params.dbName
		this.props.handleAddPgTable(db)
			.then(() => {
				console.log("PROMISE RESOLVED!", this.props.models)
			})
	}

	render(props) {
		const theme = this.props.theme
		let wrapperTheme = `wrapper-${theme}`
		let sidebarTheme = `sidebar-wrapper-${theme}`
		let canvasTheme = `canvas-${theme}`
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
		},
		handleRemoveModal() {
			dispatch(removeModal())
		},
		handleAddPgTable: (db) => {
			return Promise.resolve(dispatch(addModelThunk(db)))
		}
	}
}

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default  DragDropContext(HTML5Backend)(HomeWrapper)
