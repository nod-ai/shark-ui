import Attempt from '@/library/Attempt';

import type {
  HTTP_Response,
} from '../../Response';

class HTTP_Endpoint_Error_RespondedWithFailure
  extends Attempt.Error.Tagged(
    'HTTP_Endpoint_Error_RespondedWithFailure',
  ) {
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
