import {
  Data,
} from 'effect';

class HTTP_Endpoint_Error_FailedToSendRequest
  extends Data.TaggedError(
    'HTTP_Endpoint_Error_FailedToSendRequest',
  )<{
    message: string;
  }> {
  public constructor(
    public readonly endpoint: URL,
  ) {
    super({
      message: `Failed to fetch from "${endpoint.toString()}".`,
    });
  }
}

export {
  HTTP_Endpoint_Error_FailedToSendRequest,
};
