import React from "react"
import {expect} from "chai"
import {shallow} from "enzyme"
import {spy} from "sinon"

import Form from "../../app/components/Form"

describe("<Form /> component", () => {

	let form, id, name
	beforeEach("Create Form component and onChange spy", () => {
		id = 1
		name = "Puppies"
		// this is the enzyme way of creating the tag and sending it props
		// meaning shallow is like a parent rendering a Form element and sending it props like id and name
		// form is the returned value of `shallow()` which is a wrapper around our ReactElement (Form)
		form = shallow(<Form id={id} name={name}/>)
	})

	it("has an initial *local* state with relationships, id, name, dataValues, and showError", () => {
		expect(form.state()).to.be.deep.equal({
			relationships: [],
			id: id,
			name: name,
			dataValues: [],
			showError: false})
	})

	it("has an initial *local* state with name as an empty string if props doesn't contain name", () => {
		let form2 = shallow(<Form id={id} />)

		expect(form2.state()).to.be.deep.equal({
			relationships: [],
			id: id,
			name: "",
			dataValues: [],
			showError: false})
	})

	it("uses <ToggleCol />, <Relationship />, <InputError />", () => {
		expect(form.find(ToggleCol).length).to.be.equal(1)
		expect(form.find(Relationship).length).to.be.equal(1)
		expect(form.find(InputError).length).to.be.equal(1)
	})

	it("passes its own selectedModel prop to <ToggleCol />", () => {
		// expect(form.find(ToggleCol).props().selectedModel).to.be.equal(selectedModel)
	})

	it("passes its own ___ prop to <Relationship />", () => {
		//???
	})

	it("has a onHandleChange function that takes in event and changes state properties according to corresponding event values", () => {
		expect(form.instance().onHandleChange).to.be.function
		form.instance().onHandleChange({name: "Puppy"})
		expect(form.state()).to.be.deep.equal({
			relationships: [],
			id: 1,
			name: "Puppy",
			dataValues: [],
			showError: false
		})
	})

	it("ensures onHandleChange function is properly bound", () => {
		expect(form.instance().onHandleChange.hasOwnProperty("prototype")).to.be.false
	})

})

it("select should have an onSubmit event that submits the store to the generator function", () => {
	expect(animalSelect.props("select").onChange).to.be.function
	// choosing a random animal
	let animal = getRandomAnimal()
	// simulating a 'change' event with an event described as the second argument given to `simulate`
	animalSelect.find("select").simulate("change", {target: {value: animal}})
	// the spy sent in should be called with the argument described
	expect(setAnimalSpy.calledWith(animal)).to.be.true
})


