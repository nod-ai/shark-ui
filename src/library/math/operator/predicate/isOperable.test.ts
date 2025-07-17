import {
  describe,
  it,
  expect,
} from 'vitest';

import {
  numberTaxonomy,
} from '../../numberTaxonomy';

import {
  isOperable,
} from './isOperable';

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
