// @flow
import React, { Component } from "react"
import Home from "../components/Home"
import Sidebar from "./Sidebar"
import HTML5Backend from "react-dnd-html5-backend"
import { DragDropContext } from "react-dnd"
import {addComponent} from "../actions/homednd"
import {connect} from "react-redux"

class HomePage extends Component {

	constructor (props){
		super(props)
	}

	render() {
		let testProp = 100
		return (
			<div id = "wrapper">
				<div id = "main" className = "col-xs-2">
					<Sidebar />
				</div>
				<div id = "canvas" className = "col-xs-10">
					<Home allProps = {this.props} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		component: state.homednd
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleAddComponent: (component) => {
			return dispatch(addComponent(component))
		}
	}
}

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default  DragDropContext(HTML5Backend)(HomeWrapper)
