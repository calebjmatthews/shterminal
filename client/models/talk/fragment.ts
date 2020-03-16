export default class TalkFragment {
  text: string;
  actionAfter?: string;
  actionBefore?: string;
  visible?: string = '';

  constructor(fragment: TalkFragment) {
    Object.assign(this, fragment);
  }
}
