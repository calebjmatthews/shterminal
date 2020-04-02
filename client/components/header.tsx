import React, { Component } from 'react';
import moment from 'moment';

import ThreadToggle from './thread_toggle';

const DEBUG = 'true';

export default class Header extends Component {
  state: HeaderState;

  constructor(props: any) {
    super(props);

    this.state = {
      secondsElapsed: 0,
      interval: setInterval(() => {
        this.countSecond();
      }, 1000),
    }
  }

  countSecond() {
    this.setState({ secondsElapsed: this.state.secondsElapsed+1 });
  }

  render() {
    let storyMoment = moment('82-05-05 02:33:06', 'YY-MM-DD HH:mm:ss');
    storyMoment.add(this.state.secondsElapsed, 'seconds');
    let datetimeText = storyMoment.format('YY-MM-DD HH:mm:ss');
    return (
      <div className="header">
        <div>
          DPOL SH TERMINAL v108.55
        </div>
        <div>
          { this.renderCenter() }
        </div>
        <div>
          {datetimeText}
        </div>
      </div>
    );
  }

  renderCenter() {
    if (!DEBUG) {
      return ('LOGGED IN AS matalanta');
    }
    else {
      return <ThreadToggle />
    }
  }
}

class HeaderState {
  secondsElapsed: number;
  interval: NodeJS.Timeout;
}
