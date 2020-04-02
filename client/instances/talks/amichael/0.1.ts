import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { ResponseNames } from '../../../models/enums/response_names';
const RB = ResponseNames;

export const amichael0_1 = new Talk({
  id: 1,
  name: 'You can\'t talk',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'Interesting.',
          actionBefore: FA.VLONG_PAUSE, actionAfter: FA.MED_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'It appears that you are unable to communicate anything.',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.MED_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'At least not yet.',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.SHORT_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Be silent, ', actionBefore: FA.SHORT_PAUSE,
          actionAfter: FA.SHORT_PAUSE}),
        new Fr({text: 'and listen.', actionAfter: FA.MED_PAUSE})
      ],
      responses: [new Re({trigger: null, goto: [[0, 0]]})]
    })
  ]
})
