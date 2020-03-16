import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ThreadHandler from '../models/thread/thread_handler/thread_handler';
import { responseTriggerSelect } from '../actions/thread_handler';
import { utils } from '../models/utils';
import { RespButtonNames } from '../models/enums/resp_button_names';

class ResponseButton extends Component {
  state: {
    name: string,
    value: string,
    timeouts: NodeJS.Timeout[]
  };
  props: ResponseButtonProps;

  constructor(props: {givenValue: string}) {
    super(props);

    if (props.givenValue != RespButtonNames.SCRAMBLED) {
      this.state = {
        name: props.givenValue,
        value: props.givenValue,
        timeouts: null
      }
    }
    else {
      let timeouts = [];
      for (let index = 0; index < 6; index++) {
        timeouts.push(setTimeout(() => {
          this.setScrambledValue(index);
        }, (Math.floor(utils.randomHeavyTailed() * 1000))))
      }
      this.state = {
        name: props.givenValue,
        value: this.getScrambledValue(),
        timeouts: timeouts
      }
    }

    this.click = this.click.bind(this);
  }

  setScrambledValue(index: number): void {
    let newTimeouts = this.state.timeouts;
    newTimeouts[index] = setTimeout(() => {
      this.setScrambledValue(index);
    }, (Math.floor(utils.randomHeavyTailed() * 1000)));
    let newValue = this.state.value.slice(0, index) + utils.randomUnicode()
      + this.state.value.slice(index+1, 6);
    this.setState({
      value: newValue,
      timeouts: newTimeouts
    });
  }

  getScrambledValue(): string {
    let scrambledValue = '';
    for (let index = 0; index < 6; index++) {
      scrambledValue += utils.randomUnicode();
    }
    return scrambledValue;
  }

  click() {
    this.props.responseTriggerSelect(this.props.tHandler, this.state.name,
      this.state.value);
  }

  render() {
    return (
      <button type="button" onClick={ () => this.click() }>
      {'> ' + this.state.value}
      </button>
    );
  }
}

class ResponseButtonProps {
  givenValue: string
  tHandler: ThreadHandler;
  responseTriggerSelect: (tHandler: ThreadHandler, responseName: string,
    responseValue: string) => any;
}

function mapStateToProps({ tHandler }) {
  return { tHandler }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    responseTriggerSelect
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (ResponseButton);
