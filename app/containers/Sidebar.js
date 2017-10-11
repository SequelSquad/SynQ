import React, { Component } from "react"
import { Link } from "react-router"
import {connect} from "react-redux"
import Rectangle from "../components/Rectangle"
import Generator from "../../background/Generator"
import { setPath, selectLine } from "../actions"
import { Button, Tooltip, Popover, ButtonToolbar, FormGroup, FormControl, Col, Row, ControlLabel, Checkbox, OverlayTrigger } from "react-bootstrap"
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
	}

	handleChange(e){
		const path = app.getPath("home")+"/"
		this.setState({path: path + e.target.value})
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.handleSetPath(this.state.path)
			.then(() => {
				console.log("INSIDE!")
				Generator(this.props.store)
			})
	}

	render() {

		const theme = this.props.theme
		let menuTheme = `sidebar-menu-${theme}`
		const popoverTop = (
			<Popover id="popover-positioned-top" title="Instructions">
				Drag a square from the sidebar to the canvas to create your first model! Clicking on the model will give you the ability to fill out your model. Type in your File Path to generate the appropriate Sequelize files.
			</Popover>
		)
		return (
			<div className={`sidebar-menu ${menuTheme}`}>
				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel}>
						<b>File Path: </b>
					</Col>
					<br />
					<FormControl type="text" name="path" placeholder="documents/myproject/db" onChange={this.handleChange}/>
				</FormGroup>
				<Button type="submit" onClick={this.handleSubmit}>Create Files</Button>
				<ul className = "nav sidebar-nav">
					<li>
						<Rectangle />
					</li>
				</ul>

				<ButtonToolbar className="instructions">
					<OverlayTrigger placement="top" overlay={popoverTop}>
						<Button bsStyle="default">Help?</Button>
					</OverlayTrigger>
				</ButtonToolbar>
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
			return Promise.resolve(dispatch(setPath(path)))
		},
		handleFilter(relationships){
			dispatch(selectLine(relationships))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)


