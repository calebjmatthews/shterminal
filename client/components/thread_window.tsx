import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Thread from '../models/thread';

import { amichael0 } from '../instances/talks/amichael/0';

const INTERVAL_MS = 50;

export default class ThreadWindow extends Component {
  state: ThreadWindowState;

  constructor(props: any) {
    super(props);

    this.state = {
      text: '',
      thread: new Thread(amichael0),
      intervalStep: setInterval(() => {
        this.callThreadStep();
      }, INTERVAL_MS),
      secondsElapsed: 0,
      intervalSeconds: setInterval(() => {
        this.countSecond();
      }, 1000)
    }
  }

  callThreadStep() {
    if (this.state.thread.ended == false) {
      let newText = this.state.thread.step(this.state.secondsElapsed);
      this.setState({text: newText});
    }
  }

  countSecond() {
    this.setState({ secondsElapsed: this.state.secondsElapsed+1 });
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
  intervalStep: NodeJS.Timeout;
  secondsElapsed: number;
  intervalSeconds: NodeJS.Timeout;
}
