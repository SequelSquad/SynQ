import React from "react"
import {Form, FormGroup, Col, Row, FormControl, Button, Checkbox, ControlLabel, Modal, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel, removeModel, removeRec, setCurrDB} from "../actions"
import {fetchQuery} from "../reducers/Query"
import update from "react-addons-update"
import {dialog} from "electron"
import {Link} from "react-router-dom"


class QueryForm extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			SQLquery: "",
			currentDatabase: this.props.currDB
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.onHandleSubmit = this.onHandleSubmit.bind(this)
	}

	onHandleChange(evt){
		console.log(evt.target.value)
		let newState = {}
		newState[evt.target.name] = evt.target.value
		this.setState(newState)
	}

	onHandleSubmit(){
		this.props.handleFetchQuery(this.state)
	}

	render() {
		console.log("QUERYFORM STATE", this.state)
		return (
			<Modal show = {true} onHide = {() => {
				this.props.handleRemoveModal()}}>
				<Modal.Header>
					<Modal.Title>
						<div>Type a query</div>
					</Modal.Title>
				</Modal.Header>
				<Form horizontal>
					<Modal.Body>
						<FormGroup controlId="formControlsTextarea">
							<Col componentClass={ControlLabel} sm={6}>Query</Col>
							<Col sm={12}>
								<FormControl componentClass="textarea" type="query" placeholder="Enter Query" name="SQLquery"
									value={this.state.SQLquery} onChange = {this.onHandleChange} required/>
							</Col>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button type="button" onClick={() => this.onHandleSubmit()}>Query</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		)
	}
}

const mapStateToProps = (state) => ({databases: state.databases, currDB: state.currDB})


const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		},
		handleFetchQuery(query){
			dispatch(fetchQuery(query))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryForm)
