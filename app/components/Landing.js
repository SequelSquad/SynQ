import React from "react"
import {connect} from "react-redux"
import {Button} from "react-bootstrap"
import {fetchDatabases} from "../reducers/initDb"
import {setModal} from "../actions"
import DBForm from "./DBForm"
import {Link} from "react-router-dom"

export class Landing extends React.Component {
	constructor (props){
		super(props)
	}

	componentDidMount(){
		this.props.loadDatabases()
		console.log("fetch!")
	}

	render() {
		return (
			<div>
				<p>Choose whether you would like to connect to an existing database or create a new database:</p>
				<Button onClick={() => this.props.handleClick("DB_HOME")}>Connect</Button><Button onClick={this.props.closeError}>Create</Button>
				<Link to="/counter">Create</Link>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		databases: state.databases
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleClick (modalType) {
			dispatch(setModal(modalType))
		},
		loadDatabases(){
			dispatch(fetchDatabases())
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Landing)
