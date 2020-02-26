import React, { Component } from 'react';

export default class Cursor extends Component {
  state: {on: boolean, interval: NodeJS.Timeout}

  constructor(props: any) {
    super(props);

    this.state = {
      on: false,
      interval: setInterval(() => {
        this.toggle()
      }, 500)
    }
  }

  toggle() {
    this.setState({on: !this.state.on});
  }

  render() {
    if (this.state.on) {
      return (
        <span className="cursor-on">_</span>
      );
    }
    else {
      return (
        <span className="cursor-off">_</span>
      );
    }
  }
}
