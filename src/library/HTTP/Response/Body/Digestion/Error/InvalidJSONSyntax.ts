import Attempt from '@/library/Attempt';

class HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax
  extends Attempt.Error.Actionable<
    'HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax'
  > {
  public override readonly name = 'HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax' as const;

  public constructor(
    givenCause: Error,
  ) {
    super(
      'The response body could not be parsed as JSON.',
      {
        cause: givenCause,
      },
    );
  }
}

export {
  HTTP_Response_Body_Digestion_Error_InvalidJSONSyntax,
};
