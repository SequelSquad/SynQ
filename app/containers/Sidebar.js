import React, { Component } from "react"
import { Link } from "react-router"
import {connect} from "react-redux"
import Rectangle from "../components/Rectangle"
import Generator from "../../background/Generator"
import { setPath } from "../actions"
import { Button, FormGroup, FormControl, Col, ControlLabel } from "react-bootstrap"


class Sidebar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			path: "./db2"
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSetPath = this.handleSetPath.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log("CLICKEDDDDDD!", this.props.models)
		Generator({models: this.props.models, path: this.state.path})
	}

	handleSetPath(){
		this.props.handleSetPath(this.state.path)
	}

	render() {
		return (
			<div className='sidebar-menu'>
				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel}>
						<b>File Path:</b>
					</Col>
					<FormControl type="path" placeholder="Enter path of directory" name = "path"/>
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
		models: state.models
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetPath: (path) => {
			return dispatch(setPath(path))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
