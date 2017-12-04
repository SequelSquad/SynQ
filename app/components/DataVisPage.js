import React from "react"
import {connect} from "react-redux"
import {Button} from "react-bootstrap"
import {fetchDatabases} from "../reducers/initDb"
import {setModal, removeAllLines, removeAllModels} from "../actions"
import BarChart from "./BarChart"
import LineChart from "./LineChart"
import {Link} from "react-router-dom"

export class DataVisPage extends React.Component {
	constructor (props){
		super(props)
	}

	render() {
		console.log("render datavis")
		return (
			<div>
				<br/>
				<Link to={`/create/${this.props.currDB}`} ><Button>Create</Button></Link>
				<br/>
				<p>{this.props.currDB}</p>
				<LineChart data={this.props.queryResult} />
				{/* <BarChart data={this.props.queryResult}/> */}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currDB: state.currDB,
		queryResult: state.queryResult
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


export default connect(mapStateToProps, mapDispatchToProps)(DataVisPage)
