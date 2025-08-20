import Attempt from '@/library/Attempt';

import type {
  HTTP_Response,
} from '../Response';

class HTTP_Endpoint_ResponseError
  extends Attempt.Error_Actionable<
  'HTTP_Endpoint_ResponseError'
> {
  public override name = 'HTTP_Endpoint_ResponseError' as const;

  public constructor(
    givenMessage: string,
    public readonly status: HTTP_Response.StatusCode.Error.Any,
  ) {
    super(givenMessage);
  }
}

export {
  HTTP_Endpoint_ResponseError,
};
