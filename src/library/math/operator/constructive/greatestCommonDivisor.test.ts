import {
  describe,
  it,
} from 'vitest';

import {
  greatestCommonDivisor,
} from './greatestCommonDivisor';

describe(greatestCommonDivisor, () => {
  describe('the sad outcomes', () => {
    describe('when delegated', () => {
      it.todo('should reject inoperable operands');

      it.todo('should reject infinite operands');
    });

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
