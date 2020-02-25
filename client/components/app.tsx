import React, { Component } from 'react';

import ThreadWindow from './thread_window';

export default class App extends Component {
  props: AppProps;

  render() {
    return (
      <div className="main-container">
        <ThreadWindow />
      </div>
    );
  }
}

interface AppProps {
}
