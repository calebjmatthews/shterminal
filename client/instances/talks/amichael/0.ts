import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;

export const amichael0 = new Talk({
  id: 0,
  name: 'Cold intro',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'Well, ', action: FA.SHORT_PAUSE}),
        new Fr({text: 'look at this.', action: FA.LONG_PAUSE})
      ],
      responses: null
    })
  ]
})
