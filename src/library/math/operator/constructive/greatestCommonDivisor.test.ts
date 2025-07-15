import {
  describe,
  it,
} from 'vitest';

import {
  greatestCommonDivisor,
} from './greatestCommonDivisor';

describe(greatestCommonDivisor, () => {
  describe('the sad outcomes', () => {
    describe.todo('when delegated');

    describe('when generated', () => {
      describe('due to fractional operands', () => {
        it.todo('should reject them');

        it.todo('should safely propagate the error');

        it.todo('should communicate clearly with developers');
      });
    });
  });

  describe.todo('the happy outcomes');
});
