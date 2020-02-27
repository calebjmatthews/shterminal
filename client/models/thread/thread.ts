import Talk from '../talk/talk';

export default class Thread {
  speaker: string;
  talk: Talk;
  text: string = '';

  constructor(talk: Talk) {
    this.speaker = talk.speaker;
    this.talk = talk;
  }
}
