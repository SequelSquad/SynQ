
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
					<text x = {x1+310} y = {y1+45} fill = "white" textAnchor = "middle">
						<tspan fontSize = "20">{this.props.relationship.Relationship}</tspan>
					</text>
					<path className = "line" ref = "markerEndNode" d = {`M${x1+240},${y1 + 55} L${x1 + 300}, ${y1 + 55}`} stroke = "green" strokeWidth = "10"/>
					<path className = "line" id = "main" ref = "markerEndNode" d = {`M${x1+301},${y1 + 55} L${x2 - 61}, ${y2+55}`} stroke = "green" strokeWidth = "3"/>
					<path className = "line" ref = "markerEndNode" d = {`M${x2 - 60},${y2 + 55} L${x2 - 15}, ${y2+55}`} stroke = "green" strokeWidth = "10" />
				</g>
			)
		} else {
			return (

				<g>
					<text x = {x1-60} y = {y1+45} fill = "white" textAnchor = "middle">
						<tspan fontSize = "20">{this.props.relationship.Relationship}</tspan>
					</text>
					<path className = "line" ref = "markerEndNode" d = {`M${x1 - 10},${y1 + 55} L${x1 - 60}, ${y1 + 55}`} stroke = "green" strokeWidth = "10"/>
					<path className = "line" ref = "markerEndNode" d = {`M${x1-61},${y1 + 55} L${x2 + 299}, ${y2+55}`} stroke = "green" strokeWidth="3" />
					<path className = "line" ref = "markerEndNode" d = {`M${x2 + 300},${y2 + 55} L${x2+200}, ${y2+55}`} stroke = "green" strokeWidth = "10" />
				</g>

			)
		}
	}
}
