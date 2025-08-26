import Attempt from '@/library/Attempt';
import Byte from '@/library/Byte';

import Sequence_Byte_Encoded_Compatibility_Error from './Error';

const Sequence_Byte_Encoded_Compatibility_ensure = (
  givenSequence: string,
  {
    assuming: givenBitWidth,
  }: {
    assuming: number;
  },
): Attempt.Outcome<
  string,
  Sequence_Byte_Encoded_Compatibility_Error
> => Attempt.that((ends) => {
  const byteCofactor = Byte.cofactorTo(givenBitWidth);

  if (
    givenSequence.length % byteCofactor !== 0
  ) return ends.inFailureDueTo(new Sequence_Byte_Encoded_Compatibility_Error(givenBitWidth));

  return ends.inSuccessWith(givenSequence);
});

export {
  Sequence_Byte_Encoded_Compatibility_Error as Error,
  Sequence_Byte_Encoded_Compatibility_ensure as ensure,
};
