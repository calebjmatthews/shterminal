import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;

export const amichael0 = new Talk({
  id: 0,
  name: 'Cold intro',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'What? ', action: FA.SHORT_PAUSE}),
        new Fr({text: 'Who are you?', action: FA.LONG_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'You are accessing this terminal remotely, ', action: FA.SHORT_PAUSE}),
        new Fr({text: 'which should not be possible.', action: FA.LONG_PAUSE})
      ],
      responses: null
    })
  ]
})
