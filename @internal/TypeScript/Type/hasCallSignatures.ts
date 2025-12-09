import {
  isNonEmptyArray,
} from 'effect/Array';

import type {
  Type,
} from 'ts-morph';

const hasCallSignatures = (
  givenType: Type,
): boolean => {
  if (
    givenType.isUnion()
  ) return givenType.getUnionTypes().every(hasCallSignatures);

  if (
    givenType.isIntersection()
  ) return givenType.getIntersectionTypes().some(hasCallSignatures);

  const apparentType = givenType.getApparentType(); // Ensures callable objects are recognized.
  return isNonEmptyArray(apparentType.getCallSignatures());
};

export {
  hasCallSignatures,
};
