class Form extends React.Component {
  state = {
    inputs: [] // {value, name}
  }

  addInput = (evt) => {
    evt.preventDefault()
    this.setState({
      inputs: [...this.state.inputs, {value: ''}]
    })
  }

  handleChange = jdx => evt => {
    const value = evt.target.value
    const inputs = this.state.inputs.map((input, idx) => {
      if (jdx === idx) {
        return {value}
      } else return input
    })
    this.setState({inputs})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(this.state)
  }

  remove = idx => {
    const inputs = this.state.inputs.filter((i, jdx) => jdx !== idx)
    this.setState({inputs})
  }

  render () {
    return (
      <div>
        <button onClick={this.addInput}>Add Input</button>
        <form onSubmit={this.handleSubmit}>
          {this.state.inputs.map((input, idx) => (
            <div key={idx} style={{'display': 'block'}}>
              <input onChange={this.handleChange(idx)} type="text" value={input.value || ''} />
              <a onClick={() => this.remove(idx)}>Remove</a>
            </div>
          ))}
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}
