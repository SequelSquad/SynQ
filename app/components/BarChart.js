import React, { Component } from "react"
import { scaleLinear, scaleBand } from "d3-scale"
import { max } from "d3-array"
import { select } from "d3-selection"
import { findDOMNode, getDOMNode } from "react-dom"
import * as d3Axis from "d3-axis"

class BarChart extends Component {
	constructor(props){
		super(props)
		this.createBarChart = this.createBarChart.bind(this)
		this.createAxes= this.createAxes.bind(this)
	}

	componentDidMount() {
		this.createBarChart()
	}

	componentDidUpdate() {
		this.createBarChart()
	}

	createBarChart() {
		const node = this.node
		const yScale = scaleLinear()
			.domain([0, this.props.data.length])
			.range([500, 0])

		const xScale = scaleBand()
			.domain(this.props.data.map(node => node.x))
			.rangeRound([0, 500])
			.padding(0.1)

		select(node)
			.selectAll("rect")
			.data(this.props.data)
			.enter()
			.append("rect")

		select(node)
			.selectAll("rect")
			.data(this.props.data)
			.exit()
			.remove()

		select(node)
			.selectAll("rect")
			.data(this.props.data)
			.style("fill", "#fe9922")
			.attr("x", d => xScale(d.x))
			.attr("y", d => 500 - yScale(d.y))
			.attr("height", d => yScale(d.y))
			.attr("width", xScale.bandwidth())

		this.createAxes(xScale, yScale)
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
		return (
			<svg ref={node => this.node = node}
				width={1000} height={700}>
				<g className = "x-axis" ref="axis"></g>
			</svg>
		)
	}

}
export default BarChart
