import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ThreadHandler from '../models/thread/thread_handler/thread_handler';
import { setPendingTalk } from '../actions/thread_handler';
import { utils } from '../models/utils';
import { ResponseNames } from '../models/enums/response_names';

class ThreadToggle extends Component {
  props: ThreadToggleProps;
  state: ThreadToggleState;

  constructor(props: {givenValue: string}) {
    super(props);

    this.state = {
      talkId: [0, 0],
      label: '0.0'
    };
    let tHandler = this.props.tHandler;
    let threadState = tHandler.threadStates[tHandler.currentSpeaker];
    if (threadState) {
      if (threadState.currentTalk) {
        this.state.talkId = threadState.currentTalk;
        this.state.label = (threadState.currentTalk[0] + '.'
          + threadState.currentTalk[1]);
      }
    }

    this.homeClick = this.homeClick.bind(this);
    this.upClick = this.upClick.bind(this);
    this.downClick = this.downClick.bind(this);
    this.goClick = this.goClick.bind(this);
  }

  setLabel(talkId: number[]) {
    this.setState({label: (talkId[0] + '.' + talkId[1])});
  }

  homeClick() {
    let newTalkId = this.props.tHandler
      .threadStates[this.props.tHandler.currentSpeaker].currentTalk;
    this.setState({
      talkId: newTalkId,
      label: (newTalkId[0] + '.' + newTalkId[1])
    });
  }

  upClick() {
    let talks = this.props.tHandler.threads[this.props.tHandler.currentSpeaker].talks;
    if (talks[this.state.talkId[0]][this.state.talkId[1]-1]) {
      let newTalkId = [this.state.talkId[0], (this.state.talkId[1]-1)];
      this.setState({
        talkId: newTalkId,
        label: (newTalkId[0] + '.' + newTalkId[1])
      });
    }
    else if (talks[this.state.talkId[0]-1][0]) {
      let newTalkId = [(this.state.talkId[0]-1),
        (talks[this.state.talkId[0]-1].length-1)];
      this.setState({
        talkId: newTalkId,
        label: (newTalkId[0] + '.' + newTalkId[1])
      });
    }
  }

  downClick() {
    let talks = this.props.tHandler.threads[this.props.tHandler.currentSpeaker].talks;
    if (talks[this.state.talkId[0]][this.state.talkId[1]+1]) {
      let newTalkId = [this.state.talkId[0], (this.state.talkId[1]+1)];
      this.setState({
        talkId: newTalkId,
        label: (newTalkId[0] + '.' + newTalkId[1])
      });
    }
    else if (talks[(this.state.talkId[0]+1)]) {
      let newTalkId = [(this.state.talkId[0]+1), 0];
      this.setState({
        talkId: newTalkId,
        label: (newTalkId[0] + '.' + newTalkId[1])
      });
    }
  }

  goClick() {
    this.props.setPendingTalk(this.state.talkId, 'DEBUG', 'DEBUG');
  }

  render() {
    return (
      <div className="thread-toggle">
        <button type="button" onClick={ () => this.homeClick() }>H</button>
        <button type="button" onClick={ () => this.upClick() }>^</button>
        <div className="psuedo-button">{ this.state.label }</div>
        <button type="button" onClick={ () => this.downClick() }>v</button>
        <button type="button" onClick={ () => this.goClick() }>!</button>
      </div>

    );
  }
}

class ThreadToggleState {
  talkId: number[];
  label: string;
}

class ThreadToggleProps {
  tHandler: ThreadHandler;
  setPendingTalk : (talkId: number[], responseName: string,
    responseValue: string) => any;
}

function mapStateToProps({ tHandler }) {
  return { tHandler }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setPendingTalk
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (ThreadToggle);
