import {expect} from "chai"
import { addModel, movePosition, setModal, removeModal, setModel, setCurrRect, addTable, setPath, setTheme } from "../../app/actions"

describe("Action Creators", () => {
	describe("addModel", () => {
		it("it returns properly formatted action", () => {
			let testModel = {
				id: 2,
				top: 235,
				left: 215
			}
			expect(addModel(testModel)).to.be.deep.equal({
        type: 'ADD_MODEL',
        model : testModel
    });
	})

	describe("movePosition", () => {
		it("it returns properly formatted action", () => {
      let testModel = {
        id: 1,
				top: 200,
				left: 300
      }
			expect(movePosition(testModel)).to.be.deep.equal({
        type: 'MOVE_POSITION',
        model: testModel
      })
		})
	})

	describe("setModal", () => {
		it("it returns properly formatted action", () => {
      let testModal = "POP_UP"
			expect(setModal(testModal)).to.be.deep.equal({
        type: 'SET_MODAL',
        modal: testModal
      })
		})
	})

	describe("removeModal", () => {
		it("it returns properly formatted action", () => {
			expect(removeModal()).to.be.deep.equal({
        type: 'REMOVE_MODAL'
      })
		})
	})

	describe("setModel", () => {
		it("it returns properly formatted action", () => {
      let testModel = {
        relationships: [],
        id: 4,
        name: "Puppies",
        dataValues: [],
        showError: false
      }
			expect(setModel(testModel)).to.be.deep.equal({
        type: 'SET_MODEL',
        modal: testModel
      })
		})
	})

	describe("setCurrRect", () => {
    it("it returns properly formatted action", () => {
      let testCurrRectId = 3
			expect(setModal(testCurrRectId)).to.be.deep.equal({
        type: 'SET_CURR_RECT',
        modal: testCurrRectId
      })
		})
	})

	describe("addTable", () => {
		it("it returns properly formatted action", () => {
      let testTable = {
        id: 2
      }
			expect(setModal(testTable)).to.be.deep.equal({
        type: 'ADD_TABLE',
        modal: testTable
      })
		})
	})

	describe("setPath", () => {
		it("it returns properly formatted action", () => {
      let testPath = "/documents/Pets"
			expect(setPath(testPath)).to.be.deep.equal({
        type: 'SET_PATH',
        modal: testPath
      })
		})
	})

	describe("setTheme", () => {
		it("it returns properly formatted action", () => {
      let testTheme = "btn-light"
			expect(setTheme(testTheme)).to.be.deep.equal({
        type: 'SET_THEME',
        modal: testTheme
      })
		})
	})
