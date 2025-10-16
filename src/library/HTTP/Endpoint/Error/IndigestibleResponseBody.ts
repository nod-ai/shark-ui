import {
  Data,
} from 'effect';

class HTTP_Endpoint_Error_IndigestibleResponseBody
  extends Data.TaggedError(
    'HTTP_Endpoint_Error_IndigestibleResponseBody',
  )<{
    endpoint: URL;
    cause: Error;
  }> {
  public override get message(): string {
    return `Could not digest body of response from "${this.endpoint.toString()}".`;
  }
}

export {
  HTTP_Endpoint_Error_IndigestibleResponseBody,
};
