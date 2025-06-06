import {
  cofactor,
} from '@/library/math/operators';

const Byte_bitWidth = 8 as const;

const Byte_cofactorTo = (givenBitWidth: number): number => {
  return cofactor({
    to        : givenBitWidth,
    forLCMWith: Byte_bitWidth,
  });
};

export * as Sequence from './Sequence';

export {
  Byte_cofactorTo as cofactorTo,
};
