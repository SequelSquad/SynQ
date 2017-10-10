import React from "react"
import {Form, FormGroup, Col, Row, FormControl, Button, Checkbox, ControlLabel, Modal, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {removeModal} from "../actions/modalAction"
import {setModel, removeModel, removeRec} from "../actions"
import {addLine, removeLine} from "../actions/lines"
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
      dataValues: this.props.model.dataValues ? this.props.model.dataValues : [],
      showError: false,
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
		this.handleDeleteColumn = this.handleDeleteColumn.bind(this)
    this.handleRemoveModel = this.handleRemoveModel.bind(this)
    this.handleRemoveLineWrapper = this.handleRemoveLineWrapper.bind(this)
    this.onHandleColType = this.onHandleColType.bind(this)
  }

  handleRemoveLineWrapper(id){
    this.props.handleRemoveLine(id)
    this.setState({
      relationships: this.state.relationships.filter((relationship) => relationship.id !== id)
    })
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

	addDataValue(id){
		this.setState({
      dataValues: [...this.state.dataValues, {id: id, name: '', type:"", validate: []}]
		})
	};

	onHandleChange(evt){
		let newState = {}
    newState[evt.target.name] = evt.target.value
    this.setState(newState)
	};

	onHandleCols = jdx => evt => {
    console.log("ONHANGLECOLS HERE", evt.target)
    const dataValues = this.state.dataValues.map((dataVal, idx) => {
			console.log("I'm here??????", dataVal)
      if(jdx === dataVal.id){
        return {...this.state.dataValues[idx], [evt.target.name] : evt.target.value}
      } else {
				return dataVal}
		})
    this.setState({dataValues: dataValues})
  }

  onHandleColType = jdx => evt => {
    console.log("JDX", jdx)
    const dataValues = this.state.dataValues.map((dataVal, idx) => {
			console.log("dataIDX", dataVal.id)
      if(jdx === dataVal.id){
        return {...this.state.dataValues[idx], ["type"] : evt}
      } else {
				return dataVal}
    })
    console.log("DATAVALS BEFORE SET STATE", this.state)
    this.setState({dataValues: dataValues})
    console.log("DATAVALS STATE", this.state.dataValues)
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

	handleDeleteColumn(colId){
		const newValues = []
		const dataValues = this.state.dataValues.forEach((data, index) => {
			if (colId !== data.id){
				newValues.push(data)
			}
		})
		this.setState({dataValues: newValues})
	}

	handleRemoveModel(id){
		this.props.removeModelWrapper(id)
	}

	render() {
    const theme = this.props.theme
    let modalTheme = `table-modal-${theme}`

		return (
			<Modal className={`table-modal ${modalTheme}`} dialogClassName="custom-modal" show = {true} onHide = {() => {
				this.props.handleRemoveModal(this.state.id)}} >
				<Modal.Header closeButton>
					<Modal.Title>Create Model</Modal.Title>
				</Modal.Header>
				<Form horizontal>
					<Modal.Body>
						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={6}>Name</Col>
							<Col sm={12}>
								<FormControl type="name" placeholder="Enter table name" name="name" value={this.state.name} onChange = {this.onHandleChange} required/>
							</Col>
						</FormGroup>
						<Col sm = {6}>
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
                      this.handleRemoveLineWrapper
                    }
										idx = {idx} />
								)})
							}
              <Col smOffset={3}>
                <Button className="add-button" onClick={this.addRelationship}>+ Add Relationship</Button>
              </Col>
						</Col>

						<Col sm={6}>
              <ToggleCol dataValues={this.state.dataValues} onHandleCols={this.onHandleCols} onHandleColType={this.onHandleColType} addDataValue={this.addDataValue} handleValidate={this.onHandleValidate} handleDeleteColumn={this.handleDeleteColumn}/>
						</Col>
					</Modal.Body>
					<Modal.Footer>
                  {this.props.associations.filter((association) => {
                    return (association.Table1 === this.props.id || association.Table2 === this.props.id)
                  }).length ? <span><Button disabled type="button" onClick={() => this.handleRemoveModel(this.props.id)}>Delete</Button><Button className="save-button" type="submit" onClick={() =>
                      this.checkNameInput()}>
                  Save
                    </Button></span> : <span><Button className="save-button" type="button" onClick={() => this.handleRemoveModel(this.props.id)}>Delete</Button><Button className="save-button" type="submit" onClick={() =>
                      this.checkNameInput()}>
                  Save
                    </Button></span>
                  }
                  {this.state.showError ? <InputError onHandleSubmit={this.onHandleSubmit} closeError={this.closeError}/> : <div></div>}
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
		removeModelWrapper(modelId){
			dispatch(removeRec(modelId))
			dispatch(removeModel(modelId))
			dispatch(removeModal())
    },
    handleRemoveLine(id){
      dispatch(removeLine(id))
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)
