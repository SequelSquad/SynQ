
import React, { Component } from "react"
import ReactDOM from "react-dom"


export default class Line extends Component {
	constructor (props){
		super(props)
	}

	componentDidMount(){
		// let markerNode = ReactDOM.findDOMNode(this.refs.marker)
		// let markerEndNode = ReactDOM.findDOMNode(this.refs.markerEndNode)
		// markerNode.setAttribute("markerWidth", 13)
		// markerNode.setAttribute("markerHeight", 13)
		// markerNode.setAttribute("refX", 2)
		// markerNode.setAttribute("refY", 6)
		// markerNode.setAttribute("orient", !flip ? "auto" : "auto-start-reverse")
		// markerEndNode.setAttribute("style", !flip ? "marker-end: url(#arrow)" : "marker-start: url(#arrow)")
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
					{/* <defs>
            <marker id="arrow" ref ="marker" strokeWidth = "0">
              <circle cx="5" cy="5" r="5" fill="white" strokeWidth = "0"/>
            </marker>
          </defs> */}
					<text x = {x1+125} y = {y1+50} fill = "white" textAnchor = "middle">
						<tspan fontSize = "10">{this.props.relationship.Relationship}</tspan>
					</text>
					<path className = "line" ref = "markerEndNode" d = {`M${x1+100},${y1 + 55} L${x1 + 130}, ${y1 + 55}`} stroke = "green" strokeWidth = "5"/>
					<path className = "line" id = "main" ref = "markerEndNode" d = {`M${x1+131},${y1 + 55} L${x2 - 45}, ${y2+55}`} stroke = "green" />
					<path className = "line" ref = "markerEndNode" d = {`M${x2 - 44},${y2 + 55} L${x2 - 15}, ${y2+55}`} stroke = "green" strokeWidth = "5" />
					{/* {!flip ? <path id = {`myTextPath${this.props.idx}`} d = {`M${x1+101},${y1 + 56} L${x2 - 26}, ${y2+56}`} stroke = "green" /> :  <path id = {`myTextPath${this.props.idx}`} d = {`M${x2+121},${y2 + 56} L${x1 + 26}, ${y1+56}`} stroke = "green"/>}
          </defs>
          {!flip ? <path ref = "markerEndNode" d = {`M${x1+100},${y1 + 55} L${x2 - 25}, ${y2+55}`} stroke = "green" style = {style1} /> :
            <path ref = "markerEndNode" d = {`M${x2+120},${y2 + 55} L${x1 + 25}, ${y1+55}`} stroke = "green" style = {style2} /> }
          <use xlinkHref = {`#myTextPath${this.props.idx}`} fill = "none" stroke = "white"></use>
          <text fill = "white" fontSize = "12.5" x = {!flip ? "20" : "200"}><textPath  xlinkHref = {`#myTextPath${this.props.idx}`} >ho</textPath >
          </text> */}
					{/* <line x1={x1+45} y1={y1+55} x2={x2+45} y2={y2+55} stroke = "black"/> */}
				</g>
			)
		} else {
			return (

				<g>
					<text x = {x1-50} y = {y1+50} fill = "white" textAnchor = "middle">
						<tspan fontSize = "10">{this.props.relationship.Relationship}</tspan>
					</text>
					<path className = "line" ref = "markerEndNode" d = {`M${x1-10},${y1 + 55} L${x1 - 40}, ${y1 + 55}`} stroke = "green" strokeWidth = "5"/>
					<path className = "line" ref = "markerEndNode" d = {`M${x1-41},${y1 + 55} L${x2 + 131}, ${y2+55}`} stroke = "green" />
					<path className = "line" ref = "markerEndNode" d = {`M${x2 + 130},${y2 + 55} L${x2 + 100}, ${y2+55}`} stroke = "green" strokeWidth = "5" />
				</g>

			)
		}

	}
}


