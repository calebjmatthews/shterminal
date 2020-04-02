import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { ResponseNames } from '../../../models/enums/response_names';
const RN = ResponseNames;

export const amichael0_4 = new Talk({
  id: 3,
  name: 'Cute.',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'Very humorous.',
          actionBefore: FA.VLONG_PAUSE, actionAfter: FA.MED_PAUSE})
      ],
      responses: [new Re({trigger: null, goto: [[1, 0]]})]
    })
  ]
})
