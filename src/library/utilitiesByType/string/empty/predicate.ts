import {
  emptyString,
} from './instance';

import type {
  EmptyString,
} from './type';

const isEmpty = (
  givenSubject: string,
): givenSubject is EmptyString => {
  return givenSubject === emptyString;
};

export {
  isEmpty,
};
