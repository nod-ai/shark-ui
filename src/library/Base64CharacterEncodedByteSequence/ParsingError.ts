import Attempt from '@/library/Attempt';
import ParsingError from '@/library/ParsingError';
import Sequence from '@/library/Sequence';

class Sequence_Byte_Encoded_Base64Character_ParsingError
  extends ParsingError<
  'Sequence_Byte_Encoded_Base64Character'
> {
  public override name = 'Sequence_Byte_Encoded_Base64Character_ParsingError' as const;

  public constructor(
    givenMessage: string,
    givenCause?: Error,
  ) {
    super(givenMessage, givenCause);
  }

  public static thatEscorts(
    givenError:
      | Sequence.Byte.Encoded.Compatibility.Error
      | Sequence.Base64.Conformance.Error,
  ): Sequence_Byte_Encoded_Base64Character_ParsingError {
    const extraContext = (() => {
      switch (true) {
        case givenError instanceof Sequence.Byte.Encoded.Compatibility.Error:
          return 'Could not use given characters to encode byte sequence.';
        case givenError instanceof Sequence.Base64.Conformance.Error:
          return 'Could not use given characters to encode byte sequence in Base64.';
        default: return Attempt.abandon('Unexpected error type.');
      }
    })();

    const expandedMessage = [
      extraContext,
      givenError.message,
    ].join(' ');

    const escortedError = new this(expandedMessage, givenError);
    return escortedError;
  }
}

export {
  Sequence_Byte_Encoded_Base64Character_ParsingError as default,
};
