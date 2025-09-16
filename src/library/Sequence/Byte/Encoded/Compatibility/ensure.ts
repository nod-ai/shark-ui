import Attempt from '@/library/Attempt';
import Byte from '@/library/Byte';

import {
  Sequence_Byte_Encoded_Compatibility_Error,
} from './Error';

const Sequence_Byte_Encoded_Compatibility_ensure = (
  givenCharacterSequence: string,
  {
    assuming: givenBitWidth,
  }: {
    assuming: number;
  },
): Attempt.Outcome<
  string,
  Sequence_Byte_Encoded_Compatibility_Error
> => Attempt.Fresh.that((ends) => {
  const byteCofactor = Byte.cofactorTo(givenBitWidth);

  if (
    givenCharacterSequence.length % byteCofactor === 0
  ) return ends.inSuccessWith(givenCharacterSequence);

  const newCompatibilityError = new Sequence_Byte_Encoded_Compatibility_Error(givenBitWidth);
  return ends.inFailureDueTo(newCompatibilityError);
});

export {
  Sequence_Byte_Encoded_Compatibility_ensure,
};
