/* eslint-disable vitest/prefer-importing-vitest-globals */
/* eslint-disable vitest/require-hook */
import {
  describe,
  expect,
  it,
} from '@effect/vitest';

import {
  Effect,
} from 'effect';

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
      it.effect('should reject the operand', () => Effect.gen(function* () {
        expect.assertions(1);

        const inoperableInputDidResultInFailure = yield* Effect.isFailure(isNegative(soleInoperableNumber));

        expect(inoperableInputDidResultInFailure).toBe(true);
      }));

      it.effect('should safely propagate the rejection', () => Effect.gen(function* () {
        expect.assertions(1);

        const soleFailure = yield* Effect.flip(isNegative(soleInoperableNumber));

        expect(soleFailure).toBeInstanceOf(Error);
      }));

      it.effect('should clearly communicate the rejection to developers', () => Effect.gen(function* () {
        expect.assertions(1);

        const soleFailure = yield* Effect.flip(isNegative(soleInoperableNumber));

        expect(soleFailure.message).toBe('Operand must be operable');
      }));
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

    it.effect.each(operableNumbers)('should accept valid operands', (eachOperableNumber) => Effect.gen(function* () {
      expect.assertions(1);

      const eachOperationDidSucceed = yield* Effect.isSuccess(isNegative(eachOperableNumber));

      expect(eachOperationDidSucceed).toBe(true);
    }));

    it.effect.each(infiniteAssertions)('should support infinite operands', ([eachInfiniteNumber, eachExpectedOutput]) => Effect.gen(function* () {
      expect.assertions(1);

      const eachActualOutput = yield* isNegative(eachInfiniteNumber);

      expect(eachActualOutput).toBe(eachExpectedOutput);
    }));

    it.effect.each(neutralFiniteNumbers)('should detect neutral operands', (eachNeutralNumber) => Effect.gen(function* () {
      expect.assertions(1);

      const outputForEachNeutralNumber = yield* isNegative(eachNeutralNumber);

      expect(outputForEachNeutralNumber).toBe(false);
    }));

    it.effect.each(positiveFiniteNumbers)('should detect positive operands', (eachPositiveNumber) => Effect.gen(function* () {
      expect.assertions(1);

      const outputForEachPositiveNumber = yield* isNegative(eachPositiveNumber);

      expect(outputForEachPositiveNumber).toBe(false);
    }));

    it.effect.each(negativeFiniteNumbers)('should detect negative operands', (eachNegativeNumber) => Effect.gen(function* () {
      expect.assertions(1);

      const outputForEachNegativeNumber = yield* isNegative(eachNegativeNumber);

      expect(outputForEachNegativeNumber).toBe(true);
    }));
  });
});
