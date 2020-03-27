import { FragmentTypes } from '../enums/fragment_types';

export default class TalkFragment {
  text: string;
  actionAfter?: string;
  actionBefore?: string;
  visible?: string = '';
  type?: string;

  constructor(fragment: TalkFragment) {
    Object.assign(this, fragment);

    if (fragment.type == undefined) {
      this.type = FragmentTypes.STANDARD;
    }
  }
}
