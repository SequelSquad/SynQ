/* eslint flowtype-errors/show-errors: 0 */
import React, {Component} from "react"
import {connect} from "react-redux"
import { Switch, Route, withRouter } from "react-router-dom"
import App from "./containers/App"
import HomePage from "./containers/HomePage"
import CounterPage from "./containers/CounterPage"
import Modal from "./components/ModalConductor"
import Landing from "./components/Landing"
import fs from "fs"
import electron from "electron"
import path from "path"

class Routes extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){
		const queryPath = __dirname + "/components/" +  "/query.json"
		fs.stat(queryPath, function(err, stat) {
			if(err == null) {
				console.log("File exists")
			} else if(err.code == "ENOENT") {
				// file does not exist
				fs.writeFile(queryPath,JSON.stringify([]),(err) => {
					if (err) console.error
				})
			} else {
				console.log("Some other error: ", err.code)
			}
		})
	}
	render(){
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
