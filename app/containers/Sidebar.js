import React, { Component } from "react"
import { Link } from "react-router"
import {connect} from "react-redux"
import Rectangle from "../components/Rectangle"
import Generator from "../../background/Generator"

export default class Sidebar extends Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log("CLICKEDDDDDD!")
		Generator(this.state)
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<button type="submit">Submit</button>
				</form>
				<ul className = "nav sidebar-nav">
					<li>
						<Rectangle />
					</li>
				</ul>
			</div>
		)
	}
}

