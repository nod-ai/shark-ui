import Attempt from '@/library/Attempt';

class HTTP_Endpoint_Error_IndigestibleResponseBody
  extends Attempt.Error.Actionable<
    'HTTP_Endpoint_Error_IndigestibleResponseBody'
  > {
  public override name = 'HTTP_Endpoint_Error_IndigestibleResponseBody' as const;

  public constructor(
    public readonly endpoint: URL,
    givenCause: Error,
  ) {
    super(`Could not digest body of response from "${endpoint.toString()}".`, {
      cause: givenCause,
    });
  }
}

export {
  HTTP_Endpoint_Error_IndigestibleResponseBody,
};
