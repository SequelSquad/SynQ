import React from "react"
import {Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Modal, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {addLine, removeLine} from "../actions/lines"
import {setModel} from "../actions"
import update from "react-addons-update"
import ToggleCol from "./ToggleCol"
import Relationship from "./Relationship"
import InputError from "./InputError"
import {dialog} from "electron"


class PopUp extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			relationships: this.props.associations,
			id: this.props.id,
      name: this.props.model ? this.props.model.name : "",
      dataValues: this.props.model.dataValues ? this.props.model.dataValues :[],
      showError: false
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.onHandleCols = this.onHandleCols.bind(this)
		this.onHandleValidate = this.onHandleValidate.bind(this)
		this.onHandleSubmit = this.onHandleSubmit.bind(this)
		this.handleLineCreate = this.handleLineCreate.bind(this)
		this.handleRelationshipSelect = this.handleRelationshipSelect.bind(this)
		this.handleTableSelect = this.handleTableSelect.bind(this)
		this.addRelationship = this.addRelationship.bind(this)
		this.handleChangeRelationshipWrapper = this.handleChangeRelationshipWrapper.bind(this)
    this.handleChangeTableWrapper = this.handleChangeTableWrapper.bind(this)
    this.addDataValue = this.addDataValue.bind(this)
    this.checkNameInput = this.checkNameInput.bind(this)
    this.closeError = this.closeError.bind(this)
	}

	addRelationship(evt){
		evt.preventDefault()
		this.setState({
			relationships: [...this.state.relationships, {id: this.state.relationships.length + 1, Table1: this.props.id, Table2: "Table", Relationship: "Relationship"}]
		})
	}

	handleChangeRelationshipWrapper(jdx){
		const thisVar = this
		return function (evt) {
      console.log("state", thisVar.state.relationships, "evt", evt)
			const relationships = thisVar.state.relationships.map((relationship) => {
				if (jdx === relationship.id){
					return Object.assign({}, relationship, {Relationship: evt})
				} else return relationship
			})
			thisVar.setState({relationships})
		}
	}

	handleChangeTableWrapper(jdx){
		const thisVar = this
		return function (evt) {
			const tableId = thisVar.props.models.filter((model) => {
				return model.name === evt
			})[0].id
			const relationships = thisVar.state.relationships.map((relationship) => {
				if (jdx === relationship.id){
					return Object.assign({}, relationship, {Table2: tableId})
				} else return relationship
			})
			thisVar.setState({relationships})
		}
	}

	addDataValue(){
		this.setState({
      dataValues: [...this.state.dataValues, {id: this.state.dataValues.length, name: '', type:"", validate: []}]
		})
		//console.log('FORM77 addDataValues', this.state.dataValues)
	};

	onHandleChange(evt){
		let newState = {}
    newState[evt.target.name] = evt.target.value
    this.setState(newState)
	};

	onHandleCols = jdx => evt => {
    const dataValues = this.state.dataValues.map((dataVal, idx) => {
			console.log("I'm here")
      if(jdx === idx){
        return {...this.state.dataValues[idx], [evt.target.name] : evt.target.value}
      } else {
				return dataVal}
		})
    this.setState({dataValues: dataValues})
	}

	onHandleValidate = (columnIndex, propertyIndex) => evt => {
    const dataValues = this.state.dataValues.map((dataVal, idx) => {
      if(columnIndex === idx){
				if(!this.state.dataValues[idx].validate){
					this.state.dataValues[idx].validate = [[evt.target.value]]
				}
				if(evt.target.name === 'validateType'){
					if(!this.state.dataValues[idx].validate[propertyIndex]){
						//console.log('105', typeof this.state.dataValues[idx].validate)
						this.state.dataValues[idx].validate[propertyIndex] = [evt.target.value]
					}
					//console.log('line 108', evt.target.value, this.state.dataValues[idx].validate)
					this.state.dataValues[idx].validate[propertyIndex][0] = evt.target.value
				}
				if(evt.target.name === 'validateValue'){
					//console.log('line 112', propertyIndex, evt.target.value)
					this.state.dataValues[idx].validate[propertyIndex][1] = evt.target.value
				}
				//this.state.dataValues[idx].validate[propertyIndex] = evt.target.value
				//console.log('line 116', this.state.dataValues[idx].validate)
				return this.state.dataValues[idx]
      } else {
				return dataVal}
		})

    this.setState({dataValues: dataValues})
  }

	onHandleSubmit(){
    this.props.handleSubmit(this.state, this.props.key)
    this.handleLineCreate()
    this.props.handleRemoveModal()
  }

  checkNameInput() {
    if(!this.state.name){
      this.setState({showError: true})
    } else {
      this.onHandleSubmit()
    }
  }

  closeError(){
    this.setState({showError: false})
  }

	handleTableSelect(evt){
		this.setState({TargetTable: evt})
	}

	handleRelationshipSelect(evt){
		this.setState({Relationship: evt})
	}

	handleLineCreate(){
		this.props.lineCreate(this.state.relationships)
	}

	render() {
    const theme = this.props.theme
    let modalTheme = `table-modal-${theme}`

    let selectedModel = this.props.models.filter(model => model.id === this.state.id)[0]
		//console.log('selected Model', selectedModel)
		return (
			<Modal className={`table-modal ${modalTheme}`} dialogClassName="custom-modal" show = {true} onHide = {() => {
				this.props.handleRemoveModal()}} >
				<Modal.Header closeButton>
					<Modal.Title>Create Model</Modal.Title>
				</Modal.Header>
				<Form horizontal>
					<Modal.Body>

						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
						Name
							</Col>
							<Col sm={10}>
								<FormControl type="name" placeholder="Enter table name" name="name" value={this.state.name} onChange = {this.onHandleChange} required/>
							</Col>
						</FormGroup>
						<Col sm = {5}>
							{/* {this.props.associations.filter((association) => {
								return (
									association.Table1 === this.props.id
								)
							}).map((currAssoc, idx) => {
								return(
									<Relationship key = {idx} Table2 = {this.props.models.filter((model) => {
										return(
											model.id === currAssoc.Table2
										)
									})[0].name} Relationship = {currAssoc.Relationship}
									handleChangeRelationship = {this.handleChangeRelationshipWrapper}
									handleChangeTable = {
										this.handleChangeTableWrapper
									}
									idx = {idx} />
								)
							})
              } */}

							{this.state.relationships.filter((relationship) => {
               return relationship.Table1 === this.props.id
              }).
                map((relationship, idx) => {
								return (
									<Relationship key = {idx}
										relationship = {relationship}
										handleChangeRelationship = {this.handleChangeRelationshipWrapper}
										handleChangeTable = {
											this.handleChangeTableWrapper
										}
                    handleRemoveLine = {
                      this.props.handleRemoveLine
                    }
										idx = {idx} />
								)})
							}

              <Button onClick={this.addRelationship}>Add Relationship
				    </Button>


						</Col>
						<Col sm = {5}>
              <ToggleCol selectedModel={selectedModel} onHandleCols={this.onHandleCols} addDataValue={this.addDataValue} handleValidate={this.onHandleValidate}/>
						</Col>
					</Modal.Body>
					<Modal.Footer>
						<FormGroup>
							<Col smOffset={2} sm={10}>
              {this.state.showError ? <InputError onHandleSubmit={this.onHandleSubmit} closeError={this.closeError}/> : <div></div>}
								<Button type="submit" onClick={() =>
                  this.checkNameInput()}>
							Submit
								</Button>
							</Col>
						</FormGroup>
					</Modal.Footer>
				</Form>
			</Modal>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		id: state.currRect,
		models: state.models,
		model: state.models.filter(model => model.id === +state.currRect)[0],
		store: state,
    associations: state.lines,
    theme: state.theme
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
      dispatch(removeModal())
		},
		handleSubmit(state) {
			dispatch(setModel(state))
		},
		lineCreate(line){
			dispatch(addLine(line))
    },
    handleRemoveLine(id){
      dispatch(removeLine(id))
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)
