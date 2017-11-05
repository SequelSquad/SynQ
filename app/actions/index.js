import { ADD_MODEL, MOVE_POSITION, REMOVE_ALL_RECS, addModel, movePosition, REMOVE_REC, removeRec, addModelThunk, removeAllRecs } from "./addModel"
import { SET_MODAL, REMOVE_MODAL, setModal, removeModal } from "./modalAction"
import { SET_MODEL, setModel, ADD_TABLE, addTable, REMOVE_MODEL,REMOVE_ALL_MODELS, removeModel, removeAllModels } from "./modelAction"
import {selectLine, removeAllLines} from "./lines"
// import { ADD_COLUMN, addColumn } from "./addColumn"
import { SET_CURR_RECT, setCurrRect } from "./currRectAction"
import { SET_PATH, setPath } from "./setPath"
import { SET_THEME, setTheme } from "./setTheme"
import { SET_CURR_DB, setCurrDB } from "./currDBAction"

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
	REMOVE_ALL_MODELS,
	REMOVE_ALL_RECS,
	SET_CURR_DB,
	setCurrDB,
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
	selectLine,
	removeAllLines,
	removeAllModels,
	removeAllRecs
}
