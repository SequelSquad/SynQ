import React from "react"
import { Link } from "react-router"
import {connect} from "react-redux"
import Rectangle from "../components/Rectangle"

const Sidebar = (props) => {

	return (
		<div className='sidebar-menu'>
			<ul className = "nav sidebar-nav">
				<br/>
				<li>
					<Rectangle />
				</li>
	    </ul>
		</div>
	)
}


export default Sidebar
