import moment from 'moment';

import Thread from '../thread';
import ThreadState from '../thread_state';
import Response from '../../talk/response';
import step from './step';

import { FragmentActions } from '../../enums/fragment_actions';
const STARTING_TIME_STRING = '82-05-05 02:33:06';

export default class ThreadHandler implements ThreadHandlerInterface {
  currentSpeaker: string;
  threads: { [speaker: string] : Thread } = {};
  threadStates: { [speaker: string] : ThreadState } = {};

  fragmentPos?: number = -1;
  subPos?: number = 0;
  delay?: number = 0;
  ended?: boolean = false;
  pendingNull: boolean = false;
  pendingTalk: number[] = null;

  constructor(threadHandler: ThreadHandlerInterface) {
    Object.assign(this, threadHandler);
  }

  step(secondsElapsed: number): string {
    return step(this, secondsElapsed);
  }

  contentBegin(secondsElapsed: number): void {
    let storyMoment = moment(STARTING_TIME_STRING, 'YY-MM-DD HH:mm:ss');
    storyMoment.add(secondsElapsed, 'seconds');
    let datetimeText = storyMoment.format('HH:mm:ss');
    this.threads[this.currentSpeaker].text += (datetimeText + ' '
      + this.threads[this.currentSpeaker].talk.speaker + ': ');
  }

  contentEnd(): void {
    let contentPos = this.threadStates.contentPoss[this.currentSpeaker];
    let content = this.threads[this.currentSpeaker].talk.contents[contentPos];
    let fragment = content.fragments[this.fragmentPos];

    this.threads[this.currentSpeaker].text += '\n';
    contentPos++;
    this.fragmentPos = -1;
    this.subPos = 0;
    if (contentPos >= this.threads[this.currentSpeaker].talk.contents.length) {
      this.ended = true;
    }
  }

  fragmentBegin(): void {
    this.fragmentActBefore();
  }

  fragmentActBefore(): void {
    let contentPos = this.threadStates.contentPoss[this.currentSpeaker];
    let content = this.threads[this.currentSpeaker].talk.contents[contentPos];
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
    let contentPos = this.threadStates.contentPoss[this.currentSpeaker];
    let content = this.threads[this.currentSpeaker].talk.contents[contentPos];
    let fragment = content.fragments[this.fragmentPos];

    this.threads[this.currentSpeaker].text += fragment.text[this.subPos];
    this.fragmentActAfter();
    if (this.fragmentPos+1 < content.fragments.length) {
      this.fragmentPos++;
      this.subPos = 0;
    }
  }

  fragmentActAfter(): void {
    let contentPos = this.threadStates.contentPoss[this.currentSpeaker];
    let content = this.threads[this.currentSpeaker].talk.contents[contentPos];
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

  receiveResponseTrigger(responseName: string, responseValue: string): number[] {
    let contentPos = this.threadStates.contentPoss[this.currentSpeaker];
    let talk = this.threads[this.currentSpeaker].talk;
    let responsePaths = talk.contents[contentPos].responses;
    let matchingRespPath: Response = null;
    responsePaths.map((responsePath) => {
      if (responsePath.trigger == responseName) {
        matchingRespPath = responsePath;
      }
    });
    return this.findCleanGoTo(matchingRespPath);
  }

  findCleanGoTo(responsePath: Response): number[] {
    let cleanGoTo = null;
    if (responsePath != null) {
      for (let index = 0; index < responsePath.goto.length; index++) {
        let talkId = responsePath.goto[index];
        let alreadyExists = false;
        let contentPositions = this.threadStates[this.currentSpeaker].contentPoss;
        if (contentPositions[talkId[0]]) {
          if (contentPositions[talkId[0]][talkId[1]]) {
            alreadyExists = true;
          }
        }
        if (alreadyExists == false) {
          return talkId;
        }
      }
    }
    return null;
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
