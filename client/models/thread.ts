import moment from 'moment';

import Talk from './talk/talk';
import { FragmentActions } from './enums/fragment_actions';

export default class Thread {
  talk: Talk;
  contentPos: number = 0;
  fragmentPos: number = 0;
  subPos: number = 0;
  delay: number = 0;
  text: string = '';
  ended: boolean = false;

  constructor(talk: Talk) {
    this.talk = talk;
  }

  step(secondsElapsed: number): string {
    if (this.delay == 0) {
      let content = this.talk.contents[this.contentPos];
      let fragment = content.fragments[this.fragmentPos];

      if (this.fragmentPos == 0 && this.subPos == 0) {
        this.contentBegin(secondsElapsed);
      }

      this.text += fragment.text[this.subPos];
      this.subPos++;
      if (this.subPos >= (fragment.text.length-1)) {
        this.fragmentEnd();
      }
      if (this.fragmentPos >= (content.fragments.length-1)
        && this.subPos >= (fragment.text.length-1)) {
        this.contentEnd();
      }
      return this.text;
    }
    else {
      this.delay--;
      return this.text;
    }
  }

  contentBegin(secondsElapsed: number): void {
    let storyMoment = moment('82-05-05 02:33:06', 'YY-MM-DD HH:mm:ss');
    storyMoment.add(secondsElapsed, 'seconds');
    let datetimeText = storyMoment.format('HH:mm:ss');
    this.text += (datetimeText + ' ' + this.talk.speaker + ': ');
  }

  contentEnd(): void {
    let content = this.talk.contents[this.contentPos];
    let fragment = content.fragments[this.fragmentPos];

    this.text += '\n';
    this.contentPos++;
    this.fragmentPos = 0;
    this.subPos = 0;
    if (this.contentPos >= this.talk.contents.length) {
      this.ended = true;
    }
  }

  fragmentEnd(): void {
    let content = this.talk.contents[this.contentPos];
    let fragment = content.fragments[this.fragmentPos];

    this.text += fragment.text[this.subPos];
    this.fragmentAct();
    if (this.fragmentPos+1 < content.fragments.length) {
      this.fragmentPos++;
      this.subPos = 0;
    }
  }

  fragmentAct(): void {
    let content = this.talk.contents[this.contentPos];
    let fragment = content.fragments[this.fragmentPos];

    switch (fragment.action) {
      case FragmentActions.SHORT_PAUSE:
      this.delay = 6;

      case FragmentActions.LONG_PAUSE:
      this.delay = 12;
    }
  }
}
