import Attempt from '@/library/Attempt';

import type {
  HTTP_Response,
} from '../Response';

class HTTP_Endpoint_ResponseError extends Attempt.ActionableError<'HTTP_Endpoint_ResponseError'> {
  public readonly status: HTTP_Response.StatusCode.Error.Any;

  public constructor(givenMessage: string, givenStatus: HTTP_Response.StatusCode.Error.Any) {
    super(givenMessage);
    this.name = 'HTTP_Endpoint_ResponseError';
    this.status = givenStatus;
  }
}

export {
  HTTP_Endpoint_ResponseError,
};
