import ThreadHandler from '../models/thread/thread_handler';
import Thread from '../models/thread/thread';
import ThreadState from '../models/thread/thread_state';
import { amichael0_0 } from '../instances/talks/amichael/0.0';
import { CharacterNames } from '../models/enums/character_names';

let threadMap: { [speaker: string] : Thread } = {};
threadMap[CharacterNames.AMICHAEL] = new Thread(amichael0_0);
let threadStateMap: { [speaker: string] : ThreadState } = {};
threadStateMap[CharacterNames.AMICHAEL] = new ThreadState({
  speaker: CharacterNames.AMICHAEL,
  currentTalk: [0],
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
		default:
			return tHandler;
	}
};
