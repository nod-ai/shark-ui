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
  squared,
} from '../hyper';

import * as GCDAlias from './greatestCommonDivisor';

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

const aliasKeys = ['default'] as const;

describe(GCDAlias.default, () => {
  const eachAliasKey = aliasKeys[0];
  const eachAliasedGCD = GCDAlias[eachAliasKey]; // eslint-disable-line import/namespace

  const singleDigitPrimes = [2, 3, 5, 7] as const;

  const [
    primeA,
    primeB,
    primeC,
  ] = singleDigitPrimes;

  describe('the sad outcomes', () => {
    describe('when delegated', () => {
      const combosOfInoperableNumbers = symmetricPairCombos({
        of    : numberTaxonomy.undefined,
        filler: primeA,
      });

      it.each(combosOfInoperableNumbers)('should reject inoperable operands', (...$0) => {
        expect.assertions(1);

        expect(() => eachAliasedGCD(...$0)).toThrow(Error);
      });

      const combosOfInfiniteNumbers = symmetricPairCombos({
        of    : numberTaxonomy.infinite.positive,
        filler: primeA,
      });

      it.each(combosOfInfiniteNumbers)('should reject infinite operands', (...$0) => {
        expect.assertions(1);

        expect(() => eachAliasedGCD(...$0)).toThrow(Error);
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

          expect(() => eachAliasedGCD(...$0)).toThrow(Error);
        });

        it.each(combosOfFractionalNumbers)('should safely propagate the error', (...$0) => {
          expect.assertions(1);

          expect(() => eachAliasedGCD(...$0)).toThrow(Attempt.NonActionableError);
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

          expect(() => eachAliasedGCD(...$0.numbers)).toThrow($0.message);
        });
      });
    });
  });

  describe('the happy outcomes', () => {
    it('should accept valid operands', () => {
      expect.assertions(1);

      expect(() => eachAliasedGCD(primeA, primeB)).not.toThrow();
    });

    const combosOfSignedIdentityFactors = symmetricPairCombos({
      of    : numberTaxonomy.signed.negative,
      filler: numberTaxonomy.signed.positive,
    });

    it.each(combosOfSignedIdentityFactors)('should return the same answer regardless of the sign of each operand', (...eachComboOfSignedIdentityFactors) => {
      expect.assertions(1);

      const signedA = eachComboOfSignedIdentityFactors[0] * primeA;
      const signedB = eachComboOfSignedIdentityFactors[1] * primeB;

      expect(/* */eachAliasedGCD(/**/signedA, /**/signedB))
        .toBe(/**/eachAliasedGCD(/* */primeA, /* */primeB));
    });

    it('should be commutative', () => {
      expect.assertions(1);

      expect(/* */eachAliasedGCD(primeA, primeB))
        .toBe(/**/eachAliasedGCD(primeB, primeA));
    });

    it('should be associative', () => {
      expect.assertions(1);

      expect(/* */eachAliasedGCD(eachAliasedGCD(primeA, primeB), primeC))
        .toBe(/**/eachAliasedGCD(eachAliasedGCD(primeB, primeC), primeA));
    });

    const combosOfTogglingFactors = [
      [0, 1, 1],
      [0, 0, 0],
      [1, 0, 1],
    ] as const;

    it.each(combosOfTogglingFactors)('should return an operable answer when zero is an operand', (...eachComboOfTogglingFactors) => {
      expect.assertions(1);

      expect(
        eachAliasedGCD(
          primeA * eachComboOfTogglingFactors[0],
          primeA * eachComboOfTogglingFactors[1],
        ),
      ).toBe(
        primeA * eachComboOfTogglingFactors[2],
      );
    });

    it('should preserve the identity of matching operands', () => {
      expect.assertions(1);

      expect(eachAliasedGCD(primeA, primeA)).toBe(primeA);
    });

    const identityFactor = 1;

    const neighboringPrimes = [
      primeA,
      primeB,
    ] as const;

    const coPrimePairs = [
      neighboringPrimes,
      neighboringPrimes.map(squared) as [number, number],
    ];

    it.each(coPrimePairs)('should return identity factor for co-prime operands', (...eachCoPrimePair) => {
      expect.assertions(1);

      expect(
        eachAliasedGCD(
          identityFactor * eachCoPrimePair[0],
          identityFactor * eachCoPrimePair[1],
        ),
      ).toBe(identityFactor);
    });

    const combosOfDistinctNonComposites = pairCombos({
      left  : primeA,
      right : primeB,
      filler: identityFactor,
    });

    describe.each(combosOfDistinctNonComposites)('when applied to two distinct prime numbers', (...eachComboOfNonComposites) => {
      const smallSquare = squared(primeA);
      const largeSquare = squared(primeC);

      const commonFactors = [
        identityFactor,
        primeC,
        smallSquare,
        largeSquare,
      ];

      it.each(commonFactors)('should extract a common factor', (eachCommonFactor) => {
        expect.assertions(1);

        expect(
          eachAliasedGCD(
            eachCommonFactor * eachComboOfNonComposites[0],
            eachCommonFactor * eachComboOfNonComposites[1],
          ),
        ).toBe(eachCommonFactor);
      });
    });
  });
});
