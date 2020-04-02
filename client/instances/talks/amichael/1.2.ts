import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { ResponseNames } from '../../../models/enums/response_names';
const RN = ResponseNames;

export const amichael1_2 = new Talk({
  id: 7,
  name: 'You say you aren\'t one of us.',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'Good.',
          actionBefore: FA.LONG_PAUSE, actionAfter: FA.SHORT_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Honesty is in your best interest.',
          actionBefore: FA.MICRO_PAUSE, actionAfter: FA.MED_PAUSE})
      ],
      responses: [new Re({trigger: null, goto: [[2, 5]]})]
    })
  ]
})
