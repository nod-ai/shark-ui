import {
  cofactor,
} from '@/library/math';

const Byte = {
  bitWidth: 8 as const,
  cofactorTo(givenBitWidth: number): number {
    return cofactor({
      to        : givenBitWidth,
      forLCMWith: this.bitWidth,
    });
  },
};

export {
  Byte as default,
};
