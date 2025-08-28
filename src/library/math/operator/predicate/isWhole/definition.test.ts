import {
  describe,
  it,
  expect,
} from 'vitest';

import Attempt from '@/library/Attempt';

import {
  numberTaxonomy,
} from '../../../numberTaxonomy';

import {
  isWhole,
} from './aliases/isInteger';

describe(isWhole, () => {
  describe('the sad outcomes', () => {
    describe('when delegated', () => {
      it('should reject inoperable operands', () => {
        expect.assertions(1);

        expect(() => isWhole(numberTaxonomy.undefined)).toThrow(Error);
      });
    });

    describe('when generated', () => {
      const infiniteNumbers = [
        numberTaxonomy.infinite.positive,
        numberTaxonomy.infinite.negative,
      ];

      describe.each(infiniteNumbers)('due to infinite operands', (eachInfiniteNumber) => {
        it('should reject them', () => {
          expect.assertions(1);

          expect(() => isWhole(eachInfiniteNumber)).toThrow(Error);
        });

        it('should safely propagate the error', () => {
          expect.assertions(1);

          expect(() => isWhole(eachInfiniteNumber)).toThrow(Attempt.Error_NonActionable);
        });

        it('should communicate clearly with developers', () => {
          expect.assertions(1);

          expect(() => isWhole(eachInfiniteNumber)).toThrow('Operand must be finite.');
        });
      });
    });
  });

  describe('the happy outcomes', () => {
    const wholeNumbers = [
      numberTaxonomy.origin,
      numberTaxonomy.signed.negative,
      numberTaxonomy.signed.positive,
      numberTaxonomy.runtime.max,
    ];

    const fractionalNumbers = [
      numberTaxonomy.runtime.min,
      numberTaxonomy.fractional.rational,
      numberTaxonomy.fractional.irrational,
      numberTaxonomy.fractional.transcendental,
    ];

    const finiteNumbers = [
      ...wholeNumbers,
      ...fractionalNumbers,
    ];

    it.each(finiteNumbers)('should accept valid operands', (eachFiniteNumber) => {
      expect.assertions(1);

      expect(() => isWhole(eachFiniteNumber)).not.toThrow();
    });

    describe.each(wholeNumbers)('when given whole operands', (eachWholeNumber) => {
      it('should detect them when fractional portions are omitted', () => {
        expect.assertions(1);

        expect(isWhole(eachWholeNumber)).toBe(true);
      });

      it('should detect them when fractional portions are present but zero', () => {
        expect.assertions(1);

        expect(isWhole((eachWholeNumber + 0.0))).toBe(true);
      });
    });

    it.each(fractionalNumbers)('should detect fractional operands', (eachFractionalNumber) => {
      expect.assertions(1);

      expect(isWhole(eachFractionalNumber)).toBe(false);
    });
  });
});
