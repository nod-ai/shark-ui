import {
  asString,
} from './asString';

import {
  lastCharacterOf,
  droppingLastCharacter,
} from './character';

import {
  emptyString,
  type EmptyString,
  isEmpty,
} from './empty';

import {
  isString,
} from './isString';

type StringLike = string | String; // eslint-disable-line @typescript-eslint/no-wrapper-object-types -- means "both the auto-boxed and primitive types"

const concatenated = (
  ...givenOperands: (StringLike | null)[]
): string => {
  const joinableOperands = givenOperands.map($0 => $0?.toString() ?? '');
  const joinedOperands = joinableOperands.join('');
  return joinedOperands;
};

export {
  isString,
  asString,
  emptyString,
  type EmptyString,
  isEmpty,
  lastCharacterOf,
  droppingLastCharacter,
  type StringLike,
  concatenated,
};
