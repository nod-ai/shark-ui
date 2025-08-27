import Attempt from '@/library/Attempt';

import {
  isOperable,
} from '../../../predicate';

/** The distance the given value is from the 1-dimensional origin */
const absoluteValueOf = (
  givenOperand: number,
): number => {
  if (
    !isOperable(givenOperand)
  ) return Attempt.abandon('Cannot determine distance of inoperable number from origin because it does not exist on the number line.');

  return Math.abs(givenOperand);
};

/** Alias for {@link absoluteValueOf} */
const unsigned = absoluteValueOf;

/** Alias for {@link absoluteValueOf} */
const modulusOf = absoluteValueOf;

export {
  absoluteValueOf,
  modulusOf,
  unsigned,
};
