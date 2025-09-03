import {
  asString,
} from '../string';

import {
  isError,
} from './isError';

const asError = (givenSubject: unknown): Error => {
  if (
    isError(givenSubject)
  ) return givenSubject;

  const castedMessage = asString(givenSubject);
  const castedError = new Error(castedMessage);
  return castedError;
};

export {
  isError,
  asError,
};
