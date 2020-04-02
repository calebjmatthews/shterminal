import Reader from '../models/reader';
import { ResponseNames } from '../models/enums/response_names';
import { RECEIVE_KEY } from '../actions/reader';

let startingReader = new Reader({
  permissions: [ResponseNames.SCRAMBLED]
})

export default function
  (reader: Reader = startingReader,
    action = null) {
	switch(action.type) {
    case RECEIVE_KEY:
    return Object.assign(new Reader(), reader, {
      permissions: action.permissions
    });

		default:
		return reader;
	}
};
