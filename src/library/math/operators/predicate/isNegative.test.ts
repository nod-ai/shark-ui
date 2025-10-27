import {
  Effect,
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

        const soleFailingOperation = (): boolean => isNegative(soleInoperableNumber).pipe(Effect.runSync);

        expect(soleFailingOperation).toThrow(Error);
      });

      it('should safely propagate the rejection', () => {
        expect.assertions(1);

        const soleOperationDidFail = (() => {
          // eslint-disable-next-line no-restricted-syntax
          try {
            isNegative(soleInoperableNumber).pipe(Effect.runSync);
          }
          catch (error) {
            return Runtime.isFiberFailure(error);
          }
        })();

        expect(soleOperationDidFail).toBe(true);
      });

      it('should clearly communicate the rejection to developers', () => {
        expect.assertions(1);

        const soleFailingOperation = (): boolean => isNegative(soleInoperableNumber).pipe(Effect.runSync);

        expect(soleFailingOperation).toThrow('Operand must be operable');
      });
    });
  });

  describe('the happy outcomes', () => {
    const infiniteAssertions = [
      [infinite.negative, true],
      [infinite.positive, false],
    ] as const;

    const infiniteNumbers = infiniteAssertions.map(($0) => $0[0]);

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

    const negativeFiniteNumbers = positiveFiniteNumbers.map(($0) => $0 * signed.negative);

    const operableNumbers = [
      ...infiniteNumbers,
      ...negativeFiniteNumbers,
      ...neutralFiniteNumbers,
      ...positiveFiniteNumbers,
    ];

    it.each(operableNumbers)('should accept valid operands', (eachOperableNumber) => {
      expect.assertions(1);

      const eachOperation = (): boolean => isNegative(eachOperableNumber).pipe(Effect.runSync);

      expect(eachOperation).not.toThrow();
    });

    it.each(infiniteAssertions)('should support infinite operands', (eachInfiniteNumber, eachExpectedOutput) => {
      expect.assertions(1);

      const eachActualOutput = isNegative(eachInfiniteNumber).pipe(Effect.runSync);

      expect(eachActualOutput).toBe(eachExpectedOutput);
    });

    it.each(neutralFiniteNumbers)('should detect neutral operands', (eachNeutralNumber) => {
      expect.assertions(1);

      const outputForEachNeutralNumber = isNegative(eachNeutralNumber).pipe(Effect.runSync);

      expect(outputForEachNeutralNumber).toBe(false);
    });

    it.each(positiveFiniteNumbers)('should detect positive operands', (eachPositiveNumber) => {
      expect.assertions(1);

      const outputForEachPositiveNumber = isNegative(eachPositiveNumber).pipe(Effect.runSync);

      expect(outputForEachPositiveNumber).toBe(false);
    });

    it.each(negativeFiniteNumbers)('should detect negative operands', (eachNegativeNumber) => {
      expect.assertions(1);

      const outputForEachNegativeNumber = isNegative(eachNegativeNumber).pipe(Effect.runSync);

      expect(outputForEachNegativeNumber).toBe(true);
    });
  });
});
