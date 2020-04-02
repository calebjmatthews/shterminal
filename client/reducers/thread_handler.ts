import ThreadHandler from '../models/thread/thread_handler/thread_handler';
import Thread from '../models/thread/thread';
import ThreadState from '../models/thread/thread_state';
import { amichael0_0 } from '../instances/talks/amichael/0.0';
import { amichael0_1 } from '../instances/talks/amichael/0.1';
import { amichael0_2 } from '../instances/talks/amichael/0.2';
import { amichael0_3 } from '../instances/talks/amichael/0.3';
import { amichael0_4 } from '../instances/talks/amichael/0.4';
import { amichael1_0 } from '../instances/talks/amichael/1.0';
import { amichael1_1 } from '../instances/talks/amichael/1.1';
import { amichael1_2 } from '../instances/talks/amichael/1.2';
import { amichael1_3 } from '../instances/talks/amichael/1.3';
import { amichael1_4 } from '../instances/talks/amichael/1.4';
import { CharacterNames } from '../models/enums/character_names';
import { SET_PENDING_TALK, SET_PENDING_NULL } from '../actions/thread_handler';

let threadMap: { [speaker: string] : Thread } = {};
threadMap[CharacterNames.AMICHAEL] = new Thread([
  [amichael0_0, amichael0_1, amichael0_2, amichael0_3, amichael0_4],
  [amichael1_0, amichael1_1, amichael1_2, amichael1_3, amichael1_4]
]);;
let threadStateMap: { [speaker: string] : ThreadState } = {};
threadStateMap[CharacterNames.AMICHAEL] = new ThreadState({
  speaker: CharacterNames.AMICHAEL,
  currentTalk: [0, 0],
  contentPoss: [[0]]
})
let startingTHandler = new ThreadHandler({
  currentSpeaker: CharacterNames.AMICHAEL,
  threads: threadMap,
  threadStates: threadStateMap
})

export default function
  (tHandler: ThreadHandler = startingTHandler,
    action = null) {
	switch(action.type) {
    case SET_PENDING_TALK:
    return Object.assign(new ThreadHandler(), tHandler, {
      pendingTalk: action.talkId,
      pendingResName: action.pendingResName,
      pendingResValue: action.pendingResValue
    });

    case SET_PENDING_NULL:
    return Object.assign(new ThreadHandler(), tHandler, {
      pendingNull: true,
      pendingResName: action.pendingResName,
      pendingResValue: action.pendingResValue
    });

		default:
		return tHandler;
	}
};
