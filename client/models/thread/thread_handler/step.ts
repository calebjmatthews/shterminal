import ThreadHandler from './thread_handler';

export default function step(th: ThreadHandler, secondsElapsed: number): string {
  if (th.delay == 0) {
    let contentPos = this.threadStates.contentPoss[this.currentSpeaker];
    let content = th.threads[th.currentSpeaker].talk.contents[contentPos];
    let fragment = content.fragments[th.fragmentPos];

    if (th.fragmentPos == -1 && th.subPos == 0) {
      th.contentBegin(secondsElapsed);
      th.fragmentPos++;
      th.fragmentBegin();
      return th.threads[th.currentSpeaker].text;
    }

    th.threads[th.currentSpeaker].text += fragment.text[th.subPos];
    th.subPos++;
    if (th.subPos >= (fragment.text.length-1)) {
      th.fragmentEnd();
      th.fragmentBegin();
    }
    if (th.fragmentPos >= (content.fragments.length-1)
      && th.subPos >= (fragment.text.length-1)) {
      th.contentEnd();
    }
    return th.threads[th.currentSpeaker].text;
  }
  else {
    th.delay--;
    return th.threads[th.currentSpeaker].text;
  }
}
