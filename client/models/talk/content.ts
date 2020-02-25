import TalkFragment from './fragment';

export default class TalkContent {
  fragments: TalkFragment[];
  responses: string[];

  constructor(content: TalkContent) {
    Object.assign(this, content);
  }
}
