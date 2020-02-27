export default class Response {
  trigger: string;
  goto: number[][];

  constructor(response: Response) {
    Object.assign(this, response);
  }
}
