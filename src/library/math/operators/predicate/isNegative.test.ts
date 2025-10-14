import {
  Runtime,
} from 'effect';

import {
  describe,
  it,
  expect,
} from 'vitest';

import {
  numberTaxonomy,
} from '../../numberTaxonomy';

import {
  isNegative,
} from './isNegative';

describe(isNegative, () => {
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
    describe('when generated due to inoperable operands', () => {
      it('should reject the operand', () => {
        expect.assertions(1);

        expect(() => isNegative(soleInoperableNumber)).toThrow(Error);
      });

      it('should safely propagate the error', () => {
        expect.assertions(1);

        expect((() => {
          // eslint-disable-next-line no-restricted-syntax
          try {
            isNegative(soleInoperableNumber);
          }
          catch (error) {
            return Runtime.isFiberFailure(error);
          }
        })()).toBe(true);
      });

      it('should communicate clearly with developers', () => {
        expect.assertions(1);

        expect(() => isNegative(soleInoperableNumber)).toThrow('Operand must be operable');
      });
    });
  });

  describe('the happy outcomes', () => {
    const infiniteAssertions = [
      [infinite.negative, true],
      [infinite.positive, false],
    ] as const;

    const infiniteNumbers = infiniteAssertions.map($0 => $0[0]);

    const neutralFiniteNumbers = [
      neutralNumber,
      neutralNumber * signed.positive,
      neutralNumber * signed.negative,
    ];

    const positiveFiniteNumbers = [
      signed.positive,
      fractional.rational,
      fractional.irrational,
      fractional.transcendental,
      runtime.min,
      runtime.max,
    ];

    const negativeFiniteNumbers = positiveFiniteNumbers.map($0 => $0 * signed.negative);

    const operableNumbers = [
      ...infiniteNumbers,
      ...negativeFiniteNumbers,
      ...neutralFiniteNumbers,
      ...positiveFiniteNumbers,
    ];

    it.each(operableNumbers)('should accept valid operands', (eachOperableNumber) => {
      expect.assertions(1);

      expect(() => isNegative(eachOperableNumber)).not.toThrow();
    });

    it.each(infiniteAssertions)('should support infinite operands', (eachInfiniteNumber, eachExpectOutput) => {
      expect.assertions(1);

      expect(isNegative(eachInfiniteNumber)).toBe(eachExpectOutput);
    });

    it.each(neutralFiniteNumbers)('should detect neutral operands', (eachNeutralNumber) => {
      expect.assertions(1);

      expect(isNegative(eachNeutralNumber)).toBe(false);
    });

    it.each(positiveFiniteNumbers)('should detect positive operands', (eachPositiveNumber) => {
      expect.assertions(1);

      expect(isNegative(eachPositiveNumber)).toBe(false);
    });

    it.each(negativeFiniteNumbers)('should detect negative operands', (eachNegativeNumber) => {
      expect.assertions(1);

      expect(isNegative(eachNegativeNumber)).toBe(true);
    });
  });
});
