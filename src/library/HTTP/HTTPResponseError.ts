import Attempt from '@/library/Attempt';

import type {
  HTTP_Response,
} from './Response';

class HTTPResponseError extends Attempt.ActionableError<'HTTPResponseError'> {
  public readonly status: HTTP_Response.StatusCode.Error.Any;

  public constructor(givenMessage: string, givenStatus: HTTP_Response.StatusCode.Error.Any) {
    super(givenMessage);
    this.name = 'HTTPResponseError';
    this.status = givenStatus;
  }
}

export {
  HTTPResponseError as default,
};
