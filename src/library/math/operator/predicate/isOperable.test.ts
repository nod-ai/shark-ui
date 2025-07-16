import {
  describe,
  it,
  expect,
} from 'vitest';

import {
  isOperable,
} from './isOperable';

const numberTaxonomy = {
  signed: {
    negative: /**/-1,
    positive: /**/+1,
  },
  fractional: {
    rational      : 1 / 2,
    irrational    : Math.PI,
    transcendental: Math.E,
  },
  infinite: {
    positive: Infinity,
    negative: -Infinity,
  },
  runtime: {
    min: Number.MIN_VALUE,
    max: Number.MAX_VALUE,
  },
  origin   : 0,
  undefined: NaN,
} as const;

describe(isOperable, () => {
  const theSoleInoperableNumber = numberTaxonomy.undefined;

  const operableNumbers = [
    numberTaxonomy.origin,
    numberTaxonomy.signed.negative,
    numberTaxonomy.signed.positive,
    numberTaxonomy.fractional.rational,
    numberTaxonomy.fractional.irrational,
    numberTaxonomy.fractional.transcendental,
    numberTaxonomy.infinite.positive,
    numberTaxonomy.infinite.negative,
    numberTaxonomy.runtime.min,
    numberTaxonomy.runtime.max,
  ];

  describe('the guaranteed behavior', () => {
    it.each([
      theSoleInoperableNumber,
      ...operableNumbers,
    ])('should never fail', (someOperand) => {
      expect.assertions(1);

      expect(() => isOperable(someOperand)).not.toThrow(Error);
    });
  });

  describe('the expected classifications', () => {
    it('should detect inoperable operands', () => {
      expect.assertions(1);

      expect(isOperable(theSoleInoperableNumber)).toBe(false);
    });

    it.each(operableNumbers)('should detect operable operands', (eachOperableNumber) => {
      expect.assertions(1);

      expect(isOperable(eachOperableNumber)).toBe(true);
    });
  });
});
