import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { ResponseNames } from '../../../models/enums/response_names';
const RB = ResponseNames;

export const amichael0_2 = new Talk({
  id: 2,
  name: 'You truly can\'t talk',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'Some advice: urgency will do you no good.',
          actionBefore: FA.LONG_PAUSE, actionAfter: FA.SHORT_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Be calm.',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.MED_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Let me speak.',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.SHORT_PAUSE})
      ],
      responses: [new Re({trigger: null, goto: [[0, 0]]})]
    })
  ]
})
