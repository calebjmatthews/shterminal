import ThreadHandler from '../models/thread/thread_handler/thread_handler';
import Thread from '../models/thread/thread';
import ThreadState from '../models/thread/thread_state';
import { amichael0_0 } from '../instances/talks/amichael/0.0';
import { CharacterNames } from '../models/enums/character_names';
import { SET_PENDING_TALK, SET_PENDING_NULL } from '../actions/thread_handler';

let threadMap: { [speaker: string] : Thread } = {};
threadMap[CharacterNames.AMICHAEL] = new Thread(amichael0_0);
let threadStateMap: { [speaker: string] : ThreadState } = {};
threadStateMap[CharacterNames.AMICHAEL] = new ThreadState({
  speaker: CharacterNames.AMICHAEL,
  currentTalk: 0,
  contentPoss: [0]
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
      pendingTalk: action.talkId
    });

    case SET_PENDING_NULL:
    return Object.assign(new ThreadHandler(), tHandler, {
      pendingNull: true
    });

		default:
		return tHandler;
	}
};
