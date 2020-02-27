import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Thread from '../models/thread/thread';
import Cursor from './cursor';

import { amichael0_0 } from '../instances/talks/amichael/0.0';

const INTERVAL_MS = 50;

export default class ThreadWindow extends Component {
  state: ThreadWindowState;

  constructor(props: any) {
    super(props);

    this.state = {
      text: '',
      thread: new Thread(amichael0_0),
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
    let textSplit = this.state.text.split('\n');
    return (
      <div className="thread-container">
        {textSplit.map((line, index) => {
          if (index == textSplit.length-1 && line.length > 0) {
            return <div key={index}>{line}<Cursor /></div>
          }
          else {
            return <div key={index}>{line}</div>
          }
        })}
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
