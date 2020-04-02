import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { FragmentTypes } from '../../../models/enums/fragment_types';
const FT = FragmentTypes;
import { ResponseNames } from '../../../models/enums/response_names';
const RN = ResponseNames;

export const amichael1_0 = new Talk({
  id: 5,
  name: 'One of us?',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'Now. ', actionBefore: FA.LONG_PAUSE,
          actionAfter: FA.MED_PAUSE}),
        new Fr({text: 'Now we can have a kind of low risk relationship.',
          actionAfter: FA.SHORT_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Tell me. ',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.MED_PAUSE}),
        new Fr({text: 'Are you one of us?', actionAfter: FA.VLONG_PAUSE})
      ],
      responses: [
        new Re({trigger: RN.YES, goto: [[1, 1]]}),
        new Re({trigger: RN.NO, goto: [[1, 2]]})
      ]
    })
  ]
})
