import {expect} from "chai"
import {createStore} from "redux"
import mainReducer from "../../app/reducers"

describe("Reducer", () => {

	const initialState = {
		path: "",
		createModel: [{id: 1, top: 244, left: 255}],
		models: [{
			id: 1,
			name: "Puppies",
			dataValuve: [{
				name: "Owner",
				type: "STRING",
				boolean: "",
				validate: []
			}]
		}],
		currentModal: "POP_UP",
		currRect: 1,
		lines:[]
	}

	let testStore

	beforeEach("Create testing store and freezing it", () => {
		testStore = createStore(mainReducer)
		// freeze store
		Object.freeze(testStore.getState())
	})

	it("has expected initial state", () => {
		expect(testStore.getState()).to.be.deep.equal(initialState)
	})

	describe("ADD_MODEL", () => {

	})

  describe("ADD_COLUMN", () => {

  })

  describe("MOVE_POSITION", () => {

  })

  describe("SET_MODAL", () => {

      })

      describe("REMOVE_MODAL", () => {

          })
          describe("SET_MODEL", () => {

                      })
                      describe("SET_CURR_RECT", () => {

                                              })
  describe("ADD_TABLE", () => {
  })

  describe("SET_THEME", () => {
  })

  describe("SET_PATH", () => {
  })
