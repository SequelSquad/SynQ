import { ADD_MODEL, MOVE_POSITION, addModel, movePosition, REMOVE_REC, removeRec, addModelThunk } from "./addModel"
import { SET_MODAL, REMOVE_MODAL, setModal, removeModal } from "./modalAction"
import { SET_MODEL, setModel, ADD_TABLE, addTable, REMOVE_MODEL, removeModel } from "./modelAction"
import {selectLine} from "./lines"
// import { ADD_COLUMN, addColumn } from "./addColumn"
import { SET_CURR_RECT, setCurrRect } from "./currRectAction"
import { SET_PATH, setPath } from "./setPath"
import { SET_THEME, setTheme } from "./setTheme"

export default {
	ADD_MODEL,
	MOVE_POSITION,
	SET_MODAL,
	REMOVE_MODAL,
	SET_MODEL,
	SET_CURR_RECT,
	ADD_TABLE,
	SET_PATH,
	SET_THEME,
	REMOVE_MODEL,
	REMOVE_REC,
	removeRec,
	addModel,
	addModelThunk,
	movePosition,
	setModal,
	removeModal,
	setModel,
	setCurrRect,
	addTable,
	setPath,
	setTheme,
	removeModel,
	selectLine
}
