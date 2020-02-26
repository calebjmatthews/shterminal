import React, { Component } from 'react';

import { utils } from '../models/utils';

export default class ResponseButton extends Component {
  state: {
    value: string,
    timeouts: NodeJS.Timeout[]
  };
  props: {givenValue: string};

  constructor(props: {givenValue: string}) {
    super(props);

    if (props.givenValue != 'scrambled') {
      this.state = {
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
