import {
  describe,
  it,
  expect,
} from 'vitest';

import Attempt from '@/library/Attempt';

import {
  numberTaxonomy,
} from '../../numberTaxonomy';

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
  const singleDigitPrimes = [2, 3, 5, 7] as const;

  const [
    primeA,
    primeB,
  ] = singleDigitPrimes;

  describe('the sad outcomes', () => {
    describe('when delegated', () => {
      const combosOfInoperableNumbers = symmetricPairCombos({
        of    : numberTaxonomy.undefined,
        filler: primeA,
      });

      it.each(combosOfInoperableNumbers)('should reject inoperable operands', (...$0) => {
        expect.assertions(1);

        expect(() => greatestCommonDivisor(...$0)).toThrow(Error);
      });

      const combosOfInfiniteNumbers = symmetricPairCombos({
        of    : numberTaxonomy.infinite.positive,
        filler: primeA,
      });

      it.each(combosOfInfiniteNumbers)('should reject infinite operands', (...$0) => {
        expect.assertions(1);

        expect(() => greatestCommonDivisor(...$0)).toThrow(Error);
      });
    });

    describe('when generated', () => {
      describe('due to fractional operands', () => {
        const eulers = numberTaxonomy.fractional.transcendental; // c-spell:words eulers

        const combosOfFractionalNumbers = symmetricPairCombos({
          of    : eulers,
          filler: primeA,
        });

        it.each(combosOfFractionalNumbers)('should reject them', (...$0) => {
          expect.assertions(1);

          expect(() => greatestCommonDivisor(...$0)).toThrow(Error);
        });

        it.each(combosOfFractionalNumbers)('should safely propagate the error', (...$0) => {
          expect.assertions(1);

          expect(() => greatestCommonDivisor(...$0)).toThrow(Attempt.NonActionableError);
        });

        const fractionalCombosWithMessage = [
          {
            numbers: [eulers, primeA] as const,
            message: 'Left operand must be whole.',
          },
          {
            numbers: [eulers, eulers] as const,
            message: 'Left operand must be whole.',
          },
          {
            numbers: [primeA, eulers] as const,
            message: 'Right operand must be whole.',
          },
        ];

        it.each(fractionalCombosWithMessage)('should communicate clearly with developers', ($0) => {
          expect.assertions(1);

          expect(() => greatestCommonDivisor(...$0.numbers)).toThrow($0.message);
        });
      });
    });
  });

  describe('the happy outcomes', () => {
    it('should accept valid operands', () => {
      expect.assertions(1);

      expect(() => greatestCommonDivisor(primeA, primeB)).not.toThrow();
    });

    const combosOfSignedIdentityFactors = symmetricPairCombos({
      of    : numberTaxonomy.signed.negative,
      filler: numberTaxonomy.signed.positive,
    });

    it.each(combosOfSignedIdentityFactors)('should return the same answer regardless of the sign of each operand', (...eachComboOfSignedIdentityFactors) => {
      expect.assertions(1);

      const signedA = eachComboOfSignedIdentityFactors[0] * primeA;
      const signedB = eachComboOfSignedIdentityFactors[1] * primeB;

      expect(/* */greatestCommonDivisor(/**/signedA, /**/signedB))
        .toBe(/**/greatestCommonDivisor(/* */primeA, /* */primeB));
    });

    it.todo('should be commutative');

    it.todo('should be associative');

    it.todo('should return an operable answer when zero is an operand');

    it.todo('should preserve the identity of matching operands');

    it.todo('should return identity factor for co-prime operands');

    it.todo('should extract a common factor applied to two distinct prime numbers');
  });
});
