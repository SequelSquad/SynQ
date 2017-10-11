import React, { Component } from "react"
import { Link } from "react-router"
import {connect} from "react-redux"
import Rectangle from "../components/Rectangle"
import Generator from "../../background/Generator"
import { setPath, selectLine } from "../actions"
import { Button, FormGroup, FormControl, Col, ControlLabel, Popover, Checkbox, OverlayTrigger } from "react-bootstrap"
const remote = require("electron").remote
const app = remote.app

class Sidebar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			path: "",
			selectedRelationships: []
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSetPath = this.handleSetPath.bind(this)

	}

	handleChange(e){
		const path = app.getPath("home")+"/"
		this.setState({path: path + e.target.value})
	}

	handleSubmit(event) {
		event.preventDefault()
		Generator(this.props.store)
	}

	handleSetPath(){
		this.props.handleSetPath(this.state.path)
	}



	render() {

		const theme = this.props.theme
		let menuTheme = `sidebar-menu-${theme}`
		return (
			<div className={`sidebar-menu ${menuTheme}`}>
				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel}>
						<b>File Path: </b>
					</Col>
					<br />
					<input type="text" name="path" placeholder="documents/myproject/db" onChange={this.handleChange}/>
				</FormGroup>
				<Button type="button" onClick={this.handleSetPath}>Set Path</Button>
				<Button type="submit" onClick={this.handleSubmit}>Create Database</Button>
				<ul className = "nav sidebar-nav">
					<li>
						<Rectangle />
					</li>
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		models: state.models,
		store: state,
		theme: state.theme,
		associations: state.lines
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetPath: (path) => {
			return dispatch(setPath(path))
		},
		handleFilter(relationships){
			dispatch(selectLine(relationships))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
