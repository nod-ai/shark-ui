import Attempt from '@/library/Attempt';

class HTTP_Endpoint_Error_FailedToSendRequest
  extends Attempt.Error.Actionable<
    'HTTP_Endpoint_Error_FailedToSendRequest'
  > {
  public override name = 'HTTP_Endpoint_Error_FailedToSendRequest' as const;

  public constructor(
    public readonly endpoint: URL,
  ) {
    super(`Failed to fetch from "${endpoint.toString()}".`);
  }
}

export {
  HTTP_Endpoint_Error_FailedToSendRequest,
};
