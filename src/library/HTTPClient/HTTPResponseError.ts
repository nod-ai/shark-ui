import * as HTTPResponse from './HTTPResponse';

export default class HTTPResponseError extends Error {
  status: HTTPResponse.ErrorStatusCode;

  constructor(givenMessage: string, givenStatus: HTTPResponse.ErrorStatusCode) {
    super(givenMessage);
    this.status = givenStatus;
  }
}
