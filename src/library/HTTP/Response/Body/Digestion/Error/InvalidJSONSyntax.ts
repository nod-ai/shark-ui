import Attempt from '@/library/Attempt';

class HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax
  extends Attempt.Error.Tagged(
    'HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax',
  ) {
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
