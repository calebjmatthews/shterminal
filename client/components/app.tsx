import React, { Component } from 'react';

import Thread from './thread';

export default class App extends Component {
  props: AppProps;

  render() {
    return (
      <div className="main-container">
        <Thread />
      </div>
    );
  }
}

interface AppProps {
}
