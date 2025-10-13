import Attempt from '@/library/Attempt';

import type {
  HTTP_Response,
} from '../../Response';

class HTTP_Endpoint_Error_RespondedWithFailure
  extends Attempt.Error.Actionable<
    'HTTP_Endpoint_Error_RespondedWithFailure'
  > {
  public override name = 'HTTP_Endpoint_Error_RespondedWithFailure' as const;

  public constructor(
    givenMessage: string,
    public readonly status: HTTP_Response.StatusCode.Error.Any,
  ) {
    super(givenMessage);
  }
}

export {
  HTTP_Endpoint_Error_RespondedWithFailure,
};
