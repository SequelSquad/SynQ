/* eslint flowtype-errors/show-errors: 0 */
import React, {Component} from "react"
import {connect} from "react-redux"
import { Switch, Route, withRouter } from "react-router-dom"
import App from "./containers/App"
import HomePage from "./containers/HomePage"
import CounterPage from "./containers/CounterPage"
import Modal from "./components/ModalConductor"
import Landing from "./components/Landing"

class Routes extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<App>
				<Modal currentModal = {this.props.currentModal} />
				<Switch>
					<Route path="/create/:dbName" component={HomePage} />
					<Route path = "/create" component = {HomePage}/>
					<Route exact path="/" component={Landing} />
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

export default withRouter(connect(mapState)(Routes))
