import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { receiveKey } from '../actions/reader';
import Thread from '../models/thread/thread';
import TalkFragment from '../models/talk/fragment';
import ThreadHandler from '../models/thread/thread_handler/thread_handler';
import Reader from '../models/reader';
import Cursor from './cursor';
import { FragmentTypes } from '../models/enums/fragment_types';

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

    this.keyClick = this.keyClick.bind(this);
  }

  callThreadStep() {
    if (this.props.tHandler.ended == false) {
      let result = this.props.tHandler.takeStep(this.state.secondsElapsed);
      let tHandler = this.props.tHandler;
      this.setState({lines: tHandler.threads[tHandler.currentSpeaker].lines});
    }
  }

  countSecond() {
    this.setState({ secondsElapsed: this.state.secondsElapsed+1 });
  }

  keyClick(key: string) {
    this.props.receiveKey(this.props.reader, key);
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
      if (fragment.type == FragmentTypes.STANDARD) {
        return <span key={fIndex}>{fragment.visible}</span>
      }
      else if (fragment.type == FragmentTypes.KEY) {
        return (
          <span key={fIndex} className="key"
            onClick={() => this.keyClick(fragment.text)}>
            {fragment.visible}
          </span>
        );
      }
    });
  }
}

class ThreadWindowProps {
  tHandler: ThreadHandler;
  reader: Reader;

  receiveKey: (reader: Reader, key: string) => any;
}

class ThreadWindowState {
  lines: TalkFragment[][];
  intervalStep: NodeJS.Timeout;
  secondsElapsed: number;
  intervalSeconds: NodeJS.Timeout;
}

function mapStateToProps({ tHandler, reader }) {
  return { tHandler, reader }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    receiveKey
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadWindow);
