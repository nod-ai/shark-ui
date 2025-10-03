import ParsingError from '@/library/ParsingError';

class Sequence_Byte_Encoded_Base64_ParsingError
  extends ParsingError<
    'Sequence_Byte_Encoded_Base64'
  > {
  public override name = 'Sequence_Byte_Encoded_Base64_ParsingError' as const;

  public constructor(
    givenMessage: string,
    givenCause?: Error,
  ) {
    super(givenMessage, givenCause);
  }
}

export {
  Sequence_Byte_Encoded_Base64_ParsingError,
};
