import type {
  StringLike,
} from './StringLike';

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
