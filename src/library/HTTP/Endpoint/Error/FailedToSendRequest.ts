import Attempt from '@/library/Attempt';

class HTTP_Endpoint_Error_FailedToSendRequest
  extends Attempt.Error.Tagged(
    'HTTP_Endpoint_Error_FailedToSendRequest',
  ) {
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
