import React, { Component } from "react"
import { scaleLinear, scaleBand } from "d3-scale"
import { max } from "d3-array"
import { select } from "d3-selection"
import { findDOMNode } from "react-dom"
import * as d3Axis from "d3-axis"
import * as d3 from "d3"

class LineChart extends Component {
	constructor(props){
		super(props)
		this.createLineChart = this.createLineChart.bind(this)
		this.createAxes= this.createAxes.bind(this)
	}

	componentDidMount() {
		this.createLineChart()
	}

	componentDidUpdate() {
		this.createLineChart()
	}

	createLineChart() {
		const node = this.node

		const yScale = scaleLinear()
			.domain([0, this.props.data.length])
			.range([500, 0])

		const xScale = scaleBand()
			.domain(this.props.data.map(node => node.x))
			.rangeRound([0, 500])
			.padding(0.1)

		var d3line = d3.line()
			.x(d => xScale(d.x))
			.y(d => yScale(d.y))

		var newline = d3line(this.props.data)

		this.createAxes(xScale, yScale)


		select(node)
			.append("path")
			.attr("d", newline)
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 1.5)
	}

	createAxes(x, y){
		let axis =findDOMNode(this.refs.axis)

		const xAxis = d3Axis.axisBottom()
			.scale(x)
			.ticks([15])

		const yAxis = d3Axis.axisLeft()
			.scale(y)
			.ticks([15])

		select(axis)
			.append("g")
			.attr("transform", "translate(0,500)")
			.call(xAxis)

		select(axis)
			.append("g")
			.call(yAxis)
	}


	render() {
		console.log("DATA", this.props.data)
		return (
			<svg className = "linechart" ref={node => this.node = node}
				width={1000} height={700}>
				<g className = "x-axis" ref="axis"></g>
			</svg>
		)
	}

}
export default LineChart
