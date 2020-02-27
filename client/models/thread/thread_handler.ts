import Thread from './thread';
import ThreadState from './thread_state';

export default class ThreadHandler {
  currentSpeaker: string;
  threads: { [speaker: string] : Thread } = {};
  threadStates: { [speaker: string] : ThreadState } = {};

  constructor(threadHandler: ThreadHandler) {
    Object.assign(this, threadHandler);
  }
}
