// @flow
import React, { Component } from 'react';
import type { Children } from 'react';


class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
        <div>
        {this.props.children}
        </div>
    );
  }
}

export default App
