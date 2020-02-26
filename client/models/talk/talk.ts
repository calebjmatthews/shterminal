import TalkContent from './content';

export default class Talk {
  id: number;
  name: string;
  speaker: string;
  contents: TalkContent[];

  constructor(talk: Talk) {
    Object.assign(this, talk);
  }
}
