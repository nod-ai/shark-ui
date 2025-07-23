import {
  describe,
  it,
  expect,
} from 'vitest';

import Attempt from '@/library/Attempt';

import {
  numberTaxonomy,
} from '@/library/math/numberTaxonomy';

import {
  squared,
} from './squared';

describe(squared, () => {
  const {
    origin,
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
    describe('when generated due to an inoperable operand', () => {
      it('should reject the operand', () => {
        expect.assertions(1);

        expect(() => squared(soleInoperableNumber)).toThrow(Error);
      });

      it('should safely propagate the error', () => {
        expect.assertions(1);

        expect(() => squared(soleInoperableNumber)).toThrow(Attempt.NonActionableError);
      });

      it('should communicate clearly with developers', () => {
        expect.assertions(1);

        expect(() => squared(soleInoperableNumber)).toThrow('Operand must be operable.');
      });
    });
  });

  const operableNumbers = [
    origin,
    signed.positive,
    signed.negative,
    fractional.irrational,
    fractional.rational,
    infinite.positive,
    infinite.negative,
    runtime.max,
    runtime.min,
  ];

  describe.each(operableNumbers)('the happy outcomes', (eachOperableNumber) => {
    it('should accept operable operands', () => {
      expect.assertions(1);

      expect(() => squared(eachOperableNumber)).not.toThrow();
    });

    it.each(operableNumbers)('should be the same as repeating a rank 2 hyper-operation twice', () => {
      expect.assertions(1);

      const identityFactor = 1;

      expect(squared(eachOperableNumber)).toBe(eachOperableNumber * eachOperableNumber * identityFactor);
    });
  });
});
