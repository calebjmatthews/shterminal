import TalkContent from './content';

export default class Talk {
  id: number;
  name: string;
  contents: TalkContent[];

  constructor(talk: Talk) {
    Object.assign(this, talk);
  }
}
