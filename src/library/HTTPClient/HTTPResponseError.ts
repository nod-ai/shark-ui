import * as HTTPResponse from './HTTPResponse';

export default class HTTPResponseError extends Error {
  public readonly status: HTTPResponse.ErrorStatusCode;

  public constructor(givenMessage: string, givenStatus: HTTPResponse.ErrorStatusCode) {
    super(givenMessage);
    this.status = givenStatus;
  }
}
