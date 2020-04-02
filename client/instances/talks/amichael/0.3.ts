import Talk from '../../../models/talk/talk';
import Co from '../../../models/talk/content';
import Fr from '../../../models/talk/fragment';
import Re from '../../../models/talk/response';
import { FragmentActions } from '../../../models/enums/fragment_actions';
const FA = FragmentActions;
import { ResponseNames } from '../../../models/enums/response_names';
const RN = ResponseNames;

export const amichael0_3 = new Talk({
  id: 3,
  name: 'You can communicate!',
  speaker: 'amichael',
  contents: [
    new Co({
      fragments: [
        new Fr({text: 'That is well.',
          actionBefore: FA.MED_PAUSE, actionAfter: FA.MED_PAUSE})
      ],
      responses: [new Re({trigger: null, goto: [[1, 0]]})]
    })
  ]
})
