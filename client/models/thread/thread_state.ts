export default class ThreadState implements ThreadStateInterface {
  speaker: string;
  currentTalk: number[];
  contentPoss: number[][];

  constructor(threadState: ThreadStateInterface) {
    Object.assign(this, threadState);
  }

  getContentPos(talkId: number[] = null) {
    if (talkId == null) {
      return this.contentPoss[this.currentTalk[0]][this.currentTalk[1]];
    }
    else {
      return this.contentPoss[talkId[0]][talkId[1]];
    }
  }

  setContentPos(contentPos: number, talkId: number[] = null) {
    if (talkId == null) {
      this.contentPoss[this.currentTalk[0]][this.currentTalk[1]] = contentPos;
    }
    else {
      this.contentPoss[talkId[0]][talkId[1]] = contentPos;
    }
  }
}

interface ThreadStateInterface {
  speaker: string;
  currentTalk: number[];
  contentPoss: number[][];
}
