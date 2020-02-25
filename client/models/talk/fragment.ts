export default class TalkFragment {
  text: string;
  action?: string;

  constructor(fragment: TalkFragment) {
    Object.assign(this, fragment);
  }
}
