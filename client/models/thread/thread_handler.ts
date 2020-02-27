import moment from 'moment';

import Thread from './thread';
import ThreadState from './thread_state';

import { FragmentActions } from '../enums/fragment_actions';

export default class ThreadHandler implements ThreadHandlerInterface {
  currentSpeaker: string;
  threads: { [speaker: string] : Thread } = {};
  threadStates: { [speaker: string] : ThreadState } = {};

  contentPos?: number = 0;
  fragmentPos?: number = -1;
  subPos?: number = 0;
  delay?: number = 0;
  ended?: boolean = false;

  constructor(threadHandler: ThreadHandlerInterface) {
    Object.assign(this, threadHandler);
  }

  step(secondsElapsed: number): string {
    if (this.delay == 0) {
      let content = this.threads[this.currentSpeaker].talk.contents[this.contentPos];
      let fragment = content.fragments[this.fragmentPos];

      if (this.fragmentPos == -1 && this.subPos == 0) {
        this.contentBegin(secondsElapsed);
        this.fragmentPos++;
        this.fragmentBegin();
        return this.threads[this.currentSpeaker].text;
      }

      this.threads[this.currentSpeaker].text += fragment.text[this.subPos];
      this.subPos++;
      if (this.subPos >= (fragment.text.length-1)) {
        this.fragmentEnd();
        this.fragmentBegin();
      }
      if (this.fragmentPos >= (content.fragments.length-1)
        && this.subPos >= (fragment.text.length-1)) {
        this.contentEnd();
      }
      return this.threads[this.currentSpeaker].text;
    }
    else {
      this.delay--;
      return this.threads[this.currentSpeaker].text;
    }
  }

  contentBegin(secondsElapsed: number): void {
    let storyMoment = moment('82-05-05 02:33:06', 'YY-MM-DD HH:mm:ss');
    storyMoment.add(secondsElapsed, 'seconds');
    let datetimeText = storyMoment.format('HH:mm:ss');
    this.threads[this.currentSpeaker].text += (datetimeText + ' '
      + this.threads[this.currentSpeaker].talk.speaker + ': ');
  }

  contentEnd(): void {
    let content = this.threads[this.currentSpeaker].talk.contents[this.contentPos];
    let fragment = content.fragments[this.fragmentPos];

    this.threads[this.currentSpeaker].text += '\n';
    this.contentPos++;
    this.fragmentPos = -1;
    this.subPos = 0;
    if (this.contentPos >= this.threads[this.currentSpeaker].talk.contents.length) {
      this.ended = true;
    }
  }

  fragmentBegin(): void {
    this.fragmentActBefore();
  }

  fragmentActBefore(): void {
    let content = this.threads[this.currentSpeaker].talk.contents[this.contentPos];
    let fragment = content.fragments[this.fragmentPos];

    switch (fragment.actionBefore) {
      case FragmentActions.MICRO_PAUSE:
      this.delay = 4;
      break;

      case FragmentActions.SHORT_PAUSE:
      this.delay = 10;
      break;

      case FragmentActions.MED_PAUSE:
      this.delay = 20;
      break;

      case FragmentActions.LONG_PAUSE:
      this.delay = 30;
      break;

      case FragmentActions.VLONG_PAUSE:
      this.delay = 50;
      break;
    }
  }

  fragmentEnd(): void {
    let content = this.threads[this.currentSpeaker].talk.contents[this.contentPos];
    let fragment = content.fragments[this.fragmentPos];

    this.threads[this.currentSpeaker].text += fragment.text[this.subPos];
    this.fragmentActAfter();
    if (this.fragmentPos+1 < content.fragments.length) {
      this.fragmentPos++;
      this.subPos = 0;
    }
  }

  fragmentActAfter(): void {
    let content = this.threads[this.currentSpeaker].talk.contents[this.contentPos];
    let fragment = content.fragments[this.fragmentPos];

    switch (fragment.actionAfter) {
      case FragmentActions.MICRO_PAUSE:
      this.delay = 4;
      break;

      case FragmentActions.SHORT_PAUSE:
      this.delay = 10;
      break;

      case FragmentActions.MED_PAUSE:
      this.delay = 20;
      break;

      case FragmentActions.LONG_PAUSE:
      this.delay = 30;
      break;

      case FragmentActions.VLONG_PAUSE:
      this.delay = 50;
      break;
    }
  }
}

interface ThreadHandlerInterface {
  currentSpeaker: string;
  threads: { [speaker: string] : Thread };
  threadStates: { [speaker: string] : ThreadState };

  contentPos?: number;
  fragmentPos?: number;
  subPos?: number;
  delay?: number;
  ended?: boolean;
}