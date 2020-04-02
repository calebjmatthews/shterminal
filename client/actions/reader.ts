import Reader from '../models/reader';

export const RECEIVE_KEY = 'RECEIVE_KEY';
export function receiveKey(reader: Reader, key: string) {
  reader.receiveKey(key);
  return {
    type: RECEIVE_KEY,
    permissions: reader.permissions
  }
}
