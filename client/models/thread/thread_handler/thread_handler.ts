import moment from 'moment';

import Thread from '../thread';
import ThreadState from '../thread_state';
import Response from '../../talk/response';
import step from './step';

import { FragmentActions } from '../../enums/fragment_actions';
import { StepResult } from '../../enums/step_result';
const STARTING_TIME_STRING = '82-05-05 02:33:06';
const USER_NAME = 'matalanta';

export default class ThreadHandler implements ThreadHandlerInterface {
  currentSpeaker: string;
  threads: { [speaker: string] : Thread } = {};
  threadStates: { [speaker: string] : ThreadState } = {};

  fragmentPos?: number = -1;
  subPos?: number = 0;
  delay?: number = 0;
  ended?: boolean = false;
  pendingNull: boolean = false;
  pendingResName: string = null;
  pendingResValue: string = null;
  pendingTalk: number[] = null;

  constructor(threadHandler: ThreadHandlerInterface = null) {
    if (threadHandler != null) {
      Object.assign(this, threadHandler);
    }
  }

  takeStep(secondsElapsed: number): string {
    let stepRes: { type: string, char?: string } = null;
    if (this.ended == false) {
      stepRes = this.step();
    }

    switch(stepRes.type) {
      case StepResult.CON_START:
      this.contentBegin(secondsElapsed);
      this.fragmentPos++;
      this.fragmentBegin();
      return StepResult.CON_START;

      case StepResult.CON_END:
      this.fragmentEnd();
      this.contentEnd(secondsElapsed);
      this.fragmentBegin();
      return StepResult.CON_END;

      case StepResult.FRG_END_START:
      this.fragmentEnd();
      this.fragmentBegin();
      return StepResult.FRG_END_START;

      case StepResult.FORWARD:
      // this.threads[this.currentSpeaker].text += stepRes.char;
      this.threads[this.currentSpeaker].addToLine(stepRes.char);
      this.subPos++;
      return StepResult.FORWARD;

      case StepResult.DELAY:
      this.delay--;
      return StepResult.DELAY;
    }
  }

  step(): { type: string, char?: string } {
    return step(this);
  }

  contentBegin(secondsElapsed: number): void {
    let storyMoment = moment(STARTING_TIME_STRING, 'YY-MM-DD HH:mm:ss');
    storyMoment.add(secondsElapsed, 'seconds');
    let datetimeText = storyMoment.format('HH:mm:ss');
    let talk = this.threads[this.currentSpeaker]
      .addToLine(datetimeText + ' ' + this.currentSpeaker + ': ');
  }

  contentEnd(secondsElapsed: number): void {
    let contentPos = this.threadStates[this.currentSpeaker].getContentPos();
    let talk = this.threads[this.currentSpeaker]
      .getTalk(this.threadStates[this.currentSpeaker].currentTalk);
    let content = talk.contents[contentPos];
    let fragment = content.fragments[this.fragmentPos];

    this.threads[this.currentSpeaker].startNewLine();
    if (this.pendingNull == true) {
      let talkId = this.receiveResponseTrigger(this.pendingResName,
        this.pendingResValue);
      if (talkId != null) {
        this.pendingTalk = talkId;
        this.pendingNull = false;
      }
    }
    if (this.pendingTalk == null) {
      if (this.threadStates[this.currentSpeaker].getContentPos() <
        this.threads[this.currentSpeaker]
        .getTalk(this.threadStates[this.currentSpeaker].currentTalk)
        .contents.length-1) {

        this.threadStates[this.currentSpeaker].setContentPos(contentPos+1);
        this.fragmentPos = -1;
        this.subPos = 0;
      }
      else {
        let goto = this.checkForEndResponse();
        if (goto != null) {
          this.threadStates[this.currentSpeaker].currentTalk = goto;
          this.fragmentPos = -1;
          this.subPos = 0;
        }
        else {
          this.ended = true;
        }
      }
    }
    else if (this.pendingTalk != null) {
      this.threadStates[this.currentSpeaker].setContentPos(contentPos+1);
      this.threadStates[this.currentSpeaker].currentTalk = this.pendingTalk;
      this.threadStates[this.currentSpeaker].setContentPos(0);
      this.fragmentPos = -1;
      this.subPos = 0;
      this.responseAdd(secondsElapsed, this.pendingResValue);
      this.pendingTalk = null;
      this.pendingResName = null;
      this.pendingResValue = null;
      this.threads[this.currentSpeaker].startNewLine();
    }
  }

  responseAdd(secondsElapsed: number, responseValue: string): void {
    let storyMoment = moment(STARTING_TIME_STRING, 'YY-MM-DD HH:mm:ss');
    storyMoment.add(secondsElapsed, 'seconds');
    let datetimeText = storyMoment.format('HH:mm:ss');
    let talk = this.threads[this.currentSpeaker]
      .addToLine(datetimeText + ' ' + USER_NAME + ': ' + responseValue);
  }

  fragmentBegin(): void {
    this.fragmentActBefore();
    let talk = this.threads[this.currentSpeaker]
      .getTalk(this.threadStates[this.currentSpeaker].currentTalk);
    let contentPos = this.threadStates[this.currentSpeaker].getContentPos();
    let fragment = talk.contents[contentPos].fragments[this.fragmentPos];
    if (fragment) {
      this.threads[this.currentSpeaker].startNewFragment(fragment);
    }
  }

  fragmentActBefore(): void {
    let contentPos = this.threadStates[this.currentSpeaker].getContentPos();
    let content = this.threads[this.currentSpeaker]
      .getTalk(this.threadStates[this.currentSpeaker].currentTalk)
      .contents[contentPos];
    let fragment = content.fragments[this.fragmentPos];

    if (fragment) {
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
  }

  fragmentEnd(): void {
    let contentPos = this.threadStates[this.currentSpeaker].getContentPos();
    let talk = this.threads[this.currentSpeaker]
      .getTalk(this.threadStates[this.currentSpeaker].currentTalk)
    let content = talk.contents[contentPos];
    let fragment = content.fragments[this.fragmentPos];

    this.threads[this.currentSpeaker].addToLine(fragment.text[this.subPos]);
    this.fragmentActAfter();
    if (this.fragmentPos+1 < content.fragments.length) {
      this.fragmentPos++;
      this.subPos = 0;
    }
  }

  fragmentActAfter(): void {
    let contentPos = this.threadStates[this.currentSpeaker].getContentPos();
    let content = this.threads[this.currentSpeaker]
      .getTalk(this.threadStates[this.currentSpeaker].currentTalk)
      .contents[contentPos];
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
    let contentPos = this.threadStates[this.currentSpeaker].getContentPos();
    let talk = this.threads[this.currentSpeaker]
      .getTalk(this.threadStates[this.currentSpeaker].currentTalk);
    let responsePaths = talk.contents[contentPos].responses;
    if (responsePaths == null) {
      return null;
    }
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

  checkForEndResponse(): number[] {
    let contentPos = this.threadStates[this.currentSpeaker].getContentPos();
    let content = this.threads[this.currentSpeaker]
      .getTalk(this.threadStates[this.currentSpeaker].currentTalk)
      .contents[contentPos];
    let goto = null;
    content.responses.map((response) => {
      if (response.trigger == null) {
        goto = response.goto[0];
      }
    });
    return goto;
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
  pendingNull?: boolean;
  pendingResName?: string;
  pendingResValue?: string;
  pendingTalk?: number[];
}
