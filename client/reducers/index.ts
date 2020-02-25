import { combineReducers } from 'redux';
import ReaderReducer from './reader';

const rootReducer = combineReducers({
  reader: ReaderReducer
});

export default rootReducer;
