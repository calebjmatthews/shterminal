import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { amichael0 } from '../instances/talks/amichael/0';

export default class Thread extends Component {
  state: ThreadState;

  constructor(props: any) {
    super(props);

    this.state = {
      text: '',
      interval: setInterval(() => {
        this.addText();
      }, 500),
      currentContent: 0,
      currentFragment: 0
    }
  }

  addText() {
    let content = amichael0.contents[this.state.currentContent];
    if (this.state.currentFragment < content.fragments.length) {
      this.setState({
        text: (this.state.text + content.fragments[this.state.currentFragment].text),
        currentFragment: (this.state.currentFragment+1)
      });
      console.log(this.state.text);
    }
  }

  render() {
    return (
      <div className="thread-container">
        {this.state.text}
      </div>
    );
  }
}

class ThreadState {
  text: string;
  interval: any;
  currentContent: number;
  currentFragment: number;
}
