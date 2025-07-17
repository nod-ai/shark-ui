import {
  describe,
  it,
  expect,
} from 'vitest';

import {
  greatestCommonDivisor,
} from './greatestCommonDivisor';

describe(greatestCommonDivisor, () => {
  describe('the sad outcomes', () => {
    describe('when delegated', () => {
      const combosOfInoperableNumbers = [
        [NaN, 100],
        [NaN, NaN],
        [100, NaN],
      ] as const;

      it.each(combosOfInoperableNumbers)('should reject inoperable operands', (operandA, operandB) => {
        expect.assertions(1);

        expect(() => greatestCommonDivisor(operandA, operandB)).toThrow(Error);
      });

      const combosOfInfiniteNumbers = [
        [Infinity, 10000000],
        [Infinity, Infinity],
        [10000000, Infinity],
      ] as const;

      it.each(combosOfInfiniteNumbers)('should reject infinite operands', (operandA, operandB) => {
        expect.assertions(1);

        expect(() => greatestCommonDivisor(operandA, operandB)).toThrow(Error);
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
