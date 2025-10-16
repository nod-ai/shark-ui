import {
  Data,
} from 'effect';

class HTTP_Endpoint_Error_IndigestibleResponseBody
  extends Data.TaggedError(
    'HTTP_Endpoint_Error_IndigestibleResponseBody',
  )<{
    message: string;
    cause: Error;
  }> {
  public constructor(
    public readonly endpoint: URL,
    givenCause: Error,
  ) {
    super({
      message: `Could not digest body of response from "${endpoint.toString()}".`,
      cause  : givenCause,
    });
  }
}

export {
  HTTP_Endpoint_Error_IndigestibleResponseBody,
};
