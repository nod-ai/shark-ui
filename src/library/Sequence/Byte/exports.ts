import Attempt from '@/library/Attempt';
import Byte from '@/library/Byte';

import Sequence_Byte_Encoded_CompatibilityError from './EncodingCompatibilityError';

const Sequence_Byte_Encoded_ensureCompatibility = (
  givenSequence: string,
  {
    assuming: givenBitWidth,
  }: {
    assuming: number;
  },
): Attempt.Outcome<string, Sequence_Byte_Encoded_CompatibilityError> => Attempt.that((ends) => {
  const byteCofactor = Byte.cofactorTo(givenBitWidth);

  if (
    givenSequence.length % byteCofactor !== 0
  ) return ends.inFailureDueTo(new Sequence_Byte_Encoded_CompatibilityError(givenBitWidth));

  return ends.inSuccessWith(givenSequence);
});

export {
  Sequence_Byte_Encoded_CompatibilityError as Encoded_CompatibilityError,
  Sequence_Byte_Encoded_ensureCompatibility as Encoded_ensureCompatibility,
};
