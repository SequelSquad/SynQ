// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"
import styles from "./Home.css"
import fs from "fs"

export default class Home extends Component {
	constructor() {
		super()

		this.state = { input: "" }
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log("CLICK!!!!!")
		fs.mkdir("/Users/dorischeng/electron-react-boilerplate/db", (err) => {
			if (err) {
				console.log("failed to create dir", err)
			} else {
				fs.writeFile("/Users/dorischeng/electron-react-boilerplate/db" + "/test.js", this.state.input, (err) => {
					if (err) {
						console.log("Where's the input?")
					}
					else {
						console.log("wrote file")
					}
				})
			}
		})
	}

	render() {
		return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Model Name" name="input" onChange={this.handleChange} />
            <button>Submit</button>
          </form>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>)
	}
}
