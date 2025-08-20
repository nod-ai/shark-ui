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
  absoluteValueOf,
} from './absoluteValueOf';

describe(absoluteValueOf, () => {
  const {
    origin: neutralNumber,
    signed,
    fractional,
    infinite,
    runtime,
    undefined: soleInoperableNumber,
    ...remainingTaxonomy
  } = numberTaxonomy;

  it('should account for the complete number taxonomy', () => {
    expect.assertions(1);

    expect(remainingTaxonomy).toStrictEqual({});
  });

  describe('the sad outcomes', () => {
    describe('when generated', () => {
      describe('due to inoperable operands', () => {
        it('should reject them', () => {
          expect.assertions(1);

          expect(() => absoluteValueOf(soleInoperableNumber)).toThrow(Error);
        });

        it('should safely propagate the error', () => {
          expect.assertions(1);

          expect(() => absoluteValueOf(soleInoperableNumber)).toThrow(Attempt.Error_NonActionable);
        });

        it('should communicate clearly with developers', () => {
          expect.assertions(1);

          expect(() => absoluteValueOf(soleInoperableNumber)).toThrow('Cannot determine distance of inoperable number from origin because it does not exist on the number line.');
        });
      });
    });
  });

  describe('the happy outcomes', () => {
    const infiniteMagnitudes = [
      infinite.positive,
      infinite.negative,
    ];

    const boundaryMagnitudes = [
      runtime.min,
      runtime.max,
    ];

    const fractionalMagnitudes = [
      fractional.irrational,
      fractional.rational,
      fractional.transcendental,
    ];

    const neutralMagnitudes = [
      neutralNumber,
      neutralNumber * signed.positive,
      neutralNumber * signed.negative,
    ];

    const signedMagnitudes = [
      signed.positive,
      signed.negative,
    ];

    const operableMagnitudes = [
      ...infiniteMagnitudes,
      ...boundaryMagnitudes,
      ...fractionalMagnitudes,
      ...neutralMagnitudes,
      ...signedMagnitudes,
    ];

    it.each(operableMagnitudes)('should accept operable numbers', (eachOperableMagnitude) => {
      expect.assertions(1);

      expect(() => absoluteValueOf(eachOperableMagnitude)).not.toThrow();
    });

    it.each(infiniteMagnitudes)('should strip the sign from infinite numbers', (eachInfiniteMagnitude) => {
      expect.assertions(1);

      expect(absoluteValueOf(eachInfiniteMagnitude)).toBe(infinite.positive);
    });

    it.each(boundaryMagnitudes)('should preserve the identity of boundary numbers', (eachBoundaryMagnitude) => {
      expect.assertions(1);

      expect(absoluteValueOf(eachBoundaryMagnitude)).toBe(eachBoundaryMagnitude);
    });

    it.each(fractionalMagnitudes)('should preserve the identity of fractional numbers', (eachFractionalMagnitude) => {
      expect.assertions(1);

      expect(absoluteValueOf(eachFractionalMagnitude)).toBe(eachFractionalMagnitude);
    });

    it.each(neutralMagnitudes)('should preserve the identity of neutral numbers', (eachNeutralMagnitude) => {
      expect.assertions(1);

      expect(absoluteValueOf(eachNeutralMagnitude)).toBe(neutralNumber);
    });

    it.each(signedMagnitudes)('should convert a signed magnitude to a positive distance from origin', (eachSignedMagnitude) => {
      expect.assertions(1);

      expect(absoluteValueOf(eachSignedMagnitude)).toBe(signed.positive);
    });
  });
});
