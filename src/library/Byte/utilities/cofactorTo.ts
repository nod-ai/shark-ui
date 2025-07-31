import {
  cofactor,
} from '@/library/math';

const Byte_bitWidth = 8 as const;

const Byte_cofactorTo = (givenBitWidth: number): number => {
  return cofactor({
    to        : givenBitWidth,
    forLCMWith: Byte_bitWidth,
  });
};

export {
  Byte_cofactorTo,
};
