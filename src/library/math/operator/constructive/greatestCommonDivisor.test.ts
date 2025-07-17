import {
  describe,
  it,
  expect,
} from 'vitest';

import {
  greatestCommonDivisor,
} from './greatestCommonDivisor';

const pairCombos = <
  LeftElement extends number,
  RightElement extends number,
  FillerElement extends number,
>(
  given: {
    left: LeftElement;
    right: RightElement;
    filler: FillerElement;
  },
) => [
  [given.left/*  */, given.filler/**/],
  [given.left/*  */, given.right/* */],
  [given.filler/**/, given.right/* */],
] as const;

const symmetricPairCombos = <
  SymmetricElement extends number,
  FillerElement extends number,
>(
  given: {
    of: SymmetricElement;
    filler: FillerElement;
  },
) => pairCombos({
  left  : given.of,
  right : given.of,
  filler: given.filler,
});

describe(greatestCommonDivisor, () => {
  describe('the sad outcomes', () => {
    describe('when delegated', () => {
      const combosOfInoperableNumbers = symmetricPairCombos({
        of    : NaN,
        filler: 100,
      });

      it.each(combosOfInoperableNumbers)('should reject inoperable operands', (...$0) => {
        expect.assertions(1);

        expect(() => greatestCommonDivisor(...$0)).toThrow(Error);
      });

      const combosOfInfiniteNumbers = symmetricPairCombos({
        of    : Infinity,
        filler: 10000000,
      });

      it.each(combosOfInfiniteNumbers)('should reject infinite operands', (...$0) => {
        expect.assertions(1);

        expect(() => greatestCommonDivisor(...$0)).toThrow(Error);
      });
    });

    describe('when generated', () => {
      describe('due to fractional operands', () => {
        it.todo('should reject them');

        it.todo('should safely propagate the error');

        it.todo('should communicate clearly with developers');
      });
    });
  });

  describe('the happy outcomes', () => {
    it.todo('should accept valid operands');

    it.todo('should return the same answer regardless of the sign of each operand');

    it.todo('should be commutative');

    it.todo('should be associative');

    it.todo('should return an operable answer when zero is an operand');

    it.todo('should preserve the identity of matching operands');

    it.todo('should return identity factor for co-prime operands');

    it.todo('should extract a common factor applied to two distinct prime numbers');
  });
});
