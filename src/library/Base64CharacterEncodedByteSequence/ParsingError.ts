import Attempt from '@/library/Attempt';
import Base64 from '@/library/Base64';
import Byte from '@/library/Byte';

import {
  ParsingError,
} from '@/library/Parser';

class Base64CharacterEncodedByteSequence_ParsingError
  extends ParsingError<
  'Base64CharacterEncodedByteSequence'
> {
  public constructor(
    givenMessage: string,
    givenCause?: Error,
  ) {
    super(givenMessage, givenCause);
    this.name = 'Base64CharacterEncodedByteSequence_ParsingError';
  }

  public static thatEscorts(
    givenError:
      | Byte.Sequence.EncodingCompatibilityError
      | Base64.CharacterSequence.ConformanceError,
  ): Base64CharacterEncodedByteSequence_ParsingError {
    const extraContext = (() => {
      switch (true) {
        case givenError instanceof Byte.Sequence.EncodingCompatibilityError:
          return 'Could not use given characters to encode byte sequence.';
        case givenError instanceof Base64.CharacterSequence.ConformanceError:
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
  Base64CharacterEncodedByteSequence_ParsingError as default,
};
