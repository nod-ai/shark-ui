import Attempt from '@/library/Attempt';

import {
  Byte_cofactorTo,
} from '@/library/Byte/utilities/cofactorTo';

import Byte_Sequence_EncodingCompatibilityError from './EncodingCompatibilityError';

const Byte_Sequence_ensureEncodable = (
  givenSequence: string,
  {
    assuming: givenBitWidth,
  }: {
    assuming: number;
  },
): Attempt.Outcome<string, Byte_Sequence_EncodingCompatibilityError> => Attempt.that((ends) => {
  const byteCofactor = Byte_cofactorTo(givenBitWidth);

  if (
    givenSequence.length % byteCofactor !== 0
  ) return ends.inFailureDueTo(new Byte_Sequence_EncodingCompatibilityError(givenBitWidth));

  return ends.inSuccessWith(givenSequence);
});

export {
  Byte_Sequence_EncodingCompatibilityError as EncodingCompatibilityError,
  Byte_Sequence_ensureEncodable as ensureEncodable,
};
