import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Thread from '../models/thread/thread';
import TalkFragment from '../models/talk/fragment';
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
      lines: [[]],
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
      let tHandler = this.props.tHandler;
      let talk = tHandler.threads[tHandler.currentSpeaker]
        .getTalk(tHandler.threadStates[tHandler.currentSpeaker].currentTalk);
      this.setState({lines: talk.lines});
    }
  }

  countSecond() {
    this.setState({ secondsElapsed: this.state.secondsElapsed+1 });
  }

  render() {
    return (
      <div className="thread-container">
        {this.state.lines.map((line, lIndex) => {
          if (lIndex == this.state.lines.length-1 && line.length > 0) {
            return <div key={lIndex}>{this.renderLine(line)}<Cursor /></div>
          }
          else {
            return <div key={lIndex}>{this.renderLine(line)}</div>
          }
        })}
      </div>
    );
  }

  renderLine(line: TalkFragment[]) {
    return line.map((fragment, fIndex) => {
      return <span key={fIndex}>{fragment.visible}</span>
    });
  }
}

class ThreadWindowProps {
  tHandler: ThreadHandler;
}

class ThreadWindowState {
  lines: TalkFragment[][];
  intervalStep: NodeJS.Timeout;
  secondsElapsed: number;
  intervalSeconds: NodeJS.Timeout;
}

function mapStateToProps({ tHandler }) {
  return { tHandler }
}

export default connect(mapStateToProps)(ThreadWindow);
