import Talk from '../talk/talk';
import TalkFragment from '../talk/fragment';

export default class Thread {
  speaker: string;
  talks: Talk[][] = [];
  lines?: TalkFragment[][] = [[]];

  constructor(talks: Talk[][]) {
    this.talks = talks;
  }

  getTalk(talkId: number[]) {
    return this.talks[talkId[0]][talkId[1]];
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

interface ThreadInterface {
  speaker: string;
  talks: Talk[][];
  lines?: TalkFragment[][];
}
