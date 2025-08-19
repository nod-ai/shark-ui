import Attempt from '@/library/Attempt';
import ParsingError from '@/library/ParsingError';

import {
  Sequence_Base64,
} from '../../../Base64';

import {
  Sequence_Byte_Encoded_Compatibility,
} from '../Compatibility';

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

  public static thatEscorts(
    givenError:
      | Sequence_Byte_Encoded_Compatibility.Error
      | Sequence_Base64.Conformance.Error,
  ): Sequence_Byte_Encoded_Base64_ParsingError {
    const extraContext = (() => {
      switch (true) {
        case givenError instanceof Sequence_Byte_Encoded_Compatibility.Error:
          return 'Could not use given characters to encode byte sequence.';
        case givenError instanceof Sequence_Base64.Conformance.Error:
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
  Sequence_Byte_Encoded_Base64_ParsingError as default,
};
