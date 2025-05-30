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
  ) return new Byte_Sequence_EncodingCompatibilityError(givenBitWidth).throwAnyway('To be converted to `Attempt` failure');

  return givenSequence;
};

export {
  Byte_Sequence_EncodingCompatibilityError as EncodingCompatibilityError,
  Byte_Sequence_assertEncodable as assertEncodable,
};
