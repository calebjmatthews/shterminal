export const RESPONSE_SELECT = 'RESPONSE_SELECT';
export function responseSelect(responseName: string, responseValue: string) {
  return {
    type: RESPONSE_SELECT,
    responseName: responseName,
    responseValue: responseValue
  }
}
