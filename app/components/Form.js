import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"


class PopUp extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			email: "",
			password: ""
		}
		this.onHandleChange = this.onHandleChange.bind(this)
	}

	onHandleChange(evt){
		evt.preventDefault()
		let newState = {}
		newState[evt.target.name] = evt.target.value
		this.setState(newState)
	}

	render() {

		return (
			<Modal className="signInModal" bsSize="small" show = {true} onHide = {() => {
				this.props.handleRemoveModal()}} >
				<Modal.Header closeButton>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>
				<Form horizontal onSubmit = {() => {
					this.props.handleSubmit(this.state)}}>
					<Modal.Body>
						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
						Email
							</Col>
							<Col sm={10}>
								<FormControl type="email" placeholder="Email" name = "email" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalPassword">
							<Col componentClass={ControlLabel} sm={2}>
						Password
							</Col>
							<Col sm={10}>
								<FormControl type="password" placeholder="Password" name = "password" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<tr>
							<td>
								<FormGroup>
									<Col smOffset={2} sm={10}>
										<Button type="submit">
							Sign in
										</Button>
									</Col>
								</FormGroup>
							</td>
							<td>
								<FormGroup>
									<Col smOffset={2} sm={10}>
										<Button href = "/auth/google" bsStyle="danger">
						Sign in with Google
										</Button>
									</Col>
								</FormGroup>
							</td>
						</tr>
					</Modal.Footer>
				</Form>
			</Modal>

		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		},
		// handleSubmit(credentials) {
		// 	dispatch(login(credentials))
		// }
	}
}

export default connect(state => state, mapDispatchToProps)(PopUp)
