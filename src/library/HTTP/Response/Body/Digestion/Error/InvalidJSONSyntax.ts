import {
  Data,
} from 'effect';

class HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax
  extends Data.TaggedError(
    'HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax',
  )<{
    message: string;
    cause: Error;
  }> {
  public constructor(
    givenCause: Error,
  ) {
    super({
      message: 'The response body could not be parsed as JSON.',
      cause  : givenCause,
    });
  }
}

export {
  HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax,
};
