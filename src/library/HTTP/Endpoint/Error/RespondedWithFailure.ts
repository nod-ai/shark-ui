import {
  Data,
} from 'effect';

import type {
  HTTP_Response,
} from '../../Response';

class HTTP_Endpoint_Error_RespondedWithFailure
  extends Data.TaggedError(
    'HTTP_Endpoint_Error_RespondedWithFailure',
  )<{
    message: string;
  }> {
  public constructor(
    givenMessage: string,
    public readonly status: HTTP_Response.StatusCode.Error.Any,
  ) {
    super({
      message: givenMessage,
    });
  }
}

export {
  HTTP_Endpoint_Error_RespondedWithFailure,
};
