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
        new Fr({text: 'What? ', actionBefore: FA.MED_PAUSE,
          actionAfter: FA.MED_PAUSE}),
        new Fr({text: 'Who are you?', actionAfter: FA.SHORT_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'You are accessing this terminal remotely, ',
          actionBefore: FA.MED_PAUSE, actionAfter: FA.SHORT_PAUSE}),
        new Fr({text: 'which should not be possible.', actionAfter: FA.SHORT_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Are you looking to gain something?', actionBefore: FA.MED_PAUSE,
          actionAfter: FA.SHORT_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Heaven knows what that could be.',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.MED_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'It would be in my interest to know, ',
          actionBefore: FA.VLONG_PAUSE, actionAfter: FA.SHORT_PAUSE}),
        new Fr({text: 'but the more you are allowed to communicate...',
          actionAfter: FA.MICRO_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'The more messes you can make.', actionBefore: FA.SHORT_PAUSE,
          actionAfter: FA.MED_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'For all of us.',
          actionBefore: FA.LONG_PAUSE, actionAfter: FA.MICRO_PAUSE})
      ],
      responses: null
    })
  ]
})
