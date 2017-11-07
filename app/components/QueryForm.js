import React from "react"
import {Form, FormGroup, Col, Row, FormControl, Button, Checkbox, ControlLabel, Modal, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel, removeModel, removeRec, setCurrDB} from "../actions"
import {fetchQuery, filterQuery} from "../reducers/Query"
import update from "react-addons-update"
import {dialog} from "electron"
import {Link} from "react-router-dom"
import { findDOMNode } from "react-dom"



class QueryForm extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			SQLquery: "",
			currentDatabase: this.props.currDB,
			xVal: "",
			yVal: ""
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.onHandleSubmit = this.onHandleSubmit.bind(this)
		this.makeDraggable = this.makeDraggable.bind(this)

	}

	makeDraggable() {

		const modal = findDOMNode(this.refs.modal)
		$("#modal").draggable({handle: ".modal-header"})

	}

	componentDidMount(){
		this.makeDraggable()
	}


	onHandleChange(evt, name){
		let newState = {}
		if (!name){
			newState[evt.target.name] = evt.target.value
		} else {
			newState[name] = evt
		}

		this.setState(newState)
	}

	onHandleSubmit(){
		this.props.handleFetchQuery(this.state)
	}

	render() {

		return (

			<Modal id = "modal" ref = "modal" show = {true} onHide = {() => {
				this.props.handleRemoveModal()}}>
				<Modal.Header className = "modal-header">
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
						{this.props.queryResult.length ?
							<div>
								<FormGroup>
									<div id = "outer">
										<table>
											<thead>
												<tr>
													{Object.keys(this.props.queryResult[0]).map((key, i) => {
														return (
															<th width = {200} key = {i}>{key}</th>
														)
													})}
												</tr>
											</thead>
											<tbody>
												{this.props.queryResult.map((obj, i) => {
													return (
														<tr key = {i}>
															{Object.keys(obj).map((key, j) => {

																return (
																	<td width = {200} key = {j}>{obj[key].toString()}</td>
																)
															})}
														</tr>
													)
												})
												}
											</tbody>
										</table>
									</div>
								</FormGroup>
								<FormGroup>
									<Col sm = {6}>
										<div>X-Value</div>
										<DropdownButton ref = "xVal" name = "xVal" bsSize="large" title={this.state.xVal || "Select X"} id="dropdown-size-large" onSelect = {(evt) => {
											this.onHandleChange(evt, this.refs.xVal.props.name)}
										}
										>
									  {Object.keys(this.props.queryResult[0]).map((dataValue, j) => {
												return (
													<MenuItem eventKey = {dataValue} key = {j}>{dataValue}</MenuItem>
												)
											})
											}
										</DropdownButton>
									</Col>
									<Col sm = {6}>
										<div>Y-Value</div>
										<DropdownButton ref = "yVal" name = "yVal" bsSize="large" title={this.state.yVal || "Select Y"} id="dropdown-size-large" onSelect = {(evt) => {
											this.onHandleChange(evt, this.refs.yVal.props.name)}
										}>
									  {Object.keys(this.props.queryResult[0]).map((dataValue, j) => {
												return (
													<MenuItem eventKey = {dataValue} key = {j}>{dataValue}</MenuItem>
												)
											})
											}
										</DropdownButton>
									</Col>
								</FormGroup>
							</div>
							: <div></div>}
					</Modal.Body>
					<Modal.Footer>
						<div>

							<Button id = "query" type="button" onClick={() => this.onHandleSubmit()}>Query</Button>
							<Button id = "filter" type="button" onClick={() => this.props.handleFilterQuery(this.state.xVal, this.state.yVal) }>Filter</Button>

						</div>
					</Modal.Footer>
				</Form>
			</Modal>

		)
	}
}

const mapStateToProps = (state) => ({databases: state.databases, currDB: state.currDB, queryResult: state.queryResult})


const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		},
		handleFetchQuery(query){
			dispatch(fetchQuery(query))
		},
		handleFilterQuery(x,y){
			dispatch(filterQuery(x,y))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryForm)
