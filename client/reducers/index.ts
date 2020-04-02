import { combineReducers } from 'redux';
import ThreadHandlerReducer from './thread_handler';
import ReaderReducer from './reader';

const rootReducer = combineReducers({
  tHandler: ThreadHandlerReducer,
  reader: ReaderReducer
});

export default rootReducer;
