import ThreadHandler from '../models/thread/thread_handler/thread_handler';

export const SET_PENDING_TALK = 'SET_PENDING_TALK';
export const SET_PENDING_NULL = 'SET_PENDING_NULL';
export function responseTriggerSelect(tHandler: ThreadHandler, responseName: string,
  responseValue: string): any {
  let newTalkId = tHandler.receiveResponseTrigger(responseName, responseValue);
  if (newTalkId != null) {
    return {
      type: SET_PENDING_TALK,
      talkId: newTalkId,
      pendingResName: responseName,
      pendingResValue: responseValue
    }
  }
  else {
    return {
      type: SET_PENDING_NULL,
      pendingResName: responseName,
      pendingResValue: responseValue
    }
  }
}
