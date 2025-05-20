import Attempt from '@/library/Attempt';

import * as HTTPResponse from './HTTPResponse';

export default class HTTPResponseError extends Attempt.ActionableError<'HTTPResponseError'> {
  public readonly status: HTTPResponse.ErrorStatusCode;

  public constructor(givenMessage: string, givenStatus: HTTPResponse.ErrorStatusCode) {
    super(givenMessage);
    this.name = 'HTTPResponseError';
    this.status = givenStatus;
  }
}
