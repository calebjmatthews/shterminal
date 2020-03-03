import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { RespButtonNames } from '../../../models/enums/resp_button_names';
const RB = RespButtonNames;

export const amichael0_0 = new Talk({
  id: 1,
  name: 'You can\'t talk',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'I’m afraid you’re unable to communicate anything.',
          actionBefore: FA.SHORT_PAUSE, actionAfter: FA.MED_PAUSE})
      ],
      responses: null
    }),
    new Co({
      fragments: [
        new Fr({text: 'Not yet.',
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
