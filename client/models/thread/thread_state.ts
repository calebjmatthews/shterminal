export default class ThreadState {
  speaker: string;
  currentTalk: number[];
  contentPoss: number[][];

  constructor(threadState: ThreadState) {
    Object.assign(this, threadState);
  }
}
