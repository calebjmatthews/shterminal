import { ResponseNames } from './enums/response_names';

export default class Reader implements ReaderInterface {
  permissions: string[];

  constructor(reader: ReaderInterface = null) {
    Object.assign(this, reader);
  }

  receiveKey(key: string) {
    if (key == 'nehushtan') {
      this.removePermission(ResponseNames.SCRAMBLED)
      this.addPermission(ResponseNames.YES);
      this.addPermission(ResponseNames.NO);
    }
  }

  addPermission(permissionToAdd: string) {
    let exists = false;
    this.permissions.map((permission) => {
      if (permission == permissionToAdd) {
        exists = true;
      }
    });
    if (exists == false) {
      this.permissions.push(permissionToAdd);
    }
  }

  removePermission(permissionToRem: string) {
    let indexRem = null;
    this.permissions.map((permission, index) => {
      if (permission == permissionToRem) {
        indexRem = index;
      }
    });
    if (indexRem != null) {
      this.permissions.splice(indexRem, 1);
    }
  }
}

interface ReaderInterface {
  permissions: string[];
}
