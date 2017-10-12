
import React, { Component } from "react"
import ReactDOM from "react-dom"


export default class Line extends Component {
	constructor (props){
		super(props)
	}

	render(){

		let x1, x2, y1, y2

		x1 = this.props.x1
		x2 = this.props.x2
		y1 = this.props.y1
		y2 = this.props.y2

		if(x1 - x2 < 0){
			return(
				<g>
					<text x = {x1+145} y = {y1+50} fill = "white" textAnchor = "middle">
						<tspan fontSize = "10">{this.props.relationship.Relationship}</tspan>
					</text>
					<path className = "line" ref = "markerEndNode" d = {`M${x1+120},${y1 + 55} L${x1 + 150}, ${y1 + 55}`} stroke = "green" strokeWidth = "5"/>
					<path className = "line" id = "main" ref = "markerEndNode" d = {`M${x1+151},${y1 + 55} L${x2 - 45}, ${y2+55}`} stroke = "green" />
					<path className = "line" ref = "markerEndNode" d = {`M${x2 - 44},${y2 + 55} L${x2 - 15}, ${y2+55}`} stroke = "green" strokeWidth = "5" />
				</g>
			)
		} else {
			return (

				<g>
					<text x = {x1-50} y = {y1+50} fill = "white" textAnchor = "middle">
						<tspan fontSize = "10">{this.props.relationship.Relationship}</tspan>
					</text>
					<path className = "line" ref = "markerEndNode" d = {`M${x1 - 10},${y1 + 55} L${x1 - 45}, ${y1 + 55}`} stroke = "green" strokeWidth = "5"/>
					<path className = "line" ref = "markerEndNode" d = {`M${x1-46},${y1 + 55} L${x2 + 150}, ${y2+55}`} stroke = "green" />
					<path className = "line" ref = "markerEndNode" d = {`M${x2 + 151},${y2 + 55} L${x2}, ${y2+55}`} stroke = "green" strokeWidth = "5" />
				</g>

			)
		}
	}
}


