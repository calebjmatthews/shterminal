import Talk from '../talk/talk';

export default class Thread {
  speaker: string;
  talks: Talk[][] = [];

  constructor(talks: Talk[][]) {
    this.talks = talks;
  }

  getTalk(talkId: number[]) {
    return this.talks[talkId[0]][talkId[1]];
  }
}

interface ThreadInterface {
  speaker: string;
  talks: Talk[][];
}
