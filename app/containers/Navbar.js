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

	handleTheme(theme) {
		console.log("CLICKED THEME CHANGER: DARK IS NOW ", this.props.theme)
		this.props.handleTheme(theme)
	}


	render() {
		const theme = this.props.theme
		let navTheme = `synq-nav-${theme}`
		let btnTheme = `btn-${theme}`

		return (
			<div>
				<nav className={`synq-nav ${navTheme}`}>
					<div className='nav-name'>
						<p><b>S Y N Q</b></p>
					</div>

					<div className='nav-theme dropdown'>
						<button className={`dropbtn btn-theme btn-default ${btnTheme}`}>Pick a Theme
							<i className="fa fa-caret-down"></i>
						</button>
						<div className='dropdown-content'>
							<a className={`btn-theme btn-default ${btnTheme}`} onClick={() => this.handleTheme("")}>Dark</a>
							<a className={`btn-theme btn-default ${btnTheme}`} onClick={() => this.handleTheme("sky")}>Sky Light</a>
							<a className={`btn-theme btn-default ${btnTheme}`} onClick={() => this.handleTheme("crimson")}>Crimson</a>
						</div>
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
		handleTheme: (theme) => {
			return dispatch(setTheme(theme))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
