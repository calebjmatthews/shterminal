export default class TalkFragment {
  text: string;
  actionAfter?: string;
  actionBefore?: string;

  constructor(fragment: TalkFragment) {
    Object.assign(this, fragment);
  }
}
