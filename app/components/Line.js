
import React, { Component } from "react"


export default class Line extends Component {
	constructor (props){
		super(props)
	}

	render(){

		let x1 = this.props.x1
		let x2 = this.props.x2
		let y1 = this.props.y1
		let y2 = this.props.y2

		return(
			<g>
				<line x1={x1} y1={y1} x2={x2} y2={y2} stroke = "black"/>
			</g>
		)
	}
}


