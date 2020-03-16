import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Thread from '../models/thread/thread';
import ThreadHandler from '../models/thread/thread_handler/thread_handler';
import Cursor from './cursor';

import { amichael0_0 } from '../instances/talks/amichael/0.0';

const INTERVAL_MS = 50;

class ThreadWindow extends Component {
  props: ThreadWindowProps;
  state: ThreadWindowState;

  constructor(props: any) {
    super(props);

    this.state = {
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
    if (this.props.tHandler.ended == false) {
      let newText = this.props.tHandler.takeStep(this.state.secondsElapsed);
      this.setState({text: newText});
    }
  }

  countSecond() {
    this.setState({ secondsElapsed: this.state.secondsElapsed+1 });
  }

  render() {
    let tHandler = this.props.tHandler;
    let textSplit = tHandler.threads[tHandler.currentSpeaker].text.split('\n');
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

class ThreadWindowProps {
  tHandler: ThreadHandler;
}

class ThreadWindowState {
  intervalStep: NodeJS.Timeout;
  secondsElapsed: number;
  intervalSeconds: NodeJS.Timeout;
}

function mapStateToProps({ tHandler }) {
  return { tHandler }
}

export default connect(mapStateToProps)(ThreadWindow);
