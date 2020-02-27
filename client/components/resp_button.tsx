import React, { Component } from 'react';

import { utils } from '../models/utils';
import { RespButtonNames } from '../models/enums/resp_button_names';

export default class ResponseButton extends Component {
  state: {
    name: string,
    value: string,
    timeouts: NodeJS.Timeout[]
  };
  props: {givenValue: string};

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

  render() {
    return (
      <button type="button">{'> ' + this.state.value}</button>
    );
  }
}
