import React, { Component } from 'react';

export default class App extends Component {
  props: AppProps;

  render() {
    return (
      <div className="main-container">
        Well, look at this.
      </div>
    );
  }
}

interface AppProps {
}
