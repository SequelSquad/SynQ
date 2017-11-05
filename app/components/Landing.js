import React from "react"
import {connect} from "react-redux"
import {Button} from "react-bootstrap"
import {fetchDatabases} from "../reducers/initDb"
import {setModal, removeAllLines, removeAllModels} from "../actions"
import DBForm from "./DBForm"
import {Link} from "react-router-dom"

export class Landing extends React.Component {
	constructor (props){
		super(props)
	}

	componentDidMount(){
		this.props.loadDatabases()
		// this.props.clearModelsLines()

	}

	render() {
		return (
			<div>
				<p>Choose whether you would like to connect to an existing database or create a new database:</p>
				<Button onClick={() => this.props.handleClick("DB_HOME")}>Connect</Button><Button>Create</Button>
				<div>
					<Link to="/create">Create</Link>
				</div>
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
		},
		clearModelsLines(){
			dispatch(removeAllLines())
			dispatch(removeAllModels())
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Landing)
