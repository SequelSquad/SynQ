

it("form should have a select that lists all the animals as options", () => {
	expect(animalSelect.find("select").length).to.be.equal(1)
	// loops through each option in the select
	// determines if the option's key is equivalent to the animal
	expect(animalSelect.find("option")).to.have.length(animals.length)
	animalSelect.find("option").forEach((animalOption, i) => {
		expect(animalOption.key()).to.be.equal(animals[i])
		expect(animalOption.text().trim()).to.be.equal(animals[i])
	})
})

it("should have a label to describe the select", () => {
	const selectLabel = animalSelect.find("label")
	expect(selectLabel.length).to.be.equal(1)
	expect(selectLabel.text()).to.be.equal("Select an Animal: ")
})
