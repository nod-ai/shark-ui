import {
  cofactorTo as Byte_cofactorTo,
} from '..';

import Byte_Sequence_EncodingCompatibilityError from './EncodingCompatibilityError';

const Byte_Sequence_assertEncodable = (
  givenSequence: string,
  {
    assuming: givenBitWidth,
  }: {
    assuming: number;
  },
): string => {
  const byteCofactor = Byte_cofactorTo(givenBitWidth);

  if (
    givenSequence.length % byteCofactor !== 0
  ) throw new Byte_Sequence_EncodingCompatibilityError(givenBitWidth);

  return givenSequence;
};

export {
  Byte_Sequence_EncodingCompatibilityError as EncodingCompatibilityError,
  Byte_Sequence_assertEncodable as assertEncodable,
};
