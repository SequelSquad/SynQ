import React from "react"
import {Form, FormGroup, Col, Row, FormControl, Button, Checkbox, ControlLabel, Modal, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel, removeModel, removeRec, setCurrDB} from "../actions"
import update from "react-addons-update"
import {dialog} from "electron"
import {Link} from "react-router-dom"


class DBForm extends React.Component {
	constructor (props){
		super(props)
		this.state = {
		}
	}

	render() {

		return (
			<Modal show = {true} onHide = {() => {
				this.props.handleRemoveModal()}}>
				<Modal.Header>
					<Modal.Title>
						<div>Choose a database</div>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<ul>
						{this.props.databases.map((database, i)=> {
							return (
								<li key={i}><Link to= {`/create/${database.datname}`} onClick={()=>this.props.handleSetDB(database.datname)}>{database.datname}</Link></li>
							)
						})}
					</ul>
				</Modal.Body>
			</Modal>
		)
	}
}

const mapStateToProps = (state) => ({databases: state.databases})


const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		},
		handleSetDB(id){
			dispatch(setCurrDB(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DBForm)
