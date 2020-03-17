import ThreadHandler from './thread_handler';
import { StepResult } from '../../enums/step_result';

export default function step(th: ThreadHandler): { type: string, char?: string } {
  if (th.delay == 0) {
    let contentPos = th.threadStates[th.currentSpeaker].getContentPos();
    let content = th.threads[th.currentSpeaker]
      .getTalk(th.threadStates[th.currentSpeaker].currentTalk).contents[contentPos];

    if (th.fragmentPos == -1 && th.subPos == 0) {
      return { type: StepResult.CON_START };
    }

    let fragment = content.fragments[th.fragmentPos];

    let char = fragment.text[th.subPos];
    if (th.fragmentPos >= (content.fragments.length-1)
      && (th.subPos) >= (fragment.text.length-1)) {
      return { type: StepResult.CON_END, char: char };
    }
    if ((th.subPos) >= (fragment.text.length-1)) {
      return { type: StepResult.FRG_END_START, char: char };
    }
    else {
      return { type: StepResult.FORWARD, char: char };
    }
  }
  else {
    return { type: StepResult.DELAY };
  }
}
