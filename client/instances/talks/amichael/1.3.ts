import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { ResponseNames } from '../../../models/enums/response_names';
const RN = ResponseNames;

export const amichael1_3 = new Talk({
  id: 8,
  name: 'You can lie.',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'You can,',
          actionBefore: FA.LONG_PAUSE, actionAfter: FA.MICRO_PAUSE}),
        new Fr({text: ' indeed.', actionAfter: FA.MED_PAUSE}),
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'You are not one of us.',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.MED_PAUSE}),
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'That is unfortunate.',
          actionBefore: FA.MED_PAUSE, actionAfter: FA.VLONG_PAUSE}),
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'For you.',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.MED_PAUSE}),
      ],
      responses: [new Re({trigger: null, goto: [[0, 5]]})]
    }),
  ]
})
