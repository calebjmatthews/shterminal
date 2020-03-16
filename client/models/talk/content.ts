import TalkFragment from './fragment';
import Response from './response';

export default class TalkContent {
  fragments: TalkFragment[];
  responses: Response[];
  visible?: TalkFragment[] = [];

  constructor(content: TalkContent) {
    Object.assign(this, content);
  }
}
