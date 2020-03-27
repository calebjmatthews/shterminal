import TalkContent from './content';
import TalkFragment from './fragment';

export default class Talk {
  id: number;
  name: string;
  speaker: string;
  contents: TalkContent[];

  constructor(talk: Talk) {
    Object.assign(this, talk);
  }
}
