import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { ResponseNames } from '../../../models/enums/response_names';
const RN = ResponseNames;

export const amichael1_4 = new Talk({
  id: 9,
  name: 'Maybe you\'re one of us?',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'I doubt you are one of us.',
          actionBefore: FA.VLONG_PAUSE, actionAfter: FA.LONG_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'But the possibility ',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.MED_PAUSE}),
        new Fr({text: 'cannot be ruled out.',
          actionAfter: FA.VLONG_PAUSE}),
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Whoever you may be,',
          actionBefore: FA.MED_PAUSE, actionAfter: FA.SHORT_PAUSE}),
        new Fr({text: ' listen:',
          actionBefore: FA.MED_PAUSE, actionAfter: FA.SHORT_PAUSE}),
      ],
      responses: [new Re({trigger: null, goto: [[0, 6]]})]
    }),
  ]
})
