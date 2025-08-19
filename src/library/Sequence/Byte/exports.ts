import Attempt from '@/library/Attempt';
import Byte from '@/library/Byte/index.ts';

import Sequence_Byte_EncodingCompatibilityError from './EncodingCompatibilityError';

const Sequence_Byte_ensureEncodable = (
  givenSequence: string,
  {
    assuming: givenBitWidth,
  }: {
    assuming: number;
  },
): Attempt.Outcome<string, Sequence_Byte_EncodingCompatibilityError> => Attempt.that((ends) => {
  const byteCofactor = Byte.cofactorTo(givenBitWidth);

  if (
    givenSequence.length % byteCofactor !== 0
  ) return ends.inFailureDueTo(new Sequence_Byte_EncodingCompatibilityError(givenBitWidth));

  return ends.inSuccessWith(givenSequence);
});

export {
  Sequence_Byte_EncodingCompatibilityError as EncodingCompatibilityError,
  Sequence_Byte_ensureEncodable as ensureEncodable,
};
