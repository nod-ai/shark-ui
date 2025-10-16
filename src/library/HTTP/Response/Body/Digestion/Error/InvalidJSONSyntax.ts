import {
  Data,
} from 'effect';

class HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax
  extends Data.TaggedError(
    'HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax',
  )<{
    cause: Error;
  }> {
  public override message = 'The response body could not be parsed as JSON.';
}

export {
  HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax,
};
