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
  isFinite,
} from './isFinite';

describe(isFinite, () => {
  describe('the sad outcomes for inoperable operands', () => {
    const theSoleInoperableNumber = numberTaxonomy.undefined;

    it('should reject them', () => {
      expect.assertions(1);

      expect(() => isFinite(theSoleInoperableNumber)).toThrow(Error);
    });

    it('should safely propagate the error', () => {
      expect.assertions(1);

      expect(() => isFinite(theSoleInoperableNumber)).toThrow(Attempt.NonActionableError);
    });

    it('should communicate clearly with developers', () => {
      expect.assertions(1);

      expect(() => isFinite(theSoleInoperableNumber)).toThrow('Operand must be operable.');
    });
  });

  describe('the happy outcomes', () => {
    const infiniteNumbers = [
      numberTaxonomy.infinite.positive,
      numberTaxonomy.infinite.negative,
    ];

    const finiteNumbers = [
      numberTaxonomy.origin,
      numberTaxonomy.signed.negative,
      numberTaxonomy.signed.positive,
      numberTaxonomy.fractional.rational,
      numberTaxonomy.fractional.irrational,
      numberTaxonomy.fractional.transcendental,
      numberTaxonomy.runtime.min,
      numberTaxonomy.runtime.max,
    ];

    const operableNumbers = [
      ...finiteNumbers,
      ...infiniteNumbers,
    ];

    it.each(operableNumbers)('should accept valid operands', (eachOperableNumber) => {
      expect.assertions(1);

      expect(() => isFinite(eachOperableNumber)).not.toThrow();
    });

    it.each(infiniteNumbers)('should detect infinite operands', (eachInfiniteNumber) => {
      expect.assertions(1);

      expect(isFinite(eachInfiniteNumber)).toBe(false);
    });

    it.each(finiteNumbers)('should detect finite operands', (eachFiniteNumber) => {
      expect.assertions(1);

      expect(isFinite(eachFiniteNumber)).toBe(true);
    });
  });
});
