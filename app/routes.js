/* eslint flowtype-errors/show-errors: 0 */
import React, {Component} from "react"
import {connect} from "react-redux"
import { Switch, Route } from "react-router"
import App from "./containers/App"
import HomePage from "./containers/HomePage"
import CounterPage from "./containers/CounterPage"
import Modal from "./components/ModalConductor"

class Routes extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<App>
				<Modal currentModal = {this.props.currentModal} />
				<Switch>
					<Route path="/counter" component={CounterPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</App>
		)
	}
}

const mapState = (state) => {
	return {
		currentModal: state.modals
	}
}

export default connect(mapState)(Routes)
