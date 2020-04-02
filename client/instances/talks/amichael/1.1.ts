import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { ResponseNames } from '../../../models/enums/response_names';
const RN = ResponseNames;

export const amichael1_1 = new Talk({
  id: 6,
  name: 'One. of. us.',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'I see.',
          actionBefore: FA.LONG_PAUSE, actionAfter: FA.VLONG_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Can you lie?',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.TWO_HUNDRED_PAUSE})
      ],
      responses: [
        new Re({trigger: RN.YES, goto: [[1, 3]]}),
        new Re({trigger: RN.NO, goto: [[1, 4]]})
      ]
    })
  ]
})
