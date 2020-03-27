import TalkContent from './content';
import TalkFragment from './fragment';

export default class Talk implements TalkInterface {
  id: number;
  name: string;
  speaker: string;
  contents: TalkContent[];
  lines?: TalkFragment[][] = [[]];

  constructor(talk: TalkInterface) {
    Object.assign(this, talk);
  }

  addToLine(chars: string) {
    let currentLine = this.lines[this.lines.length-1];
    let currentFragment = currentLine[currentLine.length-1];
    if (currentFragment == undefined) {
      this.startNewFragment(new TalkFragment({text: ''}));
      currentFragment = currentLine[currentLine.length-1];
    }
    currentFragment.visible += chars;
  }

  startNewFragment(fragment: TalkFragment) {
    let currentLine = this.lines[this.lines.length-1];
    currentLine.push(fragment);
  }

  startNewLine() {
    this.lines.push([]);
    this.startNewFragment(new TalkFragment({text: ''}));
  }
}

interface TalkInterface {
  id: number;
  name: string;
  speaker: string;
  contents: TalkContent[];
  lines?: TalkFragment[][];
}
