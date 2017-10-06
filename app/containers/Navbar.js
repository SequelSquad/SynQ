import React, { Component } from "react"
import { Link } from "react-router"
import {connect} from "react-redux"
import { setTheme } from "../actions"


class Navbar extends Component {
	constructor(props) {
		super(props)

		this.state = {
		}

		this.handleTheme = this.handleTheme.bind(this)
	}

	handleTheme() {
		console.log("CLICKED THEME CHANGER: DARK IS NOW ", this.props.theme)
		this.props.handleTheme()
	}


	render() {

		let navTheme = this.props.theme ? "" : "synq-nav-light"
		let btnTheme = this.props.theme ? "" : "btn-light"

		return (
			<div>
				<nav className={`synq-nav ${navTheme}`}>
					<div className='nav-name'>
						<p><b>S Y N Q</b></p>
					</div>

					<div className='nav-theme'>
						<button className={`btn-theme btn-default ${btnTheme}`} onClick={this.handleTheme}>Theme</button>
					</div>
				</nav>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		theme: state.theme
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		handleTheme: () => {
			return dispatch(setTheme())
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
