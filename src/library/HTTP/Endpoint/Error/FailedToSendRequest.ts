import {
  Data,
} from 'effect';

class HTTP_Endpoint_Error_FailedToSendRequest
  extends Data.TaggedError(
    'HTTP_Endpoint_Error_FailedToSendRequest',
  )<{
    endpoint: URL;
  }> {
  public override get message(): string {
    return `Failed to fetch from "${this.endpoint.toString()}".`;
  }
}

export {
  HTTP_Endpoint_Error_FailedToSendRequest,
};
