import { combineReducers } from 'redux';
import ThreadHandlerReducer from './thread_handler';

const rootReducer = combineReducers({
  tHandler: ThreadHandlerReducer
});

export default rootReducer;
