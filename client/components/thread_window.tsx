import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Thread from '../models/thread';

import { amichael0 } from '../instances/talks/amichael/0';

export default class ThreadWindow extends Component {
  state: ThreadWindowState;

  constructor(props: any) {
    super(props);

    this.state = {
      text: '',
      thread: new Thread(amichael0),
      interval: setInterval(() => {
        this.callThreadStep();
      }, 50),
    }
  }

  callThreadStep() {
    if (this.state.thread.ended == false) {
      let newText = this.state.thread.step();
      this.setState({text: newText});
    }
  }

  render() {
    return (
      <div className="thread-container">
        {this.state.text}
      </div>
    );
  }
}

class ThreadWindowState {
  text: string;
  thread: Thread;
  interval: NodeJS.Timeout;
}
